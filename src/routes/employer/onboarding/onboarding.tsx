import ProgressBar from "@/components/candidate/onboarding/progress-bar";
import EmployerAdditionalForm from "@/components/employer/onboarding/additional-info-form";
import EmployerBasicInfoForm from "@/components/employer/onboarding/basic-info-form";
import EmployerCompanyForm from "@/components/employer/onboarding/company-form";
import NextStep from "@/components/employer/onboarding/next-step";
import SocialLinksForm from "@/components/employer/onboarding/social-links-form";
import Logo from "@/components/shared/logo";
import { useState } from "react";

export default function EmployerOnboarding() {
  const [step, setStep] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-6 space-y-8 min-h-screen ">
      <div className="space-y-8">
        <Logo href="/" />
        <div className="max-w-6xl mx-auto">
          <ProgressBar />
        </div>
        <h1 className="text-center text-2xl text-[#1B1B1C] font-medium mt-6">
          Fill in your details to find the right candidate for you.
        </h1>
      </div>

      <div className="max-w-5xl mx-auto space-y-8 pb-6 ">
        {step === 0 && (
          <>
            <EmployerBasicInfoForm />
          </>
        )}
        {step === 1 && (
          <>
            <EmployerCompanyForm />
          </>
        )}
        {step === 2 && (
          <>
            <SocialLinksForm />
          </>
        )}
        {step === 3 && (
          <>
            <EmployerAdditionalForm />
          </>
        )}

        <div className="sticky bottom-0">
          <NextStep step={step} setStep={setStep} />
        </div>
      </div>
    </div>
  );
}
