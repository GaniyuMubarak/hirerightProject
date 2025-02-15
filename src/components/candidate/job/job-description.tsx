import { Separator } from "../../ui/separator";

export default function JobDescription({ job }: { job: any }) {
  return (
    <div className="space-y-8 border py-6 px-4 rounded-[6px]">
      {job?.description && (
        <div className="space-y-4">
          <h2 className="text-xl leading-none text-[#020C10] font-medium">
            Job Description
          </h2>
          <Separator />
          <p>{job?.description}</p>
        </div>
      )}
      {job?.requirements && (
        <div className="space-y-4">
          <h2 className="text-xl leading-none text-[#020C10] font-medium">
            Job requirements
          </h2>
          <Separator />
          <p>{job?.requirements}</p>
        </div>
      )}
      {job?.responsibilities && (
        <div className="space-y-4">
          <h2 className="text-xl leading-none text-[#020C10] font-medium">
            Job Responsibilities
          </h2>
          <Separator />
          <p>{job?.responsibilities}</p>
        </div>
      )}
    </div>
  );
}
