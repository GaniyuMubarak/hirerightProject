import { Button } from "../../ui/button";
import Icons from "../../ui/icons";

export default function SocialLinks() {
  return (
    <div className="flex flex-col gap-4 border-b pb-4 rounded-[6px] w-full">
      <h2 className="font-medium text-[#1B1B1C]">Social Media</h2>
      <div className="flex gap-2.5">
        <Button variant={"secondary"} className="rounded-[6px]">
          <Icons.facebook2 className="min-w-6 min-h-6" />
        </Button>
        <Button variant={"secondary"} className="rounded-[6px]">
          <Icons.instagram2 className="min-w-6 min-h-6" />
        </Button>
      </div>
    </div>
  );
}
