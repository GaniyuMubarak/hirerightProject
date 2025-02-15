import dayjs from "dayjs";
import React from "react";
import Icons from "../../ui/icons";
export default function JobOverview({ job }: { job: any }) {
  return (
    <div className="flex flex-col gap-4 border rounded-[6px] p-4 w-full">
      <h2 className="font-medium text-[#1B1B1C]">Job Overview</h2>
      <div className="grid lg:grid-cols-3 gap-3">
        <OverviewCard
          icon={<Icons.calendar />}
          title={"Job Posted"}
          desc={dayjs(job?.created_at).format("DD MMM, YYYY")}
        />
        <OverviewCard
          icon={<Icons.timer />}
          title={"Job expires"}
          desc={dayjs(job?.deadline).format("DD MMM, YYYY")}
        />
        <OverviewCard
          icon={<Icons.barChart />}
          title={"Experience level"}
          desc={job?.experience_level}
        />
        <OverviewCard
          icon={<Icons.wallet />}
          title={"Salary"}
          desc={"100,000 - 250,000"}
        />
        <OverviewCard
          icon={<Icons.briefCase2 />}
          title={"Education"}
          desc={"Graduate"}
        />
      </div>
    </div>
  );
}

export function OverviewCard({
  icon,
  desc,
  title,
}: {
  icon: React.ReactElement;
  desc: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-4  p-4 w-full">
      {icon}

      <div className="flex flex-col gap-1.5 ">
        <span className="text-xs font-medium  tracking-[-0.01em] text-[#475467]">
          {title}
        </span>
        <span className="text-sm tracking-[-0.01em] whitespace-nowrap">
          {desc}
        </span>
      </div>
    </div>
  );
}
