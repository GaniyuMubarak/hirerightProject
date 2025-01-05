import AutoFillForm from "@/components/onboarding/auto-fill-form";
import BasicInfoForm from "@/components/onboarding/basic-info-form";
import CertificationForm from "@/components/onboarding/certification-form";
import EducationForm from "@/components/onboarding/education-form";
import ExperienceForm from "@/components/onboarding/experience-form";
import NextStep from "@/components/onboarding/next-step";
import ProgressBar from "@/components/onboarding/progress-bar";
import ResumeForm from "@/components/onboarding/resume-form";
import SocialLinksForm from "@/components/onboarding/social-links-form";
import Logo from "@/components/shared/logo";
import { useState } from "react";

export default function Onboarding() {
  const [step, setStep] = useState(0);
  return (
    <div className="max-w-7xl mx-auto px-4 pt-6 space-y-8">
      <Logo />
      <div className="max-w-6xl mx-auto">
        <ProgressBar />
      </div>

      <h1 className="text-center text-2xl text-[#1B1B1C] font-medium mt-6">
        Fill in your details to find the right job for you
      </h1>

      <div className="max-w-5xl mx-auto space-y-8 pb-6">
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

        <NextStep step={step} setStep={setStep} />
      </div>
    </div>
  );
}
