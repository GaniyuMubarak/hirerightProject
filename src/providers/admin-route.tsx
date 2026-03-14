import { hasValidTokenCookie } from "@/lib/auth";
import { useUser } from "@/providers/user-context";
import React from "react";
import { Navigate, Outlet } from "react-router";

/**
 * AdminRoute — guards all /admin/* routes.
 * Requires both a valid token cookie AND app_role === "admin".
 * Non-admins with valid sessions are redirected to their own portal.
 */
export default function AdminRoute() {
  const { state } = useUser();

  const hasToken = hasValidTokenCookie();
  const user = state.userInfo?.user;
  const hasSession = !!(user || state.userInfo?.id || state.userInfo?.app_role);

  if (!hasSession || !hasToken) {
    return <Navigate to="/sign-in" replace />;
  }

  const role = user?.app_role ?? state.userInfo?.app_role;

  if (role !== "admin") {
    if (role === "employer")
      return <Navigate to="/employer/dashboard" replace />;
    if (role === "candidate")
      return <Navigate to="/candidate/dashboard" replace />;
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}
