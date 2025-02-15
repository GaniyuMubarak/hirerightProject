import React from "react";

export default function JobBenefits({ job }: { job: any }) {
  return (
    <div className="flex flex-col gap-4 border rounded-[6px] p-4 w-full">
      <h2 className="font-medium text-[#1B1B1C]">Job Benefits</h2>

      <div className="flex gap-2 flex-wrap">
        {job?.benefits?.split(",")?.map((benefit: string) => (
          <BenefitsBadeg>{benefit}</BenefitsBadeg>
        ))}
      </div>
    </div>
  );
}

export function BenefitsBadeg({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[#667085] bg-[#68BBE333] border-[1.5px] border-[#253B7A] rounded-[3px] py-1.5 px-3 h-9 flex justify-center items-center">
      {children}
    </div>
  );
}
