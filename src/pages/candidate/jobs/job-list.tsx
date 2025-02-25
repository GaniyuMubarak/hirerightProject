import Filters from "@/components/candidate/job/filters";
import JobCard from "@/components/candidate/job/job-card";
import JobPagination from "@/components/candidate/job/pagination";
import useQueryParams from "@/hooks/use-query-params";
import { cn } from "@/lib/utils";
import CandidateServices from "@/services/candidate-services";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router";

export default function JobList() {
  const { queryParams } = useQueryParams();
  const winLocation = useLocation();

  const {
    q,
    location,
    type,
    experience_level,
    salary_min,
    salary_max,
    sort_by,
    per_page,
  } = queryParams;
  const { data } = useQuery({
    queryKey: ["recommended-jobs"],
    queryFn: () => CandidateServices.getRecommendedJob(),
  });
  const { data: jobList } = useQuery({
    queryKey: [
      "job-listing",
      q,
      location,
      type,
      experience_level,
      salary_min,
      salary_max,
      sort_by,
      per_page,
    ],
    queryFn: () =>
      CandidateServices.getAllJobs({
        q,
        location,
        type,
        experience_level,
        salary_min,
        salary_max,
        sort_by,
        per_page,
      }),
  });

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8 ">
      <Filters />

      <div className={cn("space-y-4", winLocation?.search !== "" && "hidden")}>
        <header className="space-y-1 border-b pb-5">
          <h1 className="text-lg lg:text-2xl font-semibold">
            AI Recommended for you
          </h1>
          <p className="text-[#475467] text-xs lg:text-sm">
            Best AI matches from HIRE RIGHT
          </p>
        </header>
        <div className="grid lg:grid-cols-3 gap-6">
          {data?.data?.map((job: any) => (
            <JobCard aiRecommended key={job.id} job={job} />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <header className="space-y-1 border-b pb-5">
          <h1 className="text-lg lg:text-2xl font-semibold">Jobs for You</h1>
          <p className="text-[#475467] text-xs lg:text-sm">
            Get the right job for you.
          </p>
        </header>
        <div className="grid lg:grid-cols-3 gap-6">
          {jobList?.data?.data?.map((job: any) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>

      <JobPagination />
    </div>
  );
}
