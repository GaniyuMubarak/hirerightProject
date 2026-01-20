import React from "react";
import ProgressBar from "@/components/candidate/onboarding/progress-bar";
import EmployerAdditionalForm from "@/components/employer/onboarding/additional-info-form";
import EmployerBasicInfoForm from "@/components/employer/onboarding/basic-info-form";
import EmployerCompanyForm from "@/components/employer/onboarding/company-form";
import SocialLinksForm from "@/components/employer/onboarding/social-links-form";
import Logo from "@/components/shared/logo";
import NextStep from "@/components/shared/next-step";
import { Form } from "@/components/ui/form";
import useEmployerOnboardingForm from "@/hooks/forms/use-employee-onboarding-form";
import { useState } from "react";

export default function EmployerOnboarding() {
  const [step, setStep] = useState(0);
  const { form, onSubmit } = useEmployerOnboardingForm();

  // Define total steps
  const totalSteps = 4; // 0, 1, 2, 3 = 4 steps total

  return (
    <div className="max-w-7xl mx-auto px-4 pt-6 space-y-8 min-h-screen ">
      <div className="space-y-8">
        <Logo href="/" />
        <div className="max-w-6xl mx-auto">
          {/* Pass the required props to ProgressBar */}
          <ProgressBar currentStep={step + 1} totalSteps={totalSteps} />
        </div>
        <h1 className="text-center text-2xl text-[#1B1B1C] font-medium mt-6">
          Fill in your details to find the right candidate for you.
        </h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-5xl mx-auto space-y-8 pb-6 ">
          {/* Reorder steps to make Additional Info last */}
          {step === 0 && <EmployerBasicInfoForm />}
          {step === 1 && <EmployerCompanyForm />}
          {step === 2 && <SocialLinksForm />}
          {step === 3 && <EmployerAdditionalForm />}

          <div className="sticky bottom-0">
            {/* Pass totalSteps - 1 if NextStep expects the last step index */}
            <NextStep
              step={step}
              setStep={setStep}
              totalSteps={totalSteps - 1}
              // If NextStep has a prop for custom button text:
              buttonText={step === totalSteps - 2 ? "Proceed" : undefined}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}