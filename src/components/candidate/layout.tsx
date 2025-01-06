import Copyright from "@/components/shared/copyright";
import Footer from "@/components/shared/footer";
import Navigation from "@/components/shared/navigation";
import Topbar from "@/components/shared/top-bar";
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
