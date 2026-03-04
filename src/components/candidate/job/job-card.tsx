import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { Badge } from "../../ui/badge";
import Icons from "../../ui/icons";
import CompanyLogo from "../../ui/companyLogo";


export default function JobCard({
  aiRecommended,
  job = {},
}: {
  aiRecommended?: Boolean;
  job: any;
}) {
  const companyName = job?.company?.name ?? "";
  // const initial = companyName.charAt(0).toUpperCase();

  return (
    <Link to={`/candidate/jobs/${job.id}`}>
      <div
        className={cn(
          "space-y-4 px-4 py-4 lg:py-6 border rounded-[6px]",
          aiRecommended && "bg-[#F8F8FD]",
        )}>
        {aiRecommended && (
          <div className="flex justify-end text-[#175CD3] text-sm">
            <div className="flex items-center gap-1 bg-[#EFF8FF] border border-[#B2DDFF] rounded-[4px] px-3 py-1.5">
              <Icons.bot />
              <span className="max-lg:hidden">AI-recommended </span>
              <Icons.stars />
            </div>
          </div>
        )}

        <h2 className="text-xl font-medium tracking-[-0.012em]">
          {job?.title}
        </h2>
        <div className="flex gap-3 items-center">
          <Badge className="rounded-[4px] py-[1px] px-2">Full-Time</Badge>
          <span className="text-sm text-[#0F132499] tracking-[-0.01em]">
            Salary:{" "}
            {`${job.salary_currency} ${Number(
              job.salary_min,
            ).toLocaleString()} - ${Number(job.salary_max).toLocaleString()}`}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* <div className="h-[55px] w-[55px] rounded-[6px] shadow-[0px_3px_4px_-1px_#10182814] overflow-hidden">
            {job?.company?.logo_url ? (
              <img
                src={job.company.logo_url}
                alt={companyName}
                className="object-cover w-full h-full aspect-square"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.removeAttribute("hidden");
                }}
              />
            ) : null}
            <div
              hidden={!!job?.company?.logo_url}
              className="w-full h-full flex items-center justify-center bg-[#A6C0FE] text-white text-xl font-semibold">
              {initial}
            </div>
          </div> */}
          <CompanyLogo
            logoUrl={job?.company?.logo_url}
            companyName={job?.company?.name}
            size="sm"
          />
          <div className="flex flex-col justify-between h-full space-y-2">
            <span className="text-lg tracking-[-0.01em] leading-none">
              {companyName}
            </span>
            <span className="text-[#475467] tracking-[-0.01em] flex items-center gap-1.5 text-base">
              <Icons.locationOutlined /> {job?.location}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}