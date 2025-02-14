import JobListingTable from "@/components/candidate/dashboard/job-listing-table";
import StatsCard from "@/components/candidate/dashboard/stats-cad";
import Icons from "@/components/ui/icons";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function Dashboard() {
  const user = useCurrentUser();
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["job-listing"],
  //   queryFn: () => CandidateJobServices.getAllJobs(),
  // });
  // const { data:dashboard, isLoading, isError } = useQuery({
  //   queryKey: ["dashboard"],
  //   queryFn: () => CandidateJobServices.getAllJobs(),
  // });

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8 ">
        <header className="space-y-3 border-b pb-5">
          <h1 className="text-3xl font-medium">
            Welcome back, {user?.first_name}
          </h1>
          <p className="text-[#475467] text-sm">
            Your current summary and activity.
          </p>
        </header>

        <div className="flex gap-6 items-center w-full">
          <StatsCard
            className="bg-[#78439326] border-[#784393]"
            value={112}
            description={"Applied Jobs"}
            icon={<Icons.briefcase />}
          />
          <StatsCard
            className="bg-[#5E934326] border-[#5E9343]"
            value={26}
            description={"Saved Jobs"}
            icon={<Icons.bookmark />}
          />
          <StatsCard
            className="bg-[#E2C46526] border-[#E2C465]"
            value={26}
            description={"Job Alerts"}
            icon={<Icons.bell className="size-8 text-[#E2C465] stroke-2" />}
          />
        </div>

        <JobListingTable />
      </div>
    </div>
  );
}
