import JobBenefits from "@/components/candidate/job/benefits";
import HiringProcess from "@/components/candidate/job/hiring-process";
import JobCard from "@/components/candidate/job/job-card";
import JobDescription from "@/components/candidate/job/job-description";
import JobInfo from "@/components/candidate/job/job-info";
import JobOverview from "@/components/candidate/job/job-overview";
import JobTitle from "@/components/candidate/job/job-title";
import ShareJob from "@/components/candidate/job/share-job";

export default function JobDetails() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8 ">
      <div className="border">
        <div className="p-4">
          <JobTitle />
        </div>
        <HiringProcess />
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <JobDescription />
        </div>
        <div className="lg:col-span-5 space-y-6">
          <JobInfo />
          <JobBenefits />
          <JobOverview />
          <ShareJob />
        </div>
      </div>

      <div className="space-y-4">
        <header className="space-y-1 border-b pb-2">
          <h1 className="text-xl font-medium">Related Jobs</h1>
        </header>
        <div className="grid lg:grid-cols-3 gap-6">
          <JobCard />
          <JobCard />
          <JobCard />
        </div>
      </div>
    </div>
  );
}
