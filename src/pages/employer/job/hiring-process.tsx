import CandidateHiringCard from "@/components/employer/job/candidate-hiring-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import CompanyServices from "@/services/company-services";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function HiringProcess() {
  const params = useParams();
  const { data } = useQuery({
    queryKey: ["application-listing"],
    queryFn: () => CompanyServices.getJobApplications(params.jobId as string),
  });

  // console.log("data", data?.data);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 space-y-8 ">
      <div className="flex justify-between items-center gap-4 border p-4 bg-white rounded-[8px]">
        <div className="flex items-center gap-3">
          <div className="h-[100px] w-[100px] rounded-[6px]">
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
          <Button variant={"ghost"} className=" border-b rounded-none">
            <Icons.more className="min-h-6 min-w-6" />
          </Button>
        </div>
      </div>
      <header className="space-y-1 border-b pb-5">
        <h1 className="text-2xl font-semibold">Candidates (15)</h1>
        <p className="text-[#475467] text-sm">
          Best AI matches from HIRE RIGHT
        </p>
      </header>
      <div className="flex flex-col gap-6">
        {data?.data?.map((item: any) => (
          <CandidateHiringCard candidate={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
