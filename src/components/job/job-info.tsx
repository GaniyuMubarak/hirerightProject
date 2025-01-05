import React from "react";
import Icons from "../ui/icons";

export default function JobInfo() {
  return (
    <div className="flex gap-4">
      <InfoCard
        icon={<Icons.monies />}
        range="100,000 - 250,000"
        title=" Monthly Salary"
      />
      <InfoCard
        icon={<Icons.map />}
        range="Lagos, Nigeria"
        title="Job Location"
      />
      <InfoCard
        icon={<Icons.worldLocation />}
        range="Worldwide"
        title="Job type"
      />
    </div>
  );
}

export function InfoCard({
  icon,
  range,
  title,
}: {
  icon: React.ReactElement;
  range: string;
  title: string;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-4 border rounded-[6px] p-4 w-full">
      {icon}
      <span className="text-sm text-[#475467] tracking-[-0.01em] whitespace-nowrap">
        {range}
      </span>
      <span className="text-xs font-medium  tracking-[-0.01em]">{title}</span>
    </div>
  );
}
