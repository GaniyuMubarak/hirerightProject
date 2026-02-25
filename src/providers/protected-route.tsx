// import { useCurrentUser } from "@/hooks/use-current-user";
// import React from "react";
// import { Navigate, Outlet } from "react-router";

// export default function ProtectedRoute() {
//   const user = useCurrentUser();
//   if (!user?.app_role) {
//     // return <Navigate to={`/${user?.app_role}/dashboard`} />;
//     return <Navigate to={`/auth/login`} />;
//   }
//   return (
//     <React.Fragment>
//       <Outlet />
//     </React.Fragment>
//   );
// }

import { useUser } from "@/providers/user-context";
import React from "react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const { state } = useUser();

  // Check both possible structures
  const userInfo = state.userInfo;
  const isLoggedIn = !!(
    userInfo?.user ||
    userInfo?.id ||
    userInfo?.email ||
    userInfo?.app_role
  );

  // const user = useCurrentUser();
  // if (!user?.app_role) {
  //   return <Navigate to={`/auth/login`} />;
  // }

  if (!isLoggedIn) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}