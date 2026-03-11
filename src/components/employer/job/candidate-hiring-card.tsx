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

// Documented shape: GET /employers/jobs/{id}/applications returns `candidate`
interface ApplicationCandidate {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  title?: string;
  profile_image?: string;
  resume?: string;
}

// Actual API returns `user` instead of `candidate` (backend inconsistency)
interface ApplicationUser {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  title?: string;
  profile_image_url?: string;
  resume_url?: string;
}

interface TestResult {
  score?: number;
  passed?: boolean;
}

export interface Application {
  id: number | string;
  status?: ApplicationStatus | string;
  applied_at?: string; // documented field
  created_at?: string; // actual API field
  candidate?: ApplicationCandidate;
  user?: ApplicationUser; // actual API returns this
  job?: { id?: number; title?: string };
  test_results?: TestResult;
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

  // Normalise both API shapes: `candidate` (docs) and `user` (actual response)
  const person = application.candidate ?? application.user;
  const personId = person?.id;

  const fullName = person
    ? `${person.first_name ?? ""} ${person.last_name ?? ""}`.trim() || "—"
    : "—";

  const jobTitle = person?.title ?? "—";
  const email = person?.email ?? "";
  const phone = person?.phone ?? "";

  // profile_image (docs) vs profile_image_url (actual response)
  const profileImage =
    application.candidate?.profile_image ??
    application.user?.profile_image_url ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=A6C0FE&color=fff&size=128`;

  // resume (docs) vs resume_url (actual response)
  const resumeUrl =
    application.candidate?.resume ?? application.user?.resume_url;

  const appliedJob = application.job?.title ?? "—";
  const testScore = application.test_results?.score;

  // applied_at (docs) vs created_at (actual response)
  const dateStr = application.applied_at ?? application.created_at;
  const appliedAt = dateStr
    ? new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const status = (application.status ?? "pending").toLowerCase();
  const badge = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
  const nextStatus = STAGE_PROGRESSION[status];

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
        "p-4 lg:p-6 border rounded-[6px] flex flex-col lg:flex-row gap-6",
        aiRecommended && "bg-[#F8F8FD]",
      )}>
      {/* Left column */}
      <div className="space-y-4 lg:space-y-6 lg:w-[33%] lg:whitespace-nowrap">
        <div className="flex items-center gap-3">
          <img
            src={profileImage}
            alt={fullName}
            className="size-14 lg:size-16 aspect-square rounded-full object-cover bg-gray-100 border-2 border-white shadow-sm shrink-0"
          />
          <div className="flex flex-col justify-between h-full space-y-1.5 min-w-0">
            <span className="text-base font-medium tracking-[-0.01em] leading-none truncate">
              {fullName}
            </span>
            <span className="text-[#0F132499] tracking-[-0.01em] text-sm lg:text-base truncate">
              {jobTitle}
            </span>
          </div>
        </div>

        <Separator />

        <ul className="space-y-3 list-disc list-inside text-sm break-all">
          {appliedAt && <li>Applied: {appliedAt}</li>}
          {email && <li>{email}</li>}
          {phone && <li>{phone}</li>}
        </ul>
      </div>

      {/* Right column */}
      <div className="w-full flex flex-col gap-4 lg:gap-0 lg:min-h-44 lg:justify-between">
        {/* AI badge */}
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
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-wrap gap-6 lg:gap-12 text-center">
            <div>
              <h3 className="text-[#1B1B1C] text-lg lg:text-2xl font-semibold mb-1 lg:mb-3 truncate max-w-[120px] lg:max-w-none">
                {appliedJob}
              </h3>
              <span className="text-sm lg:text-lg text-[#475467] font-medium">
                Applied Role
              </span>
            </div>

            <div>
              <h3 className="text-[#1B1B1C] text-lg lg:text-2xl font-semibold mb-1 lg:mb-3">
                {testScore != null ? testScore : "N/A"}
              </h3>
              <span className="text-sm lg:text-lg text-[#475467] font-medium">
                Test Score
              </span>
            </div>

            <div>
              <div className="mb-1 lg:mb-3">
                <Badge
                  className={cn(
                    "rounded-[16px] text-sm lg:text-base font-medium capitalize border",
                    badge.bg,
                    badge.border,
                    badge.text,
                  )}>
                  {status}
                </Badge>
              </div>
              <span className="text-sm lg:text-lg text-[#475467] font-medium">
                Hiring Stage
              </span>
            </div>
          </div>

          {resumeUrl ? (
            <Button
              variant="link"
              className="px-0 h-9 lg:h-11 text-sm"
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
              className="px-0 h-9 lg:h-11 text-sm text-muted-foreground"
              disabled>
              <Icons.download className="min-w-4 min-h-4" />
              No CV
            </Button>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:justify-end">
          <Button
            variant="secondary"
            className="border-[#D0D5DD] px-6 h-10 lg:h-11 rounded-[6px] text-sm"
            disabled={isPending || status === "rejected"}
            onClick={(e) => {
              e.preventDefault();
              updateStatus("rejected");
            }}>
            Drop Candidate
          </Button>
          <Button
            className="px-6 h-10 lg:h-11 rounded-[6px] text-sm"
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

  return personId ? (
    <Link to={`/employer/candidates/${personId}`}>{cardContent}</Link>
  ) : (
    <div className="cursor-default">{cardContent}</div>
  );
}