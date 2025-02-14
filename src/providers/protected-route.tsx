import { useCurrentUser } from "@/hooks/use-current-user";
import React from "react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const user = useCurrentUser();
  if (!user?.app_role) {
    return <Navigate to={`/${user?.app_role}/dashboard`} />;
  }
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}
