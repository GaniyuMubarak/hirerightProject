import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import CompanyLogo from "@/components/ui/companyLogo";
import { Link } from "react-router";

interface CandidateHeaderProps {
  companyName?: string;
  companyLogo?: string;
  total?: number;
}

export default function CandidateHeader({
  companyName,
  total,
  companyLogo,
}: CandidateHeaderProps) {
  return (
    <div className="flex max-lg:flex-col justify-between lg:items-center gap-6">
      <div className="flex items-center gap-3">
        <CompanyLogo
          logoUrl={companyLogo}
          companyName={companyName}
          size="lg"
        />
        <div className="flex flex-col justify-between h-full space-y-2">
          <span className="text-[#14151A] text-xl tracking-[-0.012em] font-medium leading-none">
            {companyName || "Company Name"}
          </span>
          {total != null && (
            <span className="text-sm text-[#475467]">
              {total} applicant{total !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-4 justify-end">
        <Link to="/employer/jobs">
          <Button className="rounded-[6px]">Start Hiring Process</Button>
        </Link>
        <Button variant="ghost" className="border-b rounded-none">
          <Icons.more className="min-h-6 min-w-6" />
        </Button>
      </div>
    </div>
  );
}