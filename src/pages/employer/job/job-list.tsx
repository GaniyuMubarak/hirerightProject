import EmployerJobListing from "@/components/employer/job/job-listing";
import JobServices from "@/services/job-services";
import { useQuery } from "@tanstack/react-query";

export default function EmployerJobList() {
  const { data } = useQuery({
    queryKey: ["job-listing"],
    queryFn: () => JobServices.getAllJobs(),
  });

  // console.log("data", data);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8 ">
      <EmployerJobListing job={data} />
    </div>
  );
}
