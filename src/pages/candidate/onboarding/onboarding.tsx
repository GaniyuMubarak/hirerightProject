import AutoFillForm from "@/components/candidate/onboarding/auto-fill-form";
import BasicInfoForm from "@/components/candidate/onboarding/basic-info-form";
import CertificationForm from "@/components/candidate/onboarding/certification-form";
import EducationForm from "@/components/candidate/onboarding/education-form";
import ExperienceForm from "@/components/candidate/onboarding/experience-form";
import ProgressBar from "@/components/candidate/onboarding/progress-bar";
import ResumeForm from "@/components/candidate/onboarding/resume-form";
import SocialLinksForm from "@/components/candidate/onboarding/social-links-form";
import Logo from "@/components/shared/logo";
import NextStep from "@/components/shared/next-step";
import { Form } from "@/components/ui/form";
import useOnboardingForm from "@/hooks/forms/use-onboarding-form";
import { useState } from "react";

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const { form, onSubmit } = useOnboardingForm();
  return (
    <div className="max-w-7xl mx-auto px-4 pt-6 space-y-8">
      <Logo href="/" />
      <div className="max-w-6xl mx-auto">
        <ProgressBar />
      </div>

      <h1 className="text-center text-2xl text-[#1B1B1C] font-medium mt-6">
        Fill in your details to find the right job for you
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-5xl mx-auto space-y-8 pb-6"
        >
          {step === 0 && (
            <>
              <AutoFillForm />
              <BasicInfoForm />
              <ResumeForm />
            </>
          )}

          {step === 1 && (
            <>
              <ExperienceForm />
              <EducationForm />
            </>
          )}
          {step === 2 && (
            <>
              <CertificationForm />
              <SocialLinksForm />
            </>
          )}

          <NextStep step={step} setStep={setStep} totalSteps={2} />
        </form>
      </Form>
    </div>
  );
}
