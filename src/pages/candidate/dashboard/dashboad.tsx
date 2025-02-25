import JobListingTable from "@/components/candidate/dashboard/job-listing-table";
import StatsCard from "@/components/candidate/dashboard/stats-cad";
import Icons from "@/components/ui/icons";
import { useCurrentUser } from "@/hooks/use-current-user";
import CandidateServices from "@/services/candidate-services";
import { useQuery } from "@tanstack/react-query";
import { ApplyDialog } from "../apply-dialog";

export default function Dashboard() {
  const user = useCurrentUser();
  const { data } = useQuery({
    queryKey: ["recommended-job"],
    queryFn: () => CandidateServices.getRecommendedJob(),
  });
  const { data: dashboard } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => CandidateServices.dashboard(),
  });

  return (
    <div>
      <ApplyDialog />
      <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8 ">
        <header className="space-y-1 lg:space-y-3  border-b pb-5">
          <h1 className="text-2xl lg:text-3xl font-medium">
            Welcome back, {user?.first_name}
          </h1>
          <p className="text-[#475467] text-sm">
            Your current summary and activity.
          </p>
        </header>

        <div className="flex gap-6 items-center w-full overflow-x-scroll scroll-thumb-hidden">
          <StatsCard
            className="bg-[#78439326] border-[#784393]  min-w-[280px]"
            value={dashboard?.data?.applied_jobs}
            description={"Applied Jobs"}
            icon={<Icons.briefcase />}
          />
          <StatsCard
            className="bg-[#5E934326] border-[#5E9343]  min-w-[280px]"
            value={dashboard?.data?.saved_jobs}
            description={"Saved Jobs"}
            icon={<Icons.bookmark />}
          />
          <StatsCard
            className="bg-[#E2C46526] border-[#E2C465]  min-w-[280px]"
            value={dashboard?.data?.job_alerts}
            description={"Job Alerts"}
            icon={<Icons.bell className="size-8 text-[#E2C465] stroke-2" />}
          />
        </div>

        <JobListingTable jobs={data || {}} />
      </div>
    </div>
  );
}
