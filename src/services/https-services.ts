import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

type ResponseData = any;

// ---------------------------------------------------------------------------
// Token storage helpers
// ---------------------------------------------------------------------------

const COOKIE_KEY = "HRuserInfo";
const TOKEN_EXPIRY_DAYS = 7;

const cookieOptions = {
  expires: TOKEN_EXPIRY_DAYS,
  secure: true,
  sameSite: "strict" as const,
};

function getUserInfo(): { token: string; refreshToken: string } | null {
  const raw = Cookies.get(COOKIE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function setUserInfo(patch: Partial<{ token: string; refreshToken: string }>) {
  const current = getUserInfo() ?? {};
  Cookies.set(
    COOKIE_KEY,
    JSON.stringify({ ...current, ...patch }),
    cookieOptions,
  );
}

function clearAuth() {
  localStorage.clear();
  Cookies.remove(COOKIE_KEY);
}

// ---------------------------------------------------------------------------
// Refresh-queue management
// ---------------------------------------------------------------------------

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  failedQueue = [];
}

// ---------------------------------------------------------------------------
// Axios instance
// ---------------------------------------------------------------------------

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 50_000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// ---------------------------------------------------------------------------
// Request interceptor — attach access token
// ---------------------------------------------------------------------------

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const userInfo = getUserInfo();
  if (userInfo?.token) {
    config.headers.set("Authorization", `Bearer ${userInfo.token}`);
  }
  return config;
});



instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status: number | undefined = error?.response?.status;

    // ── 503 Maintenance ────────────────────────────────────────────────────
    if (status === 503) {
      if (window.location.pathname !== "/sign-in") {
        toast("System Maintenance in Progress. Please check back later.", {
          duration: 5000,
          position: "top-right",
        });
      }
      return Promise.reject(error);
    }

    // ── 401 Unauthorized — attempt refresh token rotation ─────────────────
    if (status === 401 && !originalRequest._retry) {
      // Never attempt refresh on the login page itself
      if (window.location.pathname === "/sign-in") {
        return Promise.reject(error);
      }

      // Queue subsequent 401s while a refresh is already in-flight
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((newToken) => {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return instance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const userInfo = getUserInfo();

        if (!userInfo?.refreshToken) {
          throw new Error("No refresh token available");
        }

        // ── Refresh call — sends the current refresh token ────────────────
        // The backend MUST respond with a brand-new refresh token (rotation).
        // Expected response shape:
        //   { token: string; refreshToken: string; expiresIn?: number }
        const { data } = await axios.post<{
          token: string;
          refreshToken: string;
        }>(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          { refreshToken: userInfo.refreshToken },
          {
            // Skip our own interceptor so a 401 here doesn't loop forever
            headers: { "X-Skip-Interceptor": "1" },
          },
        );

        const { token: newToken, refreshToken: newRefreshToken } = data;

        // Persist rotated tokens — both expire in 7 days
        setUserInfo({ token: newToken, refreshToken: newRefreshToken });

        // Update default header for any requests created after this point
        instance.defaults.headers.common["Authorization"] =
          `Bearer ${newToken}`;

        // Flush the queue with the fresh access token
        processQueue(null, newToken);

        // Retry the original failed request
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearAuth();

        if (window.location.pathname !== "/sign-in") {
          toast("Your session has expired. Please sign in again.", {
            duration: 5000,
            position: "top-right",
          });
          window.location.href = "/sign-in";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // ── 403 Forbidden ──────────────────────────────────────────────────────
    if (status === 403) {
      window.location.href = "/unauthorized";
      return Promise.reject(error);
    }
    // if (status === 403) {
    //   toast("Access denied. Please sign in with the correct account type.", {
    //     duration: 4000,
    //     position: "top-right",
    //   });
    //   window.location.href = "/account-type";
    //   return Promise.reject(error);
    // }

    // ── 404 Not Found ──────────────────────────────────────────────────────
    if (status === 404) {
      console.error("API endpoint not found:", error.config?.url);
      toast("Resource not found", { duration: 3000, position: "top-right" });
    }

    return Promise.reject(error);
  },
);



/**
 * Call once after a successful login to persist both tokens.
 *
 * @example
 * const { token, refreshToken } = await loginApi(credentials);
 * persistAuthTokens(token, refreshToken);
 */
export function persistAuthTokens(token: string, refreshToken: string) {
  setUserInfo({ token, refreshToken });
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// ---------------------------------------------------------------------------
// Request wrappers
// ---------------------------------------------------------------------------

const responseBody = (response: any): ResponseData => response.data;

const requests = {
  get: (url: string, body?: any, headers?: any) =>
    instance.get(url, { ...body, headers }).then(responseBody),

  post: (url: string, body?: any) =>
    instance.post(url, body).then(responseBody),

  put: (url: string, body?: any, headers?: any) =>
    instance.put(url, body, { headers }).then(responseBody),

  patch: (url: string, body?: any) =>
    instance.patch(url, body).then(responseBody),

  delete: (url: string, body?: any) =>
    instance.delete(url, { data: body }).then(responseBody),
};

export default requests;