import Filters from "@/components/job/filters";
import JobCard from "@/components/job/job-card";
import JobPagination from "@/components/job/pagination";

export default function JobList() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8 ">
      <Filters />

      <div className="space-y-4">
        <header className="space-y-1 border-b pb-5">
          <h1 className="text-2xl font-semibold">AI Recommended for you</h1>
          <p className="text-[#475467] text-sm">
            Best AI matches from HIRE RIGHT
          </p>
        </header>
        <div className="grid lg:grid-cols-3 gap-6">
          <JobCard aiRecommended />
          <JobCard aiRecommended />
          <JobCard aiRecommended />
          <JobCard aiRecommended />
          <JobCard aiRecommended />
        </div>
      </div>
      <div className="space-y-4">
        <header className="space-y-1 border-b pb-5">
          <h1 className="text-2xl font-semibold">Jobs for You</h1>
          <p className="text-[#475467] text-sm">Get the right job for you.</p>
        </header>
        <div className="grid lg:grid-cols-3 gap-6">
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
        </div>
      </div>

      <JobPagination />
    </div>
  );
}
