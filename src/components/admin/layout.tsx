// import { clearAuthStorage } from "@/lib/auth";
// import { useUser } from "@/providers/user-context";
// import {
//   BarChart3,
//   BriefcaseIcon,
//   ClipboardList,
//   ClipboardPen,
//   LogOut,
//   Menu,
//   Users,
//   UserSquare2,
//   X,
// } from "lucide-react";
// import { useState } from "react";
// import { Link, NavLink, Outlet, useNavigate } from "react-router";

// const NAV_ITEMS = [
//   { label: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
//   { label: "Users", href: "/admin/users", icon: Users },
//   { label: "Jobs", href: "/admin/jobs", icon: BriefcaseIcon },
//   { label: "Employers", href: "/admin/employers", icon: UserSquare2 },
//   { label: "Candidates", href: "/admin/candidates", icon: ClipboardList },
//   { label: "Tests", href: "/admin/tests", icon: ClipboardPen },
// ];

// export default function AdminLayout() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { state, dispatch } = useUser();
//   const navigate = useNavigate();

//   const user = state.userInfo?.user;
//   const initials =
//     `${user?.first_name?.[0] ?? ""}${user?.last_name?.[0] ?? ""}`.toUpperCase() ||
//     "AD";

//   const handleLogout = () => {
//     clearAuthStorage();
//     dispatch({ type: "USER_LOGOUT" });
//     navigate("/sign-in", { replace: true });
//   };

//   return (
//     <div className="min-h-screen bg-[#F8F9FB] flex">
//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed inset-y-0 left-0 z-50 w-64 bg-[#0F1117] flex flex-col
//           transform transition-transform duration-200 ease-in-out
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//           lg:relative lg:translate-x-0
//         `}>
//         {/* Logo */}
//         <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
//           <Link to="/admin/dashboard" className="flex items-center gap-2">
//             <img
//               src="/logo_app.png"
//               alt="HireRight"
//               className="h-8 w-auto object-contain brightness-0 invert"
//             />
//             <span className="text-white font-semibold text-sm">Admin</span>
//           </Link>
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="lg:hidden text-white/60 hover:text-white">
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Nav */}
//         <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
//           {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
//             <NavLink
//               key={href}
//               to={href}
//               onClick={() => setSidebarOpen(false)}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-sm font-medium transition-colors
//                 ${
//                   isActive
//                     ? "bg-[#EE7B36] text-white"
//                     : "text-white/60 hover:text-white hover:bg-white/10"
//                 }`
//               }>
//               <Icon className="w-4 h-4 shrink-0" />
//               {label}
//             </NavLink>
//           ))}
//         </nav>

//         {/* User + Logout */}
//         <div className="px-3 py-4 border-t border-white/10">
//           <div className="flex items-center gap-3 px-3 py-2 mb-1">
//             <div className="w-8 h-8 rounded-full bg-[#EE7B36] flex items-center justify-center text-white text-xs font-bold shrink-0">
//               {initials}
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-white text-sm font-medium truncate">
//                 {user?.first_name} {user?.last_name}
//               </p>
//               <p className="text-white/40 text-xs truncate">{user?.email}</p>
//             </div>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 w-full px-3 py-2.5 rounded-[8px] text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors">
//             <LogOut className="w-4 h-4 shrink-0" />
//             Sign Out
//           </button>
//         </div>
//       </aside>

//       {/* Sidebar overlay on mobile */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-black/50 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Main content */}
//       <div className="flex-1 flex flex-col min-w-0">
//         {/* Topbar */}
//         <header className="bg-white border-b sticky top-0 z-30 px-4 lg:px-8 h-14 flex items-center justify-between">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700">
//             <Menu className="w-5 h-5" />
//           </button>
//           <div className="flex items-center gap-2 text-sm text-gray-500 max-lg:hidden">
//             <span className="font-medium text-gray-900">HireRight Admin</span>
//           </div>
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-full bg-[#EE7B36] flex items-center justify-center text-white text-xs font-bold">
//               {initials}
//             </div>
//           </div>
//         </header>

//         {/* Page content */}
//         <main className="flex-1 p-4 lg:p-8 overflow-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

import { clearAuthStorage } from "@/lib/auth";
import { useUser } from "@/providers/user-context";
import {
  BarChart3,
  BriefcaseIcon,
  ClipboardList,
  ClipboardPen,
  FileText,
  LogOut,
  Menu,
  Users,
  UserSquare2,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Jobs", href: "/admin/jobs", icon: BriefcaseIcon },
  { label: "Employers", href: "/admin/employers", icon: UserSquare2 },
  { label: "Candidates", href: "/admin/candidates", icon: ClipboardList },
  { label: "Tests", href: "/admin/tests", icon: ClipboardPen },
  { label: "Legal", href: "/admin/legal", icon: FileText },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { state, dispatch } = useUser();
  const navigate = useNavigate();

  const user = state.userInfo?.user;
  const initials =
    `${user?.first_name?.[0] ?? ""}${user?.last_name?.[0] ?? ""}`.toUpperCase() ||
    "AD";

  const handleLogout = () => {
    clearAuthStorage();
    dispatch({ type: "USER_LOGOUT" });
    navigate("/sign-in", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex">
      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-60 bg-[#253B7A] flex flex-col
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <img
              src="/logo_app.png"
              alt="HireRight"
              className="h-7 w-auto object-contain brightness-0 invert"
            />
            <span className="text-white font-semibold text-xs tracking-wide uppercase">
              Admin
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/60 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
            <NavLink
              key={href}
              to={href}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-[#EE7B36] text-white"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`
              }>
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="px-2 py-3 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <div className="w-7 h-7 rounded-full bg-[#EE7B36] flex items-center justify-center text-white text-xs font-bold shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-white/40 text-[10px] truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-[8px] text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors">
            <LogOut className="w-4 h-4 shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b sticky top-0 z-30 px-4 lg:px-8 h-14 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700">
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500">
            <span className="font-medium text-gray-900">HireRight Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#EE7B36] flex items-center justify-center text-white text-xs font-bold">
              {initials}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}