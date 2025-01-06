import AdditionalInformationForm from "@/components/employer/job/additional-information-form";
import JobbenefitsForm from "@/components/employer/job/job-benefits-form";
import JobDescriptionForm from "@/components/employer/job/job-description";
import JobTitleForm from "@/components/employer/job/job-title";
import LocationForm from "@/components/employer/job/location-form";
import SalaryForm from "@/components/employer/job/salary-form";
import { Button } from "@/components/ui/button";

export default function PostJob() {
  return (
    <div>
      <div className="max-w-5xl mx-auto pt-6">
        <h1 className="text-[28px] font-semibold text-[#1B1B1C]">Post a Job</h1>

        <div className="space-y-8">
          <JobTitleForm />
          <SalaryForm />
          <AdditionalInformationForm />
          <LocationForm />
          <JobbenefitsForm />
          <JobDescriptionForm />
          <div className="flex justify-end">
            <Button className="rounded-[6px] px-6">Proceed</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
