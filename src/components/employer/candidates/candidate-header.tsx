import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Link } from "react-router";

export default function CandidateHeader() {
  return (
    <div className="flex max-lg:flex-col justify-between lg:items-center gap-6">
      <div className="flex items-center gap-3">
        <div className="h-10 lg:h-[100px] w-10 lg:w-[100px] rounded-[6px] shadow-[0px_3px_4px_-1px_#10182814]">
          <img
            src="/logo.svg"
            alt="Logo"
            className="object-cover w-full h-full aspect-square"
          />
        </div>
        <div className="flex flex-col justify-between h-full space-y-2">
          <span className="text-[#14151A] text-xl tracking-[-0.012em] font-medium leading-none">
            Senior Product Designer
          </span>
          <Badge className="py-0.5 px-2 w-fit rounded">Full Time</Badge>
        </div>
      </div>
      <div className="flex gap-4 justify-end">
        <Link to="/employer/jobs/applications">
          <Button className="rounded-[6px]">Start Hiring Process</Button>
        </Link>
        <Button variant={"ghost"} className=" border-b rounded-none">
          <Icons.more className="min-h-6 min-w-6" />
        </Button>
      </div>
    </div>
  );
}
