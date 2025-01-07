import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import Icons from "../../ui/icons";

export default function CandidateCard({
  aiRecommended,
}: {
  aiRecommended?: Boolean;
}) {
  return (
    <Link to="/employer/candidates/id">
      <div
        className={cn(
          "space-y-6 px-4 py-6 border rounded-[6px]",
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

        <div className="flex items-center gap-3">
          <div className="h-[64px] w-[64px] rounded-full">
            <img
              src="/images/testimonies/avatar.png"
              alt="Logo"
              className="object-cover w-full h-full aspect-square"
            />
          </div>
          <div className="flex flex-col justify-between h-full space-y-2">
            <span className="text-base font-medium tracking-[-0.01em] leading-none">
              Samson Bond
            </span>
            <span className="text-[#0F132499] tracking-[-0.01em] text-base">
              UI/UX Designer
            </span>
          </div>
        </div>

        <Separator />
        <ul className="space-y-4 list-disc list-inside">
          <li>7+ Years of Experience</li>
          <li>Education : Masters Degree</li>
          <li>Applied: Jan 23, 2024</li>
        </ul>

        <div className="flex gap-2.5">
          <Button variant={"link"} className="px-0 h-11">
            <Icons.download /> Download CV
          </Button>
          <Button variant={"outline"} className="px-6 h-11 bg-transparent">
            <Icons.bookmarkSm className="min-h-6 min-w-6" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
