import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";

export default function CandidateHeader() {
  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="h-[100px] w-[100px] rounded-[6px] shadow-[0px_3px_4px_-1px_#10182814]">
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
        <Button className="rounded-[6px]">View Applications</Button>
        <Button variant={"ghost"} className=" border-b rounded-none">
          <Icons.more className="min-h-6 min-w-6" />
        </Button>
      </div>
    </div>
  );
}
