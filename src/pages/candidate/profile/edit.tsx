// import BasicInfoForm from "@/components/candidate/onboarding/basic-info-form";
// import CertificationForm from "@/components/candidate/onboarding/certification-form";
// import EducationForm from "@/components/candidate/onboarding/education-form";
// import ExperienceForm from "@/components/candidate/onboarding/experience-form";
// import SocialLinksForm from "@/components/candidate/onboarding/social-links-form";
// import ChangePassword from "@/components/candidate/settings/change-password";
// import DeleteAccount from "@/components/candidate/settings/delete-account";
// import { ProfileSettings } from "@/components/candidate/settings/settings";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// export default function EditProfile() {
//   return (
//     <div className="max-w-5xl mx-auto px-4 pt-8 space-y-8 ">
//       <Tabs defaultValue="basic-info" className="w-full space-y-8">
//         <TabsList className="border-b w-full justify-start">
//           <TabsTrigger value="basic-info">Basic Information</TabsTrigger>
//           <TabsTrigger value="education">Experience & Education</TabsTrigger>
//           <TabsTrigger value="certificate">Certifications & Links</TabsTrigger>
//           <TabsTrigger value="settings">Account Settings</TabsTrigger>
//         </TabsList>
//         <TabsContent value="basic-info">
//           <div className="space-y-8">
//             <BasicInfoForm />
//             <div className="flex justify-end">
//               <Button className="rounded-[6px]">Save Changes</Button>{" "}
//             </div>
//           </div>
//         </TabsContent>
//         <TabsContent value="education">
//           <div className="space-y-8">
//             <ExperienceForm />
//             <EducationForm />
//             <div className="flex justify-end">
//               <Button className="rounded-[6px]">Save Changes</Button>{" "}
//             </div>
//           </div>
//         </TabsContent>
//         <TabsContent value="certificate">
//           <div className="space-y-8">
//             <CertificationForm />
//             <SocialLinksForm />
//             <div className="flex justify-end">
//               <Button className="rounded-[6px]">Save Changes</Button>{" "}
//             </div>
//           </div>
//         </TabsContent>
//         <TabsContent value="settings">
//           <ProfileSettings />
//           <ChangePassword />
//           <DeleteAccount />
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useEffect } from "react";
// import ProgressBar from "@/components/candidate/onboarding/progress-bar";
// import BasicInfoForm from "@/components/candidate/onboarding/basic-info-form";
// import EducationForm from "@/components/candidate/onboarding/education-form";
// import ExperienceForm from "@/components/candidate/onboarding/experience-form";
// import CertificationForm from "@/components/candidate/onboarding/certification-form";
// import SocialLinksForm from "@/components/candidate/onboarding/social-links-form";
// import { Form } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { Save, ArrowLeft, Loader2 } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import useOnboardingForm from "@/hooks/forms/use-onboarding-form";
// import ProfileServices from "@/services/profile-services";

// export default function EditProfile() {
//   const [step, setStep] = useState(0);
//   const totalSteps = 5;
//   const navigate = useNavigate();
//   const [initialData, setInitialData] = useState<any>(null);
//   const [isFetching, setIsFetching] = useState(true);

//   // Use your existing onboarding hook in edit mode
//   const { form, onSubmit, loading } = useOnboardingForm();

//   useEffect(() => {
//     fetchProfileData();
//   }, []);

//   const fetchProfileData = async () => {
//     try {
//       const response = await ProfileServices.getProfile({});
//       if (response.data) {
//         setInitialData(response.data);

//         // Transform API data to match your form structure
//         const formattedData = {
//           user: {
//             first_name: response.data.user?.first_name || "",
//             last_name: response.data.user?.last_name || "",
//             email: response.data.user?.email || "",
//             phone: response.data.user?.phone || "",
//             address: response.data.user?.address || "",
//             bio: response.data.user?.about || "",
//             title: response.data.user?.title || "",
//             location: response.data.user?.location || "",
//             website: response.data.user?.website || "",
//           },
//           education: response.data.education?.map((edu: any) => ({
//             institution: edu.institution || "",
//             degree: edu.degree || "",
//             field_of_study: edu.field_of_study || "",
//             location: edu.location || "",
//             start_date: edu.start_date || "",
//             end_date: edu.end_date || "",
//             is_current: !edu.end_date,
//           })) || [
//             {
//               institution: "",
//               degree: "",
//               field_of_study: "",
//               location: "",
//               start_date: "",
//               end_date: "",
//               is_current: false,
//             },
//           ],
//           experience: response.data.experiences?.map((exp: any) => ({
//             company_name: exp.company || "",
//             job_title: exp.position || "",
//             description: exp.description || "",
//             location: exp.location || "",
//             employment_type: exp.employment_type || "full_time",
//             start_date: exp.start_date || "",
//             end_date: exp.end_date || null,
//             is_current: !exp.end_date,
//           })) || [
//             {
//               company_name: "",
//               job_title: "",
//               description: "",
//               location: "",
//               employment_type: "full_time" as const,
//               start_date: "",
//               end_date: null,
//               is_current: false,
//             },
//           ],
//           certifications: response.data.certifications?.map((cert: any) => ({
//             name: cert.name || "",
//             organization: cert.issuing_organization || "",
//             issue_date: cert.issue_date || "",
//             expiration_date: cert.expiration_date || null,
//             has_expiry: !!cert.expiration_date,
//             is_expired: cert.is_expired || false,
//           })) || [
//             {
//               name: "",
//               organization: "",
//               issue_date: "",
//               expiration_date: null,
//               has_expiry: false,
//               is_expired: false,
//             },
//           ],
//           social_links: response.data.user?.social_links || {},
//           profile_picture: undefined,
//           resume: undefined,
//         };

//         // Reset form with fetched data
//         form.reset(formattedData);
//       }
//     } catch (error: any) {
//       console.error("Error fetching profile:", error);
//       toast.error("Failed to load profile data");
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   const handleStepChange = (newStep: number) => {
//     const currentStepFields = getStepFields(step);
//     form.trigger(currentStepFields).then((isValid) => {
//       if (isValid) {
//         setStep(newStep);
//       }
//     });
//   };

//   const getStepFields = (stepIndex: number): string[] => {
//     switch (stepIndex) {
//       case 0:
//         return [
//           "user.first_name",
//           "user.last_name",
//           "user.email",
//           "user.phone",
//         ];
//       case 1:
//         return ["user.title", "user.location", "user.bio"];
//       case 2:
//         return ["experience.0.company_name", "experience.0.job_title"];
//       case 3:
//         return ["education.0.institution", "education.0.degree"];
//       case 4:
//         return ["certifications.0.name", "certifications.0.organization"];
//       default:
//         return [];
//     }
//   };

//   const handleSubmit = async (data: any) => {
//     try {
//       // Call the existing onSubmit from hook
//       await onSubmit(data);
//       toast.success("Profile updated successfully");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       toast.error("Failed to update profile");
//     }
//   };

//   // Show loading while fetching profile data
//   if (isFetching) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="relative inline-block">
//             <div className="h-12 w-12 rounded-full border-4 border-gray-200"></div>
//             <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent absolute top-0 left-0 animate-spin"></div>
//           </div>
//           <p className="text-gray-600 mt-4">Loading your profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 pt-6 space-y-8 min-h-screen">
//       <div className="space-y-8">
//         <div className="flex items-center justify-between">
//           <Link
//             to="/candidate/profile"
//             className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary">
//             <ArrowLeft className="h-4 w-4" />
//             Back to Profile
//           </Link>
//         </div>
//         <div className="max-w-6xl mx-auto">
//           <div className="flex items-center justify-between mb-4">
//             <h1 className="text-2xl font-semibold">Edit Candidate Profile</h1>
//             <span className="text-sm text-muted-foreground">
//               Step {step + 1} of {totalSteps}
//             </span>
//           </div>
//           <ProgressBar currentStep={step + 1} totalSteps={totalSteps} />
//         </div>
//       </div>

//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(handleSubmit)}
//           className="max-w-5xl mx-auto space-y-8 pb-6">
//           <div className="hidden md:flex gap-2 justify-center mb-8">
//             {[
//               "Basic Info",
//               "About & Location",
//               "Experience",
//               "Education",
//               "Certifications & Links",
//             ].map((label, index) => (
//               <Button
//                 key={index}
//                 type="button"
//                 variant={step === index ? "default" : "outline"}
//                 onClick={() => handleStepChange(index)}
//                 disabled={loading}>
//                 {label}
//               </Button>
//             ))}
//           </div>

//           {/* Step 1: Basic Information */}
//           {step === 0 && (
//             <div className="space-y-6">
//               <BasicInfoForm form={form} />
//             </div>
//           )}

//           {/* Step 2: About & Location */}
//           {step === 1 && (
//             <div className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h3 className="text-lg font-semibold mb-4">
//                     Professional Details
//                   </h3>
//                   {/* You might need to extract these fields from BasicInfoForm */}
//                   <div className="space-y-4">
//                     {/* Title field */}
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium">
//                         Professional Title
//                       </label>
//                       <input
//                         {...form.register("user.title")}
//                         className="w-full px-3 py-2 border rounded-md"
//                         placeholder="e.g., Senior Frontend Developer"
//                       />
//                     </div>

//                     {/* Location field */}
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium">Location</label>
//                       <input
//                         {...form.register("user.location")}
//                         className="w-full px-3 py-2 border rounded-md"
//                         placeholder="e.g., New York, NY"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-semibold mb-4">About Me</h3>
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium">Bio</label>
//                     <textarea
//                       {...form.register("user.bio")}
//                       className="w-full px-3 py-2 border rounded-md min-h-[150px]"
//                       placeholder="Tell us about yourself, your experience, and what you're looking for..."
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 3: Experience */}
//           {step === 2 && (
//             <div className="space-y-6">
//               <ExperienceForm form={form} />
//             </div>
//           )}

//           {/* Step 4: Education */}
//           {step === 3 && (
//             <div className="space-y-6">
//               <EducationForm form={form} />
//             </div>
//           )}

//           {/* Step 5: Certifications & Social Links */}
//           {step === 4 && (
//             <div className="space-y-8">
//               <CertificationForm form={form} />
//               <SocialLinksForm form={form} />
//             </div>
//           )}

//           {/* Navigation Footer */}
//           <div className="sticky bottom-0 bg-background pt-4 border-t">
//             <div className="flex justify-between items-center max-w-5xl mx-auto">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => step > 0 && setStep(step - 1)}
//                 disabled={step === 0 || loading}>
//                 Previous
//               </Button>

//               <div className="flex items-center gap-4">
//                 {step < totalSteps - 1 ? (
//                   <Button
//                     type="button"
//                     onClick={() => handleStepChange(step + 1)}
//                     disabled={loading}>
//                     Next
//                   </Button>
//                 ) : (
//                   <Button type="submit" disabled={loading} className="gap-2">
//                     {loading ? (
//                       <>
//                         <Loader2 className="h-4 w-4 animate-spin" />
//                         Saving...
//                       </>
//                     ) : (
//                       <>
//                         <Save className="h-4 w-4" />
//                         Save Changes
//                       </>
//                     )}
//                   </Button>
//                 )}
//               </div>

//               <Button
//                 type="button"
//                 variant="ghost"
//                 onClick={() => navigate("/candidate/profile")}
//                 disabled={loading}>
//                 Cancel
//               </Button>
//             </div>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }








"use client";

// import Header from "@/components/candidate/profile/header";
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
import useOnboardingForm from "@/hooks/forms/use-onboarding-form";
import ProfileServices from "@/services/profile-services";

export default function EditProfile() {
  const [step, setStep] = useState(0);
  const totalSteps = 5;
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Use your existing onboarding hook but override the submit behavior
  const { form, onSubmit: originalOnSubmit, loading } = useOnboardingForm();

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await ProfileServices.getProfile({});
      if (response.data) {
        setInitialData(response.data);

        // Transform API data to match your form structure
        const formattedData = {
          user: {
            first_name: response.data.user?.first_name || "",
            last_name: response.data.user?.last_name || "",
            email: response.data.user?.email || "",
            phone: response.data.user?.phone || "",
            address: response.data.user?.address || "",
            bio: response.data.user?.about || "",
            title: response.data.user?.title || "",
            location: response.data.user?.location || "",
            website: response.data.user?.website || "",
          },
          education: response.data.education?.map((edu: any) => ({
            institution: edu.institution || "",
            degree: edu.degree || "",
            field_of_study: edu.field_of_study || "",
            location: edu.location || "",
            start_date: edu.start_date || "",
            end_date: edu.end_date || "",
            is_current: !edu.end_date,
          })) || [
            {
              institution: "",
              degree: "",
              field_of_study: "",
              location: "",
              start_date: "",
              end_date: "",
              is_current: false,
            },
          ],
          experience: response.data.experiences?.map((exp: any) => ({
            company_name: exp.company || "",
            job_title: exp.position || "",
            description: exp.description || "",
            location: exp.location || "",
            employment_type: exp.employment_type || "full_time",
            start_date: exp.start_date || "",
            end_date: exp.end_date || null,
            is_current: !exp.end_date,
          })) || [
            {
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
          certifications: response.data.certifications?.map((cert: any) => ({
            name: cert.name || "",
            organization: cert.issuing_organization || "",
            issue_date: cert.issue_date || "",
            expiration_date: cert.expiration_date || null,
            has_expiry: !!cert.expiration_date,
            is_expired: cert.is_expired || false,
          })) || [
            {
              name: "",
              organization: "",
              issue_date: "",
              expiration_date: null,
              has_expiry: false,
              is_expired: false,
            },
          ],
          social_links: response.data.user?.social_links || {},
          profile_picture: undefined,
          resume: undefined,
        };

        // Reset form with fetched data
        form.reset(formattedData);
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile data");
    } finally {
      setIsFetching(false);
    }
  };

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

  // Custom submit handler that redirects to profile page instead of dashboard
  const handleSubmit = async (data: any) => {
    setIsSaving(true);
    try {
      // Call the original onSubmit but override its navigation
      const result = await originalOnSubmit(data);

      // On success, navigate to profile page instead of dashboard
      toast.success("Profile updated successfully");
      navigate("/candidate/profile");

      return result;
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
      throw error;
    } finally {
      setIsSaving(false);
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
      {/* <Header profile={initialData?.user} /> */}
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
          onSubmit={form.handleSubmit(handleSubmit)}
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
                disabled={loading || isSaving}>
                {label}
              </Button>
            ))}
          </div>

          {/* Step 1: Basic Information */}
          {step === 0 && (
            <div className="space-y-6">
              <BasicInfoForm form={form} />
            </div>
          )}

          {/* Step 2: About & Location */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Professional Details
                  </h3>
                  <div className="space-y-4">
                    {/* Title field */}
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

                    {/* Location field */}
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
                      placeholder="Tell us about yourself, your experience, and what you're looking for..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Experience */}
          {step === 2 && (
            <div className="space-y-6">
              <ExperienceForm form={form} />
            </div>
          )}

          {/* Step 4: Education */}
          {step === 3 && (
            <div className="space-y-6">
              <EducationForm form={form} />
            </div>
          )}

          {/* Step 5: Certifications & Social Links */}
          {step === 4 && (
            <div className="space-y-8">
              <CertificationForm form={form} />
              <SocialLinksForm form={form} />
            </div>
          )}

          {/* Navigation Footer */}
          <div className="sticky bottom-0 bg-background pt-4 border-t">
            <div className="flex justify-between items-center max-w-5xl mx-auto">
              <Button
                type="button"
                variant="outline"
                onClick={() => step > 0 && setStep(step - 1)}
                disabled={step === 0 || loading || isSaving}>
                Previous
              </Button>

              <div className="flex items-center gap-4">
                {step < totalSteps - 1 ? (
                  <Button
                    type="button"
                    onClick={() => handleStepChange(step + 1)}
                    disabled={loading || isSaving}>
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={loading || isSaving}
                    className="gap-2">
                    {loading || isSaving ? (
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
                disabled={loading || isSaving}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}