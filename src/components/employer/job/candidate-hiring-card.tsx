import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import Icons from "../../ui/icons";
import CompanyServices from "@/services/company-services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type ApplicationStatus =
  | "pending"
  | "applied"
  | "shortlisted"
  | "interview"
  | "hired"
  | "rejected";

interface ApplicationCandidate {
  id?: number;
  first_name?: string;
  last_name?: string;
  title?: string;
  email?: string;
  phone?: string;
  profile_image?: string;
  resume?: string;
}

interface TestResult {
  score?: number;
}

export interface Application {
  id: number | string;
  status?: ApplicationStatus | string;
  applied_at?: string;
  candidate?: ApplicationCandidate;
  job?: { title?: string };
  test_results?: TestResult;
  // Flat-shape fallbacks
  candidate_name?: string;
  job_title?: string;
  candidate_email?: string;
}

interface CandidateHiringCardProps {
  application: Application;
  /** Reserved for AI recommendation feature */
  aiRecommended?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<
  string,
  { bg: string; border: string; text: string }
> = {
  pending: {
    bg: "bg-[#F2F4F7]",
    border: "border-[#D0D5DD]",
    text: "text-[#475467]",
  },
  applied: {
    bg: "bg-[#F2F4F7]",
    border: "border-[#D0D5DD]",
    text: "text-[#475467]",
  },
  shortlisted: {
    bg: "bg-[#FEF6EE]",
    border: "border-[#F9DBAF]",
    text: "text-[#EE7B36]",
  },
  interview: {
    bg: "bg-[#EFF8FF]",
    border: "border-[#B2DDFF]",
    text: "text-[#175CD3]",
  },
  hired: {
    bg: "bg-[#ECFDF3]",
    border: "border-[#ABEFC6]",
    text: "text-[#067647]",
  },
  rejected: {
    bg: "bg-[#FFF1F3]",
    border: "border-[#FECDD6]",
    text: "text-[#C01048]",
  },
};

const STAGE_PROGRESSION: Partial<Record<string, string>> = {
  applied: "shortlisted",
  pending: "shortlisted",
  shortlisted: "interview",
  interview: "hired",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function CandidateHiringCard({
  application,
  aiRecommended,
}: CandidateHiringCardProps) {
  const queryClient = useQueryClient();

  const candidate = application.candidate;
  const candidateId = candidate?.id;

  const fullName = candidate
    ? `${candidate.first_name ?? ""} ${candidate.last_name ?? ""}`.trim() || "—"
    : (application.candidate_name ?? "—");

  const jobTitle = candidate?.title ?? application.job_title ?? "—";
  const email = candidate?.email ?? application.candidate_email ?? "";
  const phone = candidate?.phone ?? "";
  const profileImage =
    candidate?.profile_image ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=A6C0FE&color=fff&size=128`;
  const resumeUrl = candidate?.resume;
  const appliedJob = application.job?.title ?? application.job_title ?? "—";
  const testScore = application.test_results?.score;

  const status = (application.status ?? "pending").toLowerCase();
  const badge = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
  const nextStatus = STAGE_PROGRESSION[status];

  const appliedAt = application.applied_at
    ? new Date(application.applied_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: (newStatus: string) =>
      CompanyServices.updateApplicationStatus(String(application.id), {
        status: newStatus as ApplicationStatus,
      }),
    onSuccess: () => {
      toast.success("Application status updated.");
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
    },
    onError: () => {
      toast.error("Failed to update status.");
    },
  });

  const cardContent = (
    <div
      className={cn(
        "space-y-6 px-4 py-6 border rounded-[6px] flex gap-6",
        aiRecommended && "bg-[#F8F8FD]",
      )}>
      {/* Left column */}
      <div className="space-y-6 whitespace-nowrap w-[33%]">
        <div className="flex items-center gap-3">
          <img
            src={profileImage}
            alt={fullName}
            className="size-16 aspect-square rounded-full object-cover bg-gray-100 border-2 border-white shadow-sm shrink-0"
          />
          <div className="flex flex-col justify-between h-full space-y-2">
            <span className="text-base font-medium tracking-[-0.01em] leading-none">
              {fullName}
            </span>
            <span className="text-[#0F132499] tracking-[-0.01em] text-base">
              {jobTitle}
            </span>
          </div>
        </div>

        <Separator />

        <ul className="space-y-4 list-disc list-inside text-sm">
          {appliedAt && <li>Applied: {appliedAt}</li>}
          {email && <li>{email}</li>}
          {phone && <li>{phone}</li>}
        </ul>
      </div>

      {/* Right column */}
      <div className="w-full min-h-44 h-full flex flex-col justify-between">
        {/* AI badge row — renders nothing until aiRecommended is wired up */}
        <div className="min-h-1">
          {aiRecommended && (
            <div className="flex justify-end text-[#175CD3] text-sm">
              <div className="flex items-center gap-1 bg-[#EFF8FF] border border-[#B2DDFF] rounded-[4px] px-3 py-1.5">
                <Icons.bot />
                <span>AI-recommended</span>
                <Icons.stars />
              </div>
            </div>
          )}
        </div>

        {/* Stats row */}
        <div className="flex flex-1 justify-between items-center h-full">
          <div className="flex gap-12 text-center">
            <div>
              <h3 className="text-[#1B1B1C] text-2xl font-semibold mb-3">
                {appliedJob}
              </h3>
              <span className="text-lg text-[#475467] font-medium">
                Applied Role
              </span>
            </div>

            <div>
              <h3 className="text-[#1B1B1C] text-2xl font-semibold mb-3">
                {testScore != null ? testScore : "N/A"}
              </h3>
              <span className="text-lg text-[#475467] font-medium">
                Test Score
              </span>
            </div>

            <div>
              <div className="mb-3">
                <Badge
                  className={cn(
                    "rounded-[16px] text-base font-medium capitalize border",
                    badge.bg,
                    badge.border,
                    badge.text,
                  )}>
                  {status}
                </Badge>
              </div>
              <span className="text-lg text-[#475467] font-medium">
                Hiring Stage
              </span>
            </div>
          </div>

          {resumeUrl ? (
            <Button
              variant="link"
              className="px-0 h-11"
              onClick={(e) => {
                e.preventDefault();
                window.open(resumeUrl, "_blank");
              }}>
              <Icons.download className="min-w-4 min-h-4" />
              Download CV
            </Button>
          ) : (
            <Button
              variant="link"
              className="px-0 h-11 text-muted-foreground"
              disabled>
              <Icons.download className="min-w-4 min-h-4" />
              No CV
            </Button>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2.5 justify-end">
          <Button
            variant="secondary"
            className="border-[#D0D5DD] px-6 h-11 rounded-[6px]"
            disabled={isPending || status === "rejected"}
            onClick={(e) => {
              e.preventDefault();
              updateStatus("rejected");
            }}>
            Drop Candidate
          </Button>
          <Button
            className="px-6 h-11 rounded-[6px]"
            disabled={isPending || !nextStatus}
            onClick={(e) => {
              e.preventDefault();
              if (nextStatus) updateStatus(nextStatus);
            }}>
            {isPending ? "Updating..." : "Advance to next stage"}
          </Button>
        </div>
      </div>
    </div>
  );

  return candidateId ? (
    <Link to={`/employer/candidates/${candidateId}`}>{cardContent}</Link>
  ) : (
    <div className="cursor-default">{cardContent}</div>
  );
}