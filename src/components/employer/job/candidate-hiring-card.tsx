import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import Icons from "../../ui/icons";

export default function CandidateHiringCard({
  candidate,
  aiRecommended,
}: {
  aiRecommended?: Boolean;
  candidate: any;
}) {
  return (
    <Link to="/employer/candidates/id">
      <div
        className={cn(
          "space-y-6 px-4 py-6 border rounded-[6px] flex gap-6",
          aiRecommended && "bg-[#F8F8FD]"
        )}
      >
        <div className="space-y-6 whitespace-nowrap w-[33%]">
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
                {candidate?.candidate_name}
              </span>
              <span className="text-[#0F132499] tracking-[-0.01em] text-base">
                {candidate?.job_title}
              </span>
            </div>
          </div>

          <Separator />
          <ul className="space-y-4 list-disc list-inside">
            <li>7+ Years of Experience</li>
            <li>Education : Masters Degree</li>
            <li>Applied: Jan 23, 2024</li>
          </ul>
        </div>

        <div className="w-full min-h-44 h-full flex flex-col justify-between">
          <div className="min-h-1">
            {aiRecommended && (
              <div className="flex justify-end text-[#175CD3] text-sm">
                <div className="flex items-center gap-1 bg-[#EFF8FF] border border-[#B2DDFF] rounded-[4px] px-3 py-1.5">
                  <Icons.bot />
                  <span>AI-recommended </span>
                  <Icons.stars />
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-1 justify-between items-center h-full">
            <div className="flex gap-12 text-center">
              <div>
                <h3 className="text-[#1B1B1C] text-2xl font-semibold mb-3">
                  Senior Level
                </h3>
                <span className="text-lg text-[#475467] font-medium">
                  Experience Level
                </span>
              </div>
              <div>
                <h3 className="text-[#1B1B1C] text-2xl font-semibold  mb-3">
                  80
                </h3>
                <span className="text-lg text-[#475467] font-medium">
                  Test score
                </span>
              </div>
              <div>
                <div className=" mb-3">
                  <Badge className="bg-[#FEF6EE] border-[#F9DBAF] rounded-[16px] text-[#EE7B36] text-base font-medium">
                    Interview
                  </Badge>
                </div>
                <span className="text-lg text-[#475467] font-medium">
                  Hiring Stage
                </span>
              </div>
            </div>

            <Button variant={"link"} className="px-0 h-11">
              <Icons.download className="min-w-4 min-h-4" /> Download CV
            </Button>
          </div>
          <div className="flex gap-2.5 justify-end">
            <Button
              variant={"secondary"}
              className="border-[#D0D5DD] px-6 h-11 rounded-[6px]"
            >
              Drop Candidate
            </Button>
            <Button className="px-6 h-11 rounded-[6px]">
              Advance to next stage
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
