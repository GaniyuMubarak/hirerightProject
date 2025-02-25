import Icons from "../../ui/icons";

export default function HiringProcess() {
  return (
    <div className="flex flex-col gap-5 lg:gap-2.5 bg-[#EAECF03B] px-5 lg:px-2.5 py-4">
      <h2 className="text-lg leading-none text-[#020C10] ">Hiring Process:</h2>
      <div className="max-w-3xl mx-auto flex justify-between items-center max-lg:gap-4 w-full overflow-x-scroll scroll-thumb-hidden">
        <div className="flex flex-col gap-4 lg:gap-6 items-center">
          <img
            src="/images/hiring-process/fit-check.png"
            alt="Job Fit Check"
            className="size-[50px] aspect-square object-cover "
          />
          <span className="whitespace-nowrap max-lg:text-[11px]">
            Job Fit Check
          </span>
        </div>
        <Icons.arrow className="min-w-10 min-h-20" />
        <div className="flex flex-col gap-4 lg:gap-6 items-center">
          <img
            src="/images/hiring-process/interview.png"
            alt="Interview"
            className="size-[50px] aspect-square object-cover "
          />
          <span className="whitespace-nowrap max-lg:text-[11px]">
            Interview
          </span>
        </div>
        <Icons.arrow className="min-w-10 min-h-20" />

        <div className="flex flex-col gap-4 lg:gap-6 items-center">
          <img
            src="/images/hiring-process/assessment.png"
            alt="Assessment"
            className="size-[50px] aspect-square object-cover "
          />
          <span className="whitespace-nowrap max-lg:text-[11px]">
            Assessment
          </span>
        </div>
        <Icons.arrow className="min-w-10 min-h-20" />

        <div className="flex flex-col gap-4 lg:gap-6 items-center">
          <img
            src="/images/hiring-process/offer.png"
            alt="Job Offer"
            className="size-[50px] aspect-square object-cover "
          />
          <span className="whitespace-nowrap max-lg:text-[11px]">
            Job Offer
          </span>
        </div>
      </div>
    </div>
  );
}
