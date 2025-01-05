import Copyright from "@/components/dashboard/copyright";
import Footer from "@/components/dashboard/footer";
import Navigation from "@/components/dashboard/navigation";
import Topbar from "@/components/dashboard/top-bar";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Topbar />
        <Navigation />
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
