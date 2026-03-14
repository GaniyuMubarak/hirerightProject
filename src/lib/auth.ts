/**
 * src/lib/auth.ts
 *
 * Central auth session utility. Every auth flow (login, register,
 * email verification, OAuth) MUST call setAuthSession — never write
 * to auth cookies directly anywhere else.
 *
 * Cookie layout (two separate cookies, never the same key):
 *   HRuserInfo    — { token, refreshToken, expiryDays }
 *                   Read by https-services request interceptor.
 *                   expiryDays is stored so refresh rotation can
 *                   re-use the same expiry instead of defaulting to 7.
 *
 *   HRsessionInfo — { user, message }
 *                   Read by user-context on reload for display data.
 *
 * IMPORTANT — setAuthSession does NOT dispatch to UserContext.
 * It only writes cookies. The caller (use-auth-form, auth-services)
 * is responsible for calling dispatch({ type: "USER_LOGIN", payload: res })
 * after setAuthSession. This is intentional — auth.ts is a plain
 * utility with no React dependency.
 */

import Cookies from "js-cookie";
import { persistAuthTokens } from "@/services/https-services";
import type { AuthResponse } from "@/lib/types/auth";

export const SESSION_COOKIE_KEY = "HRsessionInfo";
export const TOKEN_COOKIE_KEY = "HRuserInfo";

// ---------------------------------------------------------------------------
// setAuthSession
// ---------------------------------------------------------------------------
// Call this after EVERY successful auth response — login, register,
// email verification, OAuth, or any future flow that returns a token.
//
// Writes both cookies with the same expiry so they never fall out of sync.
//   rememberMe = true  → 30 days
//   rememberMe = false → 12 hours (0.5 days)
// ---------------------------------------------------------------------------
export function setAuthSession(res: AuthResponse, rememberMe = false): void {
  const expiryDays = rememberMe ? 30 : 0.5;

  // Token cookie — https-services interceptor reads this for every request.
  // expiryDays is passed so refresh rotation re-uses the same expiry.
  persistAuthTokens(res.token, res.refreshToken ?? "", expiryDays);

  // Session cookie — user-context reads this on reload for display data.
  Cookies.set(
    SESSION_COOKIE_KEY,
    JSON.stringify({
      user: res.user,
      message: res.message ?? "",
    }),
    {
      expires: expiryDays,
      secure: import.meta.env.PROD,
      sameSite: "strict",
    },
  );
}

// ---------------------------------------------------------------------------
// clearAuthStorage
// ---------------------------------------------------------------------------
// Call this on logout, 401, or account deletion.
// Removes BOTH cookies — never just one.
// ---------------------------------------------------------------------------
export function clearAuthStorage(): void {
  Cookies.remove(TOKEN_COOKIE_KEY);
  Cookies.remove(SESSION_COOKIE_KEY);
  localStorage.removeItem("user");
  localStorage.removeItem("token"); // legacy cleanup
}

// ---------------------------------------------------------------------------
// readSessionFromCookie
// ---------------------------------------------------------------------------
// Used by user-context to rehydrate state on reload.
// Returns null if cookie is missing, expired, or malformed.
// ---------------------------------------------------------------------------
export function readSessionFromCookie(): AuthResponse | null {
  try {
    const raw = Cookies.get(SESSION_COOKIE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.user ? parsed : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// hasValidTokenCookie
// ---------------------------------------------------------------------------
// Used by ProtectedRoute to verify the token cookie exists, not just
// session data. Prevents the broken state where HRsessionInfo exists
// but HRuserInfo is gone — user passes the route guard but every API
// call fails with 401.
// ---------------------------------------------------------------------------
export function hasValidTokenCookie(): boolean {
  try {
    const raw = Cookies.get(TOKEN_COOKIE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return !!parsed?.token;
  } catch {
    return false;
  }
}
