import StatsCard from "@/components/candidate/dashboard/stats-cad";
import EmployerJobListingTable from "@/components/employer/dashboard/job-listing-table";
import { buttonVariants } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

export default function EmployerDashboard() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8 ">
        <header className="border-b pb-5 flex justify-between items-center">
          <div className="space-y-3 ">
            <h1 className="text-3xl font-medium">Welcome back,</h1>
            <p className="text-[#475467] text-sm">
              Your current summary and activity.
            </p>
          </div>
          <Link
            to={"/employer/jobs/post"}
            className={cn(buttonVariants(), "rounded-[6px]")}
          >
            Post a Job
          </Link>
        </header>

        <div className="flex gap-6 items-center w-8/12">
          <StatsCard
            className="bg-[#78439326] border-[#784393]"
            value={3}
            description={"Jobs"}
            icon={<Icons.briefcase />}
          />
          <StatsCard
            className="bg-[#5E934326] border-[#5E9343]"
            value={221}
            description={"Candidates"}
            icon={<Icons.people />}
          />
        </div>

        <EmployerJobListingTable />
      </div>
    </div>
  );
}
