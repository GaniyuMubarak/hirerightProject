import JobBenefits from "@/components/candidate/job/benefits";
import HiringProcess from "@/components/candidate/job/hiring-process";
import JobCard from "@/components/candidate/job/job-card";
import JobDescription from "@/components/candidate/job/job-description";
import JobInfo from "@/components/candidate/job/job-info";
import JobOverview from "@/components/candidate/job/job-overview";
import JobTitle from "@/components/candidate/job/job-title";
import ShareJob from "@/components/candidate/job/share-job";
import CandidateServices from "@/services/candidate-services";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { ApplyDialog } from "../apply-dialog";

export default function JobDetails() {
  const params = useParams();
  const { data } = useQuery({
    queryKey: ["job-listing"],
    queryFn: () => CandidateServices.getJob(params.id as string),
  });

  const { data: recomemdedJobs } = useQuery({
    queryKey: ["recommended-jobs"],
    queryFn: () => CandidateServices.getRecommendedJob(),
  });
  const job = data?.data || {};

  return (
    <>
      <ApplyDialog />
      <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8 ">
        <div className="border max-lg:divide-y">
          <div className="p-4">
            <JobTitle job={job} />
          </div>
          <HiringProcess />
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <JobDescription job={job} />
          </div>
          <div className="lg:col-span-5 space-y-6">
            <JobInfo job={job} />
            <JobBenefits job={job} />
            <JobOverview job={job} />
            <ShareJob job={job} />
          </div>
        </div>

        <div className="space-y-4">
          <header className="space-y-1 border-b pb-2">
            <h1 className="text-xl font-medium">Related Jobs</h1>
          </header>
          <div className="grid lg:grid-cols-3 gap-6">
            {recomemdedJobs?.data?.map((job: any) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
