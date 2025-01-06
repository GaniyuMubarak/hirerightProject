import Icons from "../../ui/icons";

export default function HiringProcess() {
  return (
    <div className="flex flex-col gap-2.5 bg-[#EAECF03B] px-2.5 py-4">
      <h2 className="text-lg leading-none text-[#020C10]">Hiring Process:</h2>
      <div className="max-w-3xl mx-auto flex justify-between items-center w-full">
        <div className="flex flex-col gap-6 items-center">
          <img
            src="/images/hiring-process/fit-check.png"
            alt="Job Fit Check"
            className="size-[50px] aspect-square object-cover "
          />
          <span>Job Fit Check</span>
        </div>
        <Icons.arrow />
        <div className="flex flex-col gap-6 items-center">
          <img
            src="/images/hiring-process/interview.png"
            alt="Interview"
            className="size-[50px] aspect-square object-cover "
          />
          <span>Interview</span>
        </div>
        <Icons.arrow />

        <div className="flex flex-col gap-6 items-center">
          <img
            src="/images/hiring-process/assessment.png"
            alt="Assessment"
            className="size-[50px] aspect-square object-cover "
          />
          <span>Assessment</span>
        </div>
        <Icons.arrow />

        <div className="flex flex-col gap-6 items-center">
          <img
            src="/images/hiring-process/offer.png"
            alt="Job Offer"
            className="size-[50px] aspect-square object-cover "
          />
          <span>Job Offer</span>
        </div>
      </div>
    </div>
  );
}
