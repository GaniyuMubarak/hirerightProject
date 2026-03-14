import { useNavigate, useLocation } from "react-router"; // ✅ add
import { useUser } from "@/providers/user-context"; // ✅ add

import { useDialog } from "@/stores/dialog";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import Icons from "../../ui/icons";
import CompanyLogo from "../../ui/companyLogo";

export default function JobTitle({ job }: { job: any }) {
  const { open } = useDialog("apply-dialog");
  const { state } = useUser(); // ✅ add
  const navigate = useNavigate(); // ✅ add
  const location = useLocation(); // ✅ add

  // ✅ Replace onClick inline with this handler
  const handleApply = () => {
    if (!state.userInfo) {
      navigate("/sign-up", { state: { from: location.pathname } });
      return;
    }
    open("view", job);
  };

  return (
    <div className="flex max-lg:flex-col lg:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
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
        {/* <Button
          className="rounded-[6px] px-6"
          onClick={() => open("view", job)}>
          Apply Now
        </Button> */}

        <Button className="rounded-[6px] px-6" onClick={handleApply}>
          Apply Now
        </Button>
      </div>
    </div>
  );
}
