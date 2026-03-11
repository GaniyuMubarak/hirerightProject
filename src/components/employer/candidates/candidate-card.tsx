import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
// import Icons from "../../ui/icons";
import { Bookmark, Download, Sparkles, Calendar, FileText } from "lucide-react";

interface CandidateCardProps {
  aiRecommended?: boolean;
  id: number | string;
  fullName: string;
  jobTitle?: string;
  avatarUrl?: string;
  appliedAt?: string;
  resumeUrl?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function CandidateCard({
  aiRecommended,
  id,
  fullName,
  jobTitle,
  avatarUrl,
  appliedAt,
  resumeUrl,
}: CandidateCardProps) {
  return (
    <Link to={`/employer/candidates/${id}`} className="block group">
      <div
        className={cn(
          "relative flex flex-col gap-4 p-5 rounded-[12px] border border-[#E4E7EC] bg-white",
          "transition-all duration-200 hover:shadow-[0px_8px_24px_rgba(16,24,40,0.08)] hover:border-[#D0D5DD] hover:-translate-y-0.5",
          aiRecommended && "border-[#B2DDFF] bg-[#F8FBFF]",
        )}>
        {/* AI badge */}
        {aiRecommended && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#EFF8FF] border border-[#B2DDFF] text-[#175CD3] text-xs font-medium rounded-full px-2.5 py-1">
            <Sparkles className="h-3 w-3" />
            AI match
          </div>
        )}

        {/* Avatar + Name */}
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={fullName}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-sm"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#6172F3] to-[#7A5AF8] flex items-center justify-center ring-2 ring-white shadow-sm">
                <span className="text-white text-sm font-semibold">
                  {getInitials(fullName)}
                </span>
              </div>
            )}
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#12B76A] ring-2 ring-white" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#101828] truncate leading-snug">
              {fullName}
            </p>
            <p className="text-xs text-[#667085] truncate mt-0.5">
              {jobTitle || "No title"}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#F2F4F7]" />

        {/* Meta */}
        <div className="flex flex-col gap-2">
          {appliedAt && (
            <div className="flex items-center gap-2 text-xs text-[#667085]">
              <Calendar className="h-3.5 w-3.5 shrink-0 text-[#98A2B3]" />
              <span>
                Applied{" "}
                {new Date(appliedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-[#667085]">
            <FileText className="h-3.5 w-3.5 shrink-0 text-[#98A2B3]" />
            <span>{resumeUrl ? "CV attached" : "No CV uploaded"}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          {resumeUrl ? (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9 text-xs gap-1.5 rounded-[8px] border-[#D0D5DD] text-[#344054] hover:bg-[#F9FAFB]"
              onClick={(e) => {
                e.preventDefault();
                window.open(resumeUrl, "_blank");
              }}>
              <Download className="h-3.5 w-3.5" />
              Download CV
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9 text-xs rounded-[8px] border-[#D0D5DD] text-[#98A2B3]"
              disabled>
              No CV
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-[8px] border-[#D0D5DD] text-[#667085] hover:bg-[#F9FAFB] shrink-0"
            onClick={(e) => e.preventDefault()}>
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
}