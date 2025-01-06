import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import Icons from "../../ui/icons";

export default function JobTitle() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="h-[100px] w-[100px]">
          <img
            src="/logo.svg"
            alt="Logo"
            className="object-cover w-full h-full aspect-square"
          />
        </div>
        <div className="flex flex-col justify-between h-full space-y-4">
          <span className="text-lg tracking-[-0.01em] leading-none">
            Senior Product Designer
          </span>
          <Badge className="rounded-[4px] py-[1px] px-2 w-fit">Full-Time</Badge>
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant={"secondary"} className="rounded-[6px] text-[#1B1B1C] ">
          <Icons.bookmarkSm className="min-w-6 min-h-6" />
        </Button>
        <Button className="rounded-[6px] px-6">Apply Now</Button>
      </div>
    </div>
  );
}
