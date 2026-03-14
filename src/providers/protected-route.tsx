import { useUser } from "@/providers/user-context";
import { hasValidTokenCookie } from "@/lib/auth";
import React from "react";
import { Navigate, Outlet } from "react-router";

// ✅ Fix: guards on BOTH session data AND token cookie.
// Previously only checked session data (HRsessionInfo) — if the token
// cookie (HRuserInfo) was missing but session cookie survived, the user
// passed this guard but every API call returned 401, creating an
// infinite broken loop. Now both must be present to proceed.
export default function ProtectedRoute() {
  const { state } = useUser();

  const hasSessionData = !!(
    state.userInfo?.user ||
    state.userInfo?.id ||
    state.userInfo?.app_role
  );

  const hasToken = hasValidTokenCookie();

  if (!hasSessionData || !hasToken) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}