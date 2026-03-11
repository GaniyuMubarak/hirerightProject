"use client";
import React, { useState, useEffect } from "react";
import ProgressBar from "@/components/candidate/onboarding/progress-bar";
import BasicInfoForm from "@/components/candidate/onboarding/basic-info-form";
import EducationForm from "@/components/candidate/onboarding/education-form";
import ExperienceForm from "@/components/candidate/onboarding/experience-form";
import CertificationForm from "@/components/candidate/onboarding/certification-form";
import SocialLinksForm from "@/components/candidate/onboarding/social-links-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import useOnboardingForm from "@/hooks/forms/use-onboarding-form";
import CandidateServices from "@/services/candidate-services";

export default function EditProfile() {
  const [step, setStep] = useState(0);
  const totalSteps = 5;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isFetching, setIsFetching] = useState(true);

  const { form, onSubmit, loading } = useOnboardingForm({
    updateMode: true,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      navigate("/candidate/profile");
    },
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await CandidateServices.getProfile();

      if (response?.data) {
        const d = response.data;

        form.reset({
          user: {
            first_name: d.user?.first_name || "",
            last_name: d.user?.last_name || "",
            email: d.user?.email || "",
            phone: d.user?.phone || "",
            address: d.user?.address || "",
            bio: d.user?.about || "",
            title: d.user?.title || "",
            location: d.user?.location || "",
            website: d.user?.website || "",
          },
          education: d.education?.length
            ? d.education.map((edu: any) => ({
                id: edu.id, // ✅ preserve id for update
                institution: edu.institution || "",
                degree: edu.degree || "",
                field_of_study: edu.field_of_study || "",
                location: edu.location || "",
                start_date: edu.start_date || "",
                end_date: edu.end_date || "",
                is_current: edu.is_current ?? !edu.end_date,
              }))
            : [
                {
                  id: undefined,
                  institution: "",
                  degree: "",
                  field_of_study: "",
                  location: "",
                  start_date: "",
                  end_date: "",
                  is_current: false,
                },
              ],
          experience: d.experiences?.length
            ? d.experiences.map((exp: any) => ({
                id: exp.id, // ✅ preserve id for update
                company_name: exp.company_name || exp.company || "",
                job_title: exp.job_title || exp.position || "",
                description: exp.description || "",
                location: exp.location || "",
                employment_type: exp.employment_type || "full_time",
                start_date: exp.start_date || "",
                end_date: exp.end_date || null,
                is_current: exp.is_current ?? !exp.end_date,
              }))
            : [
                {
                  id: undefined,
                  company_name: "",
                  job_title: "",
                  description: "",
                  location: "",
                  employment_type: "full_time" as const,
                  start_date: "",
                  end_date: null,
                  is_current: false,
                },
              ],
          certifications: d.certifications?.length
            ? d.certifications.map((cert: any) => ({
                id: cert.id, // ✅ preserve id for update
                name: cert.name || "",
                organization:
                  cert.issuing_organization || cert.organization || "",
                issue_date: cert.issue_date || "",
                expiration_date: cert.expiration_date || null,
                has_expiry: !!cert.expiration_date,
                is_expired: cert.is_expired || false,
              }))
            : [
                {
                  id: undefined,
                  name: "",
                  organization: "",
                  issue_date: "",
                  expiration_date: null,
                  has_expiry: false,
                  is_expired: false,
                },
              ],
          social_links: d.user?.social_links || {},
          profile_picture: undefined,
          // profile_picture: d.user?.profile_image || "",
          resume: undefined,
          // resume: d.user?.resume || "",
        });
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile data");
    } finally {
      setIsFetching(false);
    }
  };

  const handleStepChange = (newStep: number) => {
    form.trigger(getStepFields(step)).then((isValid) => {
      if (isValid) setStep(newStep);
    });
  };

  const getStepFields = (stepIndex: number): string[] => {
    switch (stepIndex) {
      case 0:
        return [
          "user.first_name",
          "user.last_name",
          "user.email",
          "user.phone",
        ];
      case 1:
        return ["user.title", "user.location", "user.bio"];
      case 2:
        return ["experience.0.company_name", "experience.0.job_title"];
      case 3:
        return ["education.0.institution", "education.0.degree"];
      case 4:
        return ["certifications.0.name", "certifications.0.organization"];
      default:
        return [];
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="h-12 w-12 rounded-full border-4 border-gray-200" />
            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent absolute top-0 left-0 animate-spin" />
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
          <Link
            to="/candidate/profile"
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Link>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">Edit Candidate Profile</h1>
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
            {[
              "Basic Info",
              "About & Location",
              "Experience",
              "Education",
              "Certifications & Links",
            ].map((label, index) => (
              <Button
                key={index}
                type="button"
                variant={step === index ? "default" : "outline"}
                onClick={() => handleStepChange(index)}
                disabled={loading}>
                {label}
              </Button>
            ))}
          </div>

          {step === 0 && (
            <div className="space-y-6">
              <BasicInfoForm form={form} />
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Professional Details
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Professional Title
                      </label>
                      <input
                        {...form.register("user.title")}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="e.g., Senior Frontend Developer"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <input
                        {...form.register("user.location")}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="e.g., New York, NY"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">About Me</h3>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bio</label>
                    <textarea
                      {...form.register("user.bio")}
                      className="w-full px-3 py-2 border rounded-md min-h-[150px]"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <ExperienceForm form={form} />
            </div>
          )}
          {step === 3 && (
            <div className="space-y-6">
              <EducationForm form={form} />
            </div>
          )}
          {step === 4 && (
            <div className="space-y-8">
              <CertificationForm form={form} />
              <SocialLinksForm form={form} />
            </div>
          )}

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
                onClick={() => navigate("/candidate/profile")}
                disabled={loading}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}