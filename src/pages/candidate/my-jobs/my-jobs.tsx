import MyJobList from "@/components/candidate/job/my-job-list";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CandidateServices from "@/services/candidate-services";
import { useQuery } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";
import { Link } from "react-router";

export default function MyJobs() {
  const { data } = useQuery({
    queryKey: ["applications"],
    queryFn: () => CandidateServices.applications(),
  });

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8 ">
      {data?.data?.length !== 0 && <MyJobList job={data} />}

      {data?.data?.length === 0 && (
        <div className="flex flex-col justify-center items-center gap-3 py-16">
          <p>You don't have any applications.</p>
          <p> Click HERE to start applying</p>
          <Link
            to="/candidate/jobs"
            className={cn(buttonVariants({ variant: "ghost" }), "text-primary")}
          >
            <CirclePlus strokeWidth={1.5} />
            Apply
          </Link>
        </div>
      )}
    </div>
  );
}
