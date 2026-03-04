import { useDialog } from "@/stores/dialog";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import Icons from "../../ui/icons";
import CompanyLogo from "../../ui/companyLogo";

export default function JobTitle({ job }: { job: any }) {
  const { open } = useDialog("apply-dialog");

  // const companyName = job?.company?.name ?? "";
  // const initial = companyName.charAt(0).toUpperCase();

  return (
    <div className="flex max-lg:flex-col lg:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {/* <div className="w-10 h-10 lg:h-[100px] lg:w-[100px] rounded-[6px] overflow-hidden shadow-[0px_3px_4px_-1px_#10182814] flex-shrink-0">
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
            className="w-full h-full flex items-center justify-center bg-[#A6C0FE] text-white text-2xl font-semibold">
            {initial}
          </div>
        </div> */}
        <CompanyLogo
          logoUrl={job?.company?.logo_url}
          companyName={job?.company?.name}
          size="lg"
        />
        <div className="flex flex-col justify-between h-full space-y-4">
          <span className="text-lg tracking-[-0.01em] leading-none">
            {job?.title}
          </span>
          <Badge className="rounded-[4px] py-[1px] px-2 w-fit">
            {job.employment_type === "part_time" ? "Part Time" : "Full Time"} •{" "}
            {job.work_mode}
          </Badge>
        </div>
      </div>

      <div className="flex gap-4 max-lg:justify-end">
        <Button variant={"secondary"} className="rounded-[6px] text-[#1B1B1C]">
          <Icons.bookmarkSm className="min-w-6 min-h-6" />
        </Button>
        <Button
          className="rounded-[6px] px-6"
          onClick={() => open("view", job)}>
          Apply Now
        </Button>
      </div>
    </div>
  );
}