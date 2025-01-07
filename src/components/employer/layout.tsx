import Copyright from "@/components/shared/copyright";
import Footer from "@/components/shared/footer";
import Navigation from "@/components/shared/navigation";
import Topbar from "@/components/shared/top-bar";
import { Outlet } from "react-router";

const navlinks = [
  {
    title: "Home",
    href: "/employer/dashboard",
  },
  {
    title: "Jobs",
    href: "/employer/jobs",
  },
  {
    title: "Candidates",
    href: "/employer/candidates",
  },
  {
    title: "Test",
    href: "/employer/tests",
  },
  {
    title: "Staff",
    href: "/employer/staffs",
  },
];

export default function EmployerDashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Topbar />
        <Navigation navlinks={navlinks} />
      </div>

      <div className="flex-1 ">
        <Outlet />
      </div>
      <div className="mt-8">
        <Footer />
        <Copyright />
      </div>
    </div>
  );
}
