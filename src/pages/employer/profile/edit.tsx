"use client";

import React, { useState } from "react";
import ProgressBar from "@/components/candidate/onboarding/progress-bar";
import EmployerAdditionalForm from "@/components/employer/onboarding/additional-info-form";
import EmployerBasicInfoForm from "@/components/employer/onboarding/basic-info-form";
import EmployerCompanyForm from "@/components/employer/onboarding/company-form";
import SocialLinksForm from "@/components/employer/onboarding/social-links-form";
// import Logo from "@/components/shared/logo";
import { Form } from "@/components/ui/form";
import useEmployerOnboardingForm from "@/hooks/forms/use-employee-onboarding-form";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function EmployerProfileEdit() {
  const [step, setStep] = useState(0);
  const totalSteps = 4;
  const navigate = useNavigate();

  // Pass isEditMode: true to enable edit functionality
  const { form, onSubmit, loading, isFetching } = useEmployerOnboardingForm({
    isEditMode: true,
  });

  const handleStepChange = (newStep: number) => {
    const currentStepFields = getStepFields(step);
    form.trigger(currentStepFields).then((isValid) => {
      if (isValid) {
        setStep(newStep);
      }
    });
  };

  const getStepFields = (stepIndex: number): string[] => {
    switch (stepIndex) {
      case 0:
        return ["firstName", "lastName", "email", "phone"];
      case 1:
        return ["name", "industry_code", "size_range", "location"];
      case 2:
        return ["website", "linkedin_url", "twitter_url"];
      case 3:
        return ["about"];
      default:
        return [];
    }
  };

  // Show loading while fetching profile data
  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="h-12 w-12 rounded-full border-4 border-gray-200"></div>
            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent absolute top-0 left-0 animate-spin"></div>
          </div>
          <p className="text-gray-600 mt-4">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-6 space-y-8 min-h-screen">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          {/* <Logo href="/employer/dashboard" /> */}
          {/* <Link
            to="/employer/profile"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Link> */}
          <Link
            to="/employer/profile"
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Link>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">Edit Company Profile</h1>
            <span className="text-sm text-muted-foreground">
              Step {step + 1} of {totalSteps}
            </span>
          </div>
          <ProgressBar currentStep={step + 1} totalSteps={totalSteps} />
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-5xl mx-auto space-y-8 pb-6">
          <div className="hidden md:flex gap-2 justify-center mb-8">
            {[...Array(totalSteps)].map((_, index) => (
              <Button
                key={index}
                type="button"
                variant={step === index ? "default" : "outline"}
                onClick={() => handleStepChange(index)}>
                {["Basic Info", "Company", "Social Links", "Additional"][index]}
              </Button>
            ))}
          </div>

          {step === 0 && <EmployerBasicInfoForm />}
          {step === 1 && <EmployerCompanyForm />}
          {step === 2 && <SocialLinksForm />}
          {step === 3 && <EmployerAdditionalForm />}

          <div className="sticky bottom-0 bg-background pt-4 border-t">
            <div className="flex justify-between items-center max-w-5xl mx-auto">
              <Button
                type="button"
                variant="outline"
                onClick={() => step > 0 && setStep(step - 1)}
                disabled={step === 0 || loading}>
                Previous
              </Button>
              <div className="flex items-center gap-4">
                {step < totalSteps - 1 ? (
                  <Button
                    type="button"
                    onClick={() => handleStepChange(step + 1)}
                    disabled={loading}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={loading} className="gap-2">
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                )}
              </div>
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate("/employer/profile")}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
