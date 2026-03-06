// ─────────────────────────────────────────────────────────────────────────
// This page is for managing the hiring process of a specific job, including
// viewing candidates who applied, their statuses, and taking actions like
// scheduling interviews or sending offers.
// Working perfectly
// ─────────────────────────────────────────────────────────────────────────

import CandidateHiringCard, {
  type Application,
} from "@/components/employer/job/candidate-hiring-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import CompanyServices from "@/services/company-services";
import CompanyLogo from "@/components/ui/companyLogo";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Loader2 } from "lucide-react";

export default function HiringProcess() {
  const { jobId } = useParams<{ jobId: string }>();

  const { data, isPending, isError } = useQuery({
    queryKey: ["job-applications", jobId],
    queryFn: () => CompanyServices.getJobApplications(jobId as string),
    enabled: !!jobId,
  });

  const { data: jobData } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => CompanyServices.getJobById(jobId as string),
    enabled: !!jobId,
  });

  const { data: companyData } = useQuery({
    queryKey: ["employer-company"],
    queryFn: () => CompanyServices.getCompany(),
  });
  const applications: Application[] = data?.data?.data ?? [];
  const job = jobData?.data;
  const company = companyData?.data;

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8">
      {/* Job header */}
      <div className="flex justify-between items-center gap-4 border p-4 bg-white rounded-[8px]">
        <div className="flex items-center gap-3">
          <CompanyLogo
            logoUrl={company?.logo}
            companyName={company?.name}
            size="lg"
          />
          <div className="flex flex-col justify-between h-full space-y-2">
            <span className="text-[#14151A] text-xl tracking-[-0.012em] font-medium leading-none">
              {job?.title || "—"}
            </span>
            {job?.employment_type && (
              <Badge className="py-0.5 px-2 w-fit rounded capitalize">
                {job.employment_type.replace("_", " ")}
              </Badge>
            )}
          </div>
        </div>
        <Button variant="ghost" className="border-b rounded-none">
          <Icons.more className="min-h-6 min-w-6" />
        </Button>
      </div>

      {/* Section header */}
      <header className="space-y-1 border-b pb-5">
        <h1 className="text-2xl font-semibold">
          Candidates ({applications.length})
        </h1>
        <p className="text-[#475467] text-sm">
          Best AI matches from HIRE RIGHT
        </p>
      </header>

      {/* Candidates list */}
      {isPending ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : isError ? (
        <div className="flex justify-center py-20">
          <p className="text-destructive">Failed to load applications.</p>
        </div>
      ) : applications.length === 0 ? (
        <p className="text-muted-foreground text-sm py-10 text-center">
          No candidates have applied for this job yet.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {applications.map((application) => (
            <CandidateHiringCard
              key={application.id}
              application={application}
            />
          ))}
        </div>
      )}
    </div>
  );
}