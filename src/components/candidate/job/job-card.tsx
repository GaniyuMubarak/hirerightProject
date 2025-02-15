import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { Badge } from "../../ui/badge";
import Icons from "../../ui/icons";

export default function JobCard({
  aiRecommended,
  job = {},
}: {
  aiRecommended?: Boolean;
  job: any;
}) {
  return (
    <Link to={`/candidate/jobs/${job.id}`}>
      <div
        className={cn(
          "space-y-4 px-4 py-6 border rounded-[6px]",
          aiRecommended && "bg-[#F8F8FD]"
        )}
      >
        {aiRecommended && (
          <div className="flex justify-end text-[#175CD3] text-sm">
            <div className="flex items-center gap-1 bg-[#EFF8FF] border border-[#B2DDFF] rounded-[4px] px-3 py-1.5">
              <Icons.bot />
              <span>AI-recommended </span>
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
              job.salary_min
            ).toLocaleString()} - ${Number(job.salary_max).toLocaleString()}`}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-[55px] w-[55px] rounded-[6px] shadow-[0px_3px_4px_-1px_#10182814]">
            <img
              src="/logo.svg"
              alt="Logo"
              className="object-cover w-full h-full aspect-square"
            />
          </div>
          <div className="flex flex-col justify-between h-full space-y-2">
            <span className="text-lg tracking-[-0.01em] leading-none">
              {job?.company?.name}
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
