import AdditionalInformationForm from "@/components/employer/job/additional-information-form";
import JobbenefitsForm from "@/components/employer/job/job-benefits-form";
import JobDescriptionForm from "@/components/employer/job/job-description";
import JobTitleForm from "@/components/employer/job/job-title";
import JobVisibilityForm from "@/components/employer/job/job-visibility-form";
import LocationForm from "@/components/employer/job/location-form";
import SalaryForm from "@/components/employer/job/salary-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useJobForm from "@/hooks/forms/use-job-form";
import { Loader } from "lucide-react";

export default function PostJob() {
  const { form, onSubmit } = useJobForm();

  return (
    <div>
      <div className="max-w-5xl mx-auto pt-6">
        <h1 className="text-[28px] font-semibold text-[#1B1B1C]">Post a Job</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <JobTitleForm />
            <SalaryForm />
            <AdditionalInformationForm />
            <LocationForm />
            <JobbenefitsForm />
            <JobDescriptionForm />
            <JobVisibilityForm />

            <div className="flex justify-end">
              <Button
                type="submit"
                className="rounded-[6px] px-6"
                disabled={form.formState.isSubmitting}
              >
                Proceed{" "}
                {form.formState.isSubmitting && (
                  <Loader className="animate-spin" />
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
