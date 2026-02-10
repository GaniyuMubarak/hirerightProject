// import AdditionalInformationForm from "@/components/employer/job/additional-information-form";
// import JobbenefitsForm from "@/components/employer/job/job-benefits-form";
// import JobDescriptionForm from "@/components/employer/job/job-description";
// import JobTitleForm from "@/components/employer/job/job-title";
// import JobVisibilityForm from "@/components/employer/job/job-visibility-form";
// import LocationForm from "@/components/employer/job/location-form";
// import SalaryForm from "@/components/employer/job/salary-form";
// import { Button } from "@/components/ui/button";
// import { Form } from "@/components/ui/form";
// import useJobForm from "@/hooks/forms/use-job-form";
// import { Loader } from "lucide-react";

// export default function PostJob() {
//   const { form, onSubmit } = useJobForm();

//   return (
//     <div>
//       <div className="max-w-5xl mx-auto px-5 pt-6">
//         <h1 className="text-lg lg:text-[28px] font-semibold text-[#1B1B1C] ">
//           Post a Job
//         </h1>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             <JobTitleForm />
//             <SalaryForm />
//             <AdditionalInformationForm />
//             <LocationForm />
//             <JobbenefitsForm />
//             <JobDescriptionForm />
//             <JobVisibilityForm />

//             <div className="flex justify-end">
//               <Button
//                 type="submit"
//                 className="rounded-[6px] px-6 max-lg:w-full"
//                 disabled={form.formState.isSubmitting}
//               >
//                 Proceed{" "}
//                 {form.formState.isSubmitting && (
//                   <Loader className="animate-spin" />
//                 )}
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useUser } from "@/providers/user-context";
import AdditionalInformationForm from "@/components/employer/job/additional-information-form";
import JobbenefitsForm from "@/components/employer/job/job-benefits-form";
import JobDescriptionForm from "@/components/employer/job/job-description";
import JobTitleForm from "@/components/employer/job/job-title";
import JobVisibilityForm from "@/components/employer/job/job-visibility-form";
import LocationForm from "@/components/employer/job/location-form";
import SalaryForm from "@/components/employer/job/salary-form";
import HiringStagesForm from "@/components/employer/job/hiring-stages-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useJobForm from "@/hooks/forms/use-job-form";
import {
  Loader,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import JobServices from "@/services/job-services";
import { useNavigate } from "react-router";

// Constants for localStorage keys
const JOB_STORAGE_KEY = "post-job-created-id";
const JOB_STEP_KEY = "post-job-current-step";

export default function PostJob() {
  const { form } = useJobForm();
  const [currentStep, setCurrentStep] = useState(1);
  const [createdJobId, setCreatedJobId] = useState<number | null>(null);
  const [isSubmittingJob, setIsSubmittingJob] = useState(false);
  const [isSubmittingStages, setIsSubmittingStages] = useState(false);
  const [hiringStages, setHiringStages] = useState<any[]>([]);
  const navigate = useNavigate();
  const { state } = useUser();

  // Load saved job ID and step from localStorage on component mount
  useEffect(() => {
    try {
      const savedJobId = localStorage.getItem(JOB_STORAGE_KEY);
      const savedStep = localStorage.getItem(JOB_STEP_KEY);

      if (savedJobId) {
        const jobId = parseInt(savedJobId, 10);
        if (!isNaN(jobId)) {
          setCreatedJobId(jobId);
          console.log("✅ Restored job ID from localStorage:", jobId);
        }
      }

      if (savedStep) {
        const step = parseInt(savedStep, 10);
        if (!isNaN(step) && (step === 1 || step === 2)) {
          setCurrentStep(step);
          console.log("✅ Restored current step from localStorage:", step);
        }
      }
    } catch (error) {
      console.error("❌ Failed to restore job state:", error);
    }
  }, []);

  // Save current step to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(JOB_STEP_KEY, currentStep.toString());
    } catch (error) {
      console.error("Failed to save current step:", error);
    }
  }, [currentStep]);

  // Save created job ID to localStorage
  const saveJobIdToStorage = (jobId: number) => {
    try {
      localStorage.setItem(JOB_STORAGE_KEY, jobId.toString());
      setCreatedJobId(jobId);
    } catch (error) {
      console.error("Failed to save job ID:", error);
    }
  };

  // Clear job ID from storage (when job is completed or cancelled)
  const clearJobIdFromStorage = () => {
    try {
      localStorage.removeItem(JOB_STORAGE_KEY);
      localStorage.removeItem(JOB_STEP_KEY);
      setCreatedJobId(null);
      setCurrentStep(1);
    } catch (error) {
      console.error("Failed to clear job ID:", error);
    }
  };

  const steps = [
    {
      id: 1,
      title: "Job Details",
      description: "Fill in job information",
      icon: "📝",
    },
    {
      id: 2,
      title: "Hiring Process",
      description: "Set up assessment stages",
      icon: "⚙️",
    },
  ];

  const handleJobSubmit = async (data: any) => {
    setIsSubmittingJob(true);

    try {
      const validationErrors: string[] = [];

      if (!data.title?.trim()) validationErrors.push("Job title is required");
      if (!data.description?.trim())
        validationErrors.push("Job description is required");
      if (!data.requirements?.trim())
        validationErrors.push("Job requirements are required");
      if (!data.responsibilities?.trim())
        validationErrors.push("Job responsibilities are required");
      if (data.min_years_experience < 0)
        validationErrors.push("Minimum years experience cannot be negative");
      if (data.positions_available < 1)
        validationErrors.push("Positions available must be at least 1");
      if (!data.location?.trim()) validationErrors.push("Country is required");
      if (!data.remote_regions?.length)
        validationErrors.push("Remote regions is required");
      if (!data.employment_type?.trim())
        validationErrors.push("Employment type is required");
      // if (!data.experience_level?.trim())
      //   validationErrors.push("Experience level is required");
      if (!data.type?.trim()) validationErrors.push("Job type is required");

      // Salary validation
      if (data.salary_min && data.salary_max) {
        const min = Number(data.salary_min);
        const max = Number(data.salary_max);
        if (min > max)
          validationErrors.push(
            "Minimum salary cannot be greater than maximum salary",
          );
        if (min < 0 || max < 0)
          validationErrors.push("Salary values cannot be negative");
      }

      // Date validation
      if (data.deadline) {
        const deadlineDate = new Date(data.deadline);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (deadlineDate < today)
          validationErrors.push("Application deadline cannot be in the past");
      }

      if (validationErrors.length > 0) {
        console.error("❌ Form validation errors:", validationErrors);
        validationErrors.forEach((error, index) => {
          setTimeout(() => {
            toast.error(error, { position: "top-right", duration: 3000 });
          }, index * 300);
        });

        if (!data.title?.trim()) {
          const titleInput = document.querySelector('[name="title"]');
          if (titleInput) {
            titleInput.scrollIntoView({ behavior: "smooth", block: "center" });
            (titleInput as HTMLElement).focus();
          }
        }
        throw new Error("Form validation failed");
      }

      const userInfo = state.userInfo?.user || state.userInfo;
      const companyId = userInfo?.company_id || userInfo?.company?.id || 1;
      const userId = userInfo?.id || userInfo?.user_id || 1;

      const formattedPayload = {
        title: data.title || "",
        description: data.description || "",
        requirements: data.requirements || "",
        responsibilities: data.responsibilities || "",
        benefits: Array.isArray(data.benefits)
          ? data.benefits.filter(Boolean).join(", ")
          : data.benefits || "",
        employment_type: data.employment_type || "full_time",
        work_mode: data.work_mode || "remote",
        type: data.type || "permanent",
        experience_level: data.experience_level || "entry",
        positions_available: Number(data.positions_available) || 1,
        min_years_experience: Number(data.min_years_experience) || 0,
        salary_min: data.salary_min ? Number(data.salary_min).toFixed(2) : null,
        salary_max: data.salary_max ? Number(data.salary_max).toFixed(2) : null,
        salary_currency: data.salary_currency || "USD",
        hide_salary: Boolean(data.hide_salary),
        location: data.location || "",
        deadline: data.deadline ? new Date(data.deadline).toISOString() : null,
        is_featured: Boolean(data.is_featured),
        is_published: Boolean(data.is_published),
        remote_regions: data.remote_regions?.length
          ? data.remote_regions
          : ["Global"],
        company_id: companyId,
        created_by: userId,
        status: "published",
      };

      console.log("📤 Formatted payload:", formattedPayload);

      // Check if we're updating an existing job or creating a new one
      if (createdJobId) {
        // 🔄 UPDATE EXISTING JOB
        console.log(`📝 Updating existing job #${createdJobId}`);

        const loadingToastId = toast.loading("Updating job details...", {
          description: "Please wait while we save your changes",
        });

        try {
          const response = await JobServices.updateJob(
            createdJobId,
            formattedPayload,
          );
          toast.dismiss(loadingToastId);

          if (response?.status === "success" || response?.data) {
            toast.success("Job Updated Successfully!", {
              description: `Changes saved for Job #${createdJobId}`,
              duration: 3000,
            });

            // Move to hiring stages
            setCurrentStep(2);
            return createdJobId;
          } else {
            toast.error("Job Update Failed", {
              description: "Failed to update job. Please try again.",
              duration: 4000,
            });
            throw new Error("Failed to update job");
          }
        } catch (apiError: any) {
          toast.dismiss(loadingToastId);
          throw apiError;
        }
      } else {
        // ✨ CREATE NEW JOB
        console.log("✨ Creating new job");

        const loadingToastId = toast.loading("Creating job listing...", {
          description: "Please wait while we save your job",
        });

        try {
          const response = await JobServices.createJob(formattedPayload);
          toast.dismiss(loadingToastId);

          if (response?.data?.id) {
            const jobId = response.data.id;
            saveJobIdToStorage(jobId);
            setCurrentStep(2);

            toast.success("Job Created Successfully!", {
              description: `Job ID: #${jobId} • ${data.title}`,
              duration: 5000,
            });
            return jobId;
          } else {
            console.error("No job ID in response:", response);
            toast.error("Job Creation Failed", {
              description: "No job ID returned from server. Please try again.",
              duration: 5000,
            });
            throw new Error("Failed to get job ID from response");
          }
        } catch (apiError: any) {
          toast.dismiss(loadingToastId);
          throw apiError;
        }
      }
    } catch (error: any) {
      console.error("❌ Job submission error:", error);

      if (error.message !== "Form validation failed") {
        if (error.response) {
          console.error("❌ Response status:", error.response.status);
          console.error("❌ Response data:", error.response.data);

          if (error.response.status === 422 && error.response.data?.errors) {
            const errorCount = Object.keys(error.response.data.errors).length;
            toast.error(`Server Validation Failed`, {
              description: `Please fix ${errorCount} error${errorCount > 1 ? "s" : ""}`,
              duration: 4000,
            });

            Object.entries(error.response.data.errors).forEach(
              ([field, messages], index) => {
                if (Array.isArray(messages)) {
                  messages.forEach((message: string, messageIndex) => {
                    setTimeout(
                      () => {
                        const formattedField = field
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1),
                          )
                          .join(" ");
                        toast.error(`${formattedField}: ${message}`, {
                          position: "top-right",
                          duration: 3000,
                        });
                      },
                      index * 300 + messageIndex * 100,
                    );
                  });
                }
              },
            );
          } else if (error.response.status === 500) {
            toast.error("Server Error", {
              description:
                "An internal server error occurred. Please try again later.",
              duration: 5000,
            });
          } else if (error.response.status === 401) {
            toast.error("Authentication Required", {
              description: "Please log in again to continue",
              duration: 3000,
              action: { label: "Login", onClick: () => navigate("/login") },
            });
          } else {
            toast.error(
              createdJobId ? "Job Update Failed" : "Job Creation Failed",
              {
                description:
                  error?.response?.data?.message ||
                  "An unexpected error occurred",
                duration: 4000,
              },
            );
          }
        } else if (error.request) {
          toast.error("Network Error", {
            description: "Please check your internet connection and try again",
            duration: 4000,
          });
        } else {
          toast.error("Submission Error", {
            description: error?.message || "Failed to submit the form",
            duration: 4000,
          });
        }
      }
      throw error;
    } finally {
      setIsSubmittingJob(false);
    }
  };

  const handleHiringStagesSubmit = async () => {
    if (!createdJobId) {
      toast.error("Job ID not found");
      return;
    }

    if (hiringStages.length === 0) {
      toast.error("Please add at least one hiring stage");
      return;
    }

    setIsSubmittingStages(true);
    try {
      console.log("🔍 Hiring Stages for detection:", hiringStages);

      const totalTests = hiringStages.reduce((total, stage) => {
        if (Array.isArray(stage.tests)) {
          return (
            total +
            stage.tests.filter((test) => test != null && test !== "").length
          );
        }
        return total;
      }, 0);

      const isSingleTestAssignment =
        hiringStages.length === 1 &&
        totalTests === 1 &&
        Array.isArray(hiringStages[0].tests) &&
        hiringStages[0].tests.filter((test) => test != null && test !== "")
          .length === 1;

      console.log(
        "🔍 Assignment type:",
        isSingleTestAssignment ? "SINGLE" : "MULTIPLE",
      );

      if (isSingleTestAssignment) {
        const stage = hiringStages[0];
        const validTests = Array.isArray(stage.tests)
          ? stage.tests.filter((test) => test != null && test !== "")
          : [];

        if (validTests.length !== 1) {
          toast.error("Test Assignment Error", {
            description: "Expected exactly one test for single assignment",
            duration: 3000,
          });
          return;
        }

        const testId = validTests[0];
        const loadingToastId = toast.loading("Assigning test...");

        try {
          const response = await JobServices.assignTestToJob(
            createdJobId,
            Number(testId),
          );
          toast.dismiss(loadingToastId);

          if (response?.status === "success") {
            toast.success("Test Assigned Successfully!", {
              description:
                response.message || "Test has been assigned to the job",
              duration: 3000,
            });
            clearJobIdFromStorage();
            setTimeout(() => navigate("/employer/jobs"), 1500);
          } else {
            toast.error("Test Assignment Failed", {
              description: response?.message || "Failed to assign test",
              duration: 3000,
            });
          }
        } catch (error: any) {
          toast.dismiss(loadingToastId);
          throw error;
        }
      } else {
        const payload = {
          stages: hiringStages
            .map((stage, index) => {
              const validTests = Array.isArray(stage.tests)
                ? stage.tests
                    .filter((test) => test != null && test !== "")
                    .map((test) => Number(test))
                    .filter((test) => !isNaN(test))
                : [];

              return {
                name: stage.name?.trim() || `Stage ${index + 1}`,
                description: (stage.description || "").trim(),
                order: Number(stage.order) || index + 1,
                tests: validTests,
              };
            })
            .filter((stage) => stage.tests.length > 0),
        };

        const totalTestsInPayload = payload.stages.reduce(
          (total, stage) => total + stage.tests.length,
          0,
        );

        if (totalTestsInPayload === 0) {
          toast.error("No Tests Selected", {
            description: "Please select at least one test to assign",
            duration: 3000,
          });
          return;
        }

        const loadingToastId = toast.loading("Assigning tests...", {
          description: `Assigning ${totalTestsInPayload} test(s) across ${payload.stages.length} stage(s)`,
        });

        try {
          const response = await JobServices.assignMultipleTestsToJob(
            createdJobId,
            payload,
          );
          toast.dismiss(loadingToastId);

          if (response?.status === "success") {
            toast.success("Tests Assigned Successfully!", {
              description:
                response.message ||
                "Hiring stages and tests have been assigned",
              duration: 3000,
            });
            clearJobIdFromStorage();
            setTimeout(() => navigate("/employer/jobs"), 1500);
          } else {
            toast.error("Test Assignment Failed", {
              description: response?.message || "Failed to assign tests",
              duration: 3000,
            });
          }
        } catch (error: any) {
          toast.dismiss(loadingToastId);
          throw error;
        }
      }
    } catch (error: any) {
      console.error("❌ Error in test assignment:", error);

      if (error.response?.data) {
        if (error.response.status === 422 && error.response.data?.errors) {
          const errorCount = Object.keys(error.response.data.errors).length;
          toast.error("Test Assignment Failed", {
            description: `Please fix ${errorCount} validation error${errorCount > 1 ? "s" : ""}`,
            duration: 4000,
          });

          Object.entries(error.response.data.errors).forEach(
            ([field, messages]) => {
              if (Array.isArray(messages)) {
                messages.forEach((message: string) => {
                  const formattedField = field
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
                  toast.error(`${formattedField}: ${message}`, {
                    duration: 3000,
                  });
                });
              }
            },
          );
        }
      } else if (error.response?.status === 404) {
        toast.error("API Endpoint Not Found", {
          description: "Please check the backend configuration",
          duration: 3000,
        });
      } else {
        toast.error("Assignment Error", {
          description:
            error?.response?.data?.message || "Failed to assign tests",
          duration: 3000,
        });
      }
    } finally {
      setIsSubmittingStages(false);
    }
  };

  const handleSkipHiringStages = () => {
    toast.success("Job Created Successfully!", {
      description: "You can assign tests later from the job settings",
      duration: 3000,
    });
    clearJobIdFromStorage();
    setTimeout(() => navigate("/employer/jobs"), 1000);
  };

  const handleBackToJobDetails = () => {
    setCurrentStep(1);
  };

  const handleGoToHiringStages = () => {
    if (!createdJobId) {
      toast.error("No job found. Please create a job first.");
      return;
    }
    setCurrentStep(2);
  };

  const handleCancelJob = () => {
    // First show a warning toast
    const toastId = toast.custom(
      (t) => (
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md border border-red-200 animate-in slide-in-from-top-5 duration-300">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                Cancel Job Posting?
              </h3>
              <p className="text-gray-600 mt-2">
                This will permanently delete your current draft. You cannot undo
                this action.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    toast.dismiss(t);
                    toast.info("Continue editing your job", {
                      position: "top-center",
                      duration: 2000,
                    });
                  }}
                  className="border-gray-300 hover:bg-gray-50">
                  Continue Editing
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    // Clear everything
                    clearJobIdFromStorage();
                    form.clearFormStorage?.();
                    setCurrentStep(1);
                    setCreatedJobId(null);
                    form.reset();

                    // Animated exit for the confirmation dialog
                    toast.dismiss(t);

                    // Show success message
                    setTimeout(() => {
                      toast.success("Cancelled Successfully", {
                        description: "Job draft has been deleted",
                        duration: 2000,
                        position: "top-center",
                      });
                    }, 100);

                    // Navigate to dashboard
                    setTimeout(() => {
                      navigate("/employer/dashboard");
                    }, 800);
                  }}
                  className="bg-red-600 hover:bg-red-700 px-4">
                  Cancel Job
                </Button>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center",
      },
    );
  };

  return (
    <div>
      <div className="max-w-5xl mx-auto px-5 pt-6">
        <h1 className="text-lg lg:text-[28px] font-semibold text-[#1B1B1C]">
          Post a Job
        </h1>

        {/* Progress Steps */}
        <div className="mb-8 mt-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                    currentStep === step.id
                      ? "border-primary bg-primary text-white"
                      : currentStep > step.id
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-gray-300 bg-white text-gray-400"
                  }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <span className="text-lg">{step.icon}</span>
                  )}
                </div>
                <div className="ml-3">
                  <div
                    className={`font-medium ${
                      currentStep === step.id
                        ? "text-primary"
                        : currentStep > step.id
                          ? "text-green-600"
                          : "text-gray-500"
                    }`}>
                    {step.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {step.description}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-16 h-0.5 mx-4 bg-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Job Details */}
        {currentStep === 1 ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleJobSubmit)}
              className="space-y-8">
              <div className="space-y-4">
                {/* Auto-save Status */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {form.formState.isDirty ? (
                      <>
                        <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></div>
                        <span className="text-gray-600">Auto-saving...</span>
                      </>
                    ) : (
                      <>
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="text-gray-600">All changes saved</span>
                      </>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {createdJobId && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleGoToHiringStages}
                        className="text-xs text-blue-600 hover:text-blue-800">
                        <ChevronRight className="h-3 w-3 mr-1" />
                        Go to Hiring Stages
                      </Button>
                    )}

                    {form.getSavedData?.() && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (
                            confirm("Clear the restored draft and start fresh?")
                          ) {
                            form.clearFormStorage();
                          }
                        }}
                        className="text-xs text-gray-500 hover:text-gray-700">
                        Clear Draft
                      </Button>
                    )}
                  </div>
                </div>

                {/* Existing Job Warning */}
                {createdJobId && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="flex items-center gap-2 text-blue-800 font-medium">
                      <AlertCircle className="h-4 w-4" />
                      <span>Editing Job #{createdJobId}</span>
                    </div>
                    <p className="text-sm text-blue-700 mt-1">
                      Make your changes and click "Update & Continue" to save
                      them.
                    </p>
                  </div>
                )}

                {/* Validation Summary */}
                {form.formState.errors &&
                  Object.keys(form.formState.errors).length > 0 && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                      <div className="flex items-center gap-2 text-red-800 font-medium mb-2">
                        <AlertCircle className="h-4 w-4" />
                        <span>Please fix the following errors:</span>
                      </div>
                      <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                        {Object.entries(form.formState.errors).map(
                          ([field, error]) => (
                            <li key={field}>
                              <button
                                type="button"
                                onClick={() => {
                                  const element = document.querySelector(
                                    `[name="${field}"]`,
                                  );
                                  if (element) {
                                    element.scrollIntoView({
                                      behavior: "smooth",
                                      block: "center",
                                    });
                                    (element as HTMLElement).focus();
                                  }
                                }}
                                className="hover:underline focus:outline-none focus:underline text-left">
                                {field
                                  .split("_")
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1),
                                  )
                                  .join(" ")}
                                : {error?.message as string}
                              </button>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}

                {/* Success Preview */}
                {/* {form.formState.isValid &&
                  Object.keys(form.formState.errors).length === 0 && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                      <div className="flex items-center gap-2 text-green-800 font-medium">
                        <CheckCircle className="h-4 w-4" />
                        <span>Form is ready to submit!</span>
                      </div>
                      <p className="text-sm text-green-700 mt-1">
                        All required fields are filled correctly.
                      </p>
                    </div>
                  )} */}
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-8">
                    <JobTitleForm />
                    <SalaryForm />
                    <AdditionalInformationForm />
                    <LocationForm />
                    <JobbenefitsForm />
                    <JobDescriptionForm />
                    <JobVisibilityForm />
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <div className="flex justify-between">
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelJob}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    Cancel
                  </Button>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="rounded-[6px] px-6 max-lg:w-full"
                    disabled={isSubmittingJob || form.formState.isSubmitting}>
                    {isSubmittingJob ? (
                      <>
                        <Loader className="h-4 w-4 mr-2 animate-spin" />
                        {createdJobId ? "Updating..." : "Creating Job..."}
                      </>
                    ) : (
                      <>
                        {createdJobId
                          ? "Update & Continue"
                          : "Next: Set up Hiring Process"}
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        ) : (
          /* Step 2: Hiring Stages */
          <div className="space-y-8">
            {createdJobId && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800">
                        Job Ready for Hiring Setup
                      </h3>
                      <p className="text-green-700">
                        Job ID: #{createdJobId} • Now set up your hiring process
                      </p>
                      <p className="text-sm text-green-600 mt-1">
                        {hiringStages.reduce(
                          (total, stage) => total + (stage.tests?.length || 0),
                          0,
                        )}
                        test(s) selected across {hiringStages.length} stage(s)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="pt-6">
                <HiringStagesForm
                  onStagesChange={setHiringStages}
                  jobId={createdJobId}
                />
              </CardContent>
            </Card>

            <Separator />

            <div className="flex justify-between">
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBackToJobDetails}
                  disabled={isSubmittingStages}
                  className="flex items-center gap-2">
                  <ChevronLeft className="h-4 w-4" />
                  Back to Job Details
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSkipHiringStages}
                  disabled={isSubmittingStages}>
                  Skip & Finish
                </Button>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={handleHiringStagesSubmit}
                  disabled={isSubmittingStages || hiringStages.length === 0}
                  className="rounded-[6px] px-6 bg-green-600 hover:bg-green-700">
                  {isSubmittingStages ? (
                    <>
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                      Assigning Tests...
                    </>
                  ) : (
                    "Finish & Assign Tests"
                  )}
                </Button>
              </div>
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <h4 className="font-medium text-blue-800 mb-2">
                  💡 About Hiring Stages
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>
                    • Hiring stages help organize your recruitment process
                  </li>
                  <li>
                    • Assign tests to specific stages (e.g., Screening,
                    Technical, Interview)
                  </li>
                  <li>• Tests can be assigned to one or multiple stages</li>
                  <li>• You can modify stages later from the job settings</li>
                  <li className="mt-2 font-medium">
                    •{" "}
                    {hiringStages.reduce(
                      (total, stage) => total + (stage.tests?.length || 0),
                      0,
                    ) === 1
                      ? "Single test assignment will be used"
                      : "Multiple tests assignment will be used"}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

// WORKED BUT DIDNT UPDATE JOB
// import { useState, useEffect } from "react"; // Add useEffect
// import { useUser } from "@/providers/user-context";
// import AdditionalInformationForm from "@/components/employer/job/additional-information-form";
// import JobbenefitsForm from "@/components/employer/job/job-benefits-form";
// import JobDescriptionForm from "@/components/employer/job/job-description";
// import JobTitleForm from "@/components/employer/job/job-title";
// import JobVisibilityForm from "@/components/employer/job/job-visibility-form";
// import LocationForm from "@/components/employer/job/location-form";
// import SalaryForm from "@/components/employer/job/salary-form";
// import HiringStagesForm from "@/components/employer/job/hiring-stages-form";
// import { Button } from "@/components/ui/button";
// import { Form } from "@/components/ui/form";
// import useJobForm from "@/hooks/forms/use-job-form";
// import {
//   Loader,
//   ChevronLeft,
//   ChevronRight,
//   CheckCircle,
//   AlertCircle,
// } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { toast } from "sonner";
// import JobServices from "@/services/job-services";
// import { useNavigate } from "react-router";

// // Constants for localStorage keys
// const JOB_STORAGE_KEY = "post-job-created-id";
// const JOB_STEP_KEY = "post-job-current-step";

// export default function PostJob() {
//   const { form } = useJobForm();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [createdJobId, setCreatedJobId] = useState<number | null>(null);
//   const [isSubmittingJob, setIsSubmittingJob] = useState(false);
//   const [isSubmittingStages, setIsSubmittingStages] = useState(false);
//   const [hiringStages, setHiringStages] = useState<any[]>([]);
//   const navigate = useNavigate();
//   const { state } = useUser();

//   // Load saved job ID and step from localStorage on component mount
//   useEffect(() => {
//     try {
//       const savedJobId = localStorage.getItem(JOB_STORAGE_KEY);
//       const savedStep = localStorage.getItem(JOB_STEP_KEY);

//       if (savedJobId) {
//         const jobId = parseInt(savedJobId, 10);
//         if (!isNaN(jobId)) {
//           setCreatedJobId(jobId);
//           console.log("✅ Restored job ID from localStorage:", jobId);
//         }
//       }

//       if (savedStep) {
//         const step = parseInt(savedStep, 10);
//         if (!isNaN(step) && (step === 1 || step === 2)) {
//           setCurrentStep(step);
//           console.log("✅ Restored current step from localStorage:", step);
//         }
//       }
//     } catch (error) {
//       console.error("❌ Failed to restore job state:", error);
//     }
//   }, []);

//   // Save current step to localStorage whenever it changes
//   useEffect(() => {
//     try {
//       localStorage.setItem(JOB_STEP_KEY, currentStep.toString());
//     } catch (error) {
//       console.error("Failed to save current step:", error);
//     }
//   }, [currentStep]);

//   // Save created job ID to localStorage
//   const saveJobIdToStorage = (jobId: number) => {
//     try {
//       localStorage.setItem(JOB_STORAGE_KEY, jobId.toString());
//       setCreatedJobId(jobId);
//     } catch (error) {
//       console.error("Failed to save job ID:", error);
//     }
//   };

//   // Clear job ID from storage (when job is completed or cancelled)
//   const clearJobIdFromStorage = () => {
//     try {
//       localStorage.removeItem(JOB_STORAGE_KEY);
//       localStorage.removeItem(JOB_STEP_KEY);
//       setCreatedJobId(null);
//       setCurrentStep(1);
//     } catch (error) {
//       console.error("Failed to clear job ID:", error);
//     }
//   };

//   const steps = [
//     {
//       id: 1,
//       title: "Job Details",
//       description: "Fill in job information",
//       icon: "📝",
//     },
//     {
//       id: 2,
//       title: "Hiring Process",
//       description: "Set up assessment stages",
//       icon: "⚙️",
//     },
//   ];

//   const handleJobSubmit = async (data: any) => {
//     setIsSubmittingJob(true);

//     try {
//       // 🔹 FRONTEND VALIDATION - Show user-friendly errors before API call
//       const validationErrors: string[] = [];

//       // Required field validations
//       if (!data.title?.trim()) {
//         validationErrors.push("Job title is required");
//       }

//       if (!data.description?.trim()) {
//         validationErrors.push("Job description is required");
//       }

//       if (!data.requirements?.trim()) {
//         validationErrors.push("Job requirements are required");
//       }

//       if (!data.responsibilities?.trim()) {
//         validationErrors.push("Job responsibilities are required");
//       }

//       if (data.min_years_experience < 0) {
//         validationErrors.push("Minimum years experience cannot be negative");
//       }

//       if (data.positions_available < 1) {
//         validationErrors.push("Positions available must be at least 1");
//       }

//       // Salary validation
//       if (data.salary_min && data.salary_max) {
//         const min = Number(data.salary_min);
//         const max = Number(data.salary_max);

//         if (min > max) {
//           validationErrors.push(
//             "Minimum salary cannot be greater than maximum salary",
//           );
//         }

//         if (min < 0 || max < 0) {
//           validationErrors.push("Salary values cannot be negative");
//         }
//       }

//       // Date validation
//       if (data.deadline) {
//         const deadlineDate = new Date(data.deadline);
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);

//         if (deadlineDate < today) {
//           validationErrors.push("Application deadline cannot be in the past");
//         }
//       }

//       // Show validation errors if any
//       if (validationErrors.length > 0) {
//         console.error("❌ Form validation errors:", validationErrors);

//         // Show each error as a separate toast
//         validationErrors.forEach((error, index) => {
//           setTimeout(() => {
//             toast.error(error, {
//               position: "top-right",
//               duration: 3000,
//             });
//           }, index * 300); // Stagger the toasts
//         });

//         // Focus on the first field with error
//         if (!data.title?.trim()) {
//           const titleInput = document.querySelector('[name="title"]');
//           if (titleInput) {
//             titleInput.scrollIntoView({ behavior: "smooth", block: "center" });
//             (titleInput as HTMLElement).focus();
//           }
//         }

//         throw new Error("Form validation failed");
//       }

//       const userInfo = state.userInfo?.user || state.userInfo;
//       const companyId = userInfo?.company_id || userInfo?.company?.id || 1;
//       const userId = userInfo?.id || userInfo?.user_id || 1;

//       const formattedPayload = {
//         title: data.title || "",
//         description: data.description || "",
//         requirements: data.requirements || "",
//         responsibilities: data.responsibilities || "",
//         benefits: Array.isArray(data.benefits)
//           ? data.benefits.filter(Boolean).join(", ")
//           : data.benefits || "",

//         employment_type: data.employment_type || "full_time",
//         work_mode: data.work_mode || "remote",
//         type: data.type || "permanent",
//         experience_level: data.experience_level || "entry",

//         positions_available: Number(data.positions_available) || 1,
//         min_years_experience: Number(data.min_years_experience) || 0,

//         salary_min: data.salary_min ? Number(data.salary_min).toFixed(2) : null,
//         salary_max: data.salary_max ? Number(data.salary_max).toFixed(2) : null,
//         salary_currency: data.salary_currency || "USD",
//         hide_salary: Boolean(data.hide_salary),

//         location: data.location || "",
//         deadline: data.deadline ? new Date(data.deadline).toISOString() : null,

//         is_featured: Boolean(data.is_featured),
//         is_published: Boolean(data.is_published),

//         remote_regions: data.remote_regions?.length
//           ? data.remote_regions
//           : ["Global"],

//         company_id: companyId,
//         created_by: userId,

//         status: "published",
//       };

//       console.log("📤 FINAL payload:", formattedPayload);

//       // Show loading toast
//       const loadingToastId = toast.loading("Creating job listing...", {
//         description: "Please wait while we save your job",
//       });

//       try {
//         const response = await JobServices.createJob(formattedPayload);

//         // Dismiss loading toast
//         toast.dismiss(loadingToastId);

//         if (response?.data?.id) {
//           const jobId = response.data.id;

//           // Save job ID to localStorage
//           saveJobIdToStorage(jobId);

//           // Move to step 2
//           setCurrentStep(2);

//           // Clear any saved draft (but keep job ID)
//           form.clearFormStorage?.();

//           // Success toast with job details
//           toast.success("Job Created Successfully!", {
//             description: `Job ID: #${jobId} • ${data.title}`,
//             duration: 5000,
//             action: {
//               label: "View Job",
//               onClick: () => {
//                 navigate(`/employer/jobs/${jobId}`);
//               },
//             },
//           });
//           return jobId;
//         } else {
//           console.error("No job ID in response:", response);
//           toast.error("Job Creation Failed", {
//             description: "No job ID returned from server. Please try again.",
//             duration: 5000,
//           });
//           throw new Error("Failed to get job ID from response");
//         }
//       } catch (apiError: any) {
//         // Dismiss loading toast
//         toast.dismiss(loadingToastId);
//         throw apiError;
//       }
//     } catch (error: any) {
//       console.error("❌ Job creation error:", error);

//       // Don't show duplicate error messages if we already showed validation errors
//       if (error.message !== "Form validation failed") {
//         if (error.response) {
//           console.error("❌ Response status:", error.response.status);
//           console.error("❌ Response data:", error.response.data);

//           // Handle different types of backend errors
//           if (error.response.status === 422 && error.response.data?.errors) {
//             // Laravel validation errors
//             console.error("❌ Backend validation errors found:");

//             const errorCount = Object.keys(error.response.data.errors).length;
//             toast.error(`Server Validation Failed`, {
//               description: `Please fix ${errorCount} error${errorCount > 1 ? "s" : ""}`,
//               duration: 4000,
//             });

//             // Show each validation error with a slight delay
//             Object.entries(error.response.data.errors).forEach(
//               ([field, messages], index) => {
//                 if (Array.isArray(messages)) {
//                   messages.forEach((message: string, messageIndex) => {
//                     setTimeout(
//                       () => {
//                         // Format field name for display (convert snake_case to Title Case)
//                         const formattedField = field
//                           .split("_")
//                           .map(
//                             (word) =>
//                               word.charAt(0).toUpperCase() + word.slice(1),
//                           )
//                           .join(" ");

//                         toast.error(`${formattedField}: ${message}`, {
//                           position: "top-right",
//                           duration: 3000,
//                         });
//                       },
//                       index * 300 + messageIndex * 100,
//                     );
//                   });
//                 }
//               },
//             );
//           } else if (error.response.status === 500) {
//             toast.error("Server Error", {
//               description:
//                 "An internal server error occurred. Please try again later.",
//               duration: 5000,
//             });
//           } else if (error.response.status === 401) {
//             toast.error("Authentication Required", {
//               description: "Please log in again to continue",
//               duration: 3000,
//               action: {
//                 label: "Login",
//                 onClick: () => navigate("/login"),
//               },
//             });
//           } else if (error.response.status === 400) {
//             toast.error("Bad Request", {
//               description:
//                 error.response.data?.message || "Invalid request data",
//               duration: 4000,
//             });
//           } else {
//             toast.error("Job Creation Failed", {
//               description:
//                 error?.response?.data?.message ||
//                 "An unexpected error occurred",
//               duration: 4000,
//             });
//           }
//         } else if (error.request) {
//           // Network error
//           toast.error("Network Error", {
//             description: "Please check your internet connection and try again",
//             duration: 4000,
//           });
//         } else {
//           // Other errors
//           toast.error("Submission Error", {
//             description: error?.message || "Failed to submit the form",
//             duration: 4000,
//           });
//         }
//       }
//       throw error;
//     } finally {
//       setIsSubmittingJob(false);
//     }
//   };

//   const handleHiringStagesSubmit = async () => {
//     if (!createdJobId) {
//       toast.error("Job ID not found");
//       return;
//     }

//     if (hiringStages.length === 0) {
//       toast.error("Please add at least one hiring stage");
//       return;
//     }

//     setIsSubmittingStages(true);
//     try {
//       console.log("🔍 Hiring Stages for detection:", hiringStages);

//       const totalTests = hiringStages.reduce((total, stage) => {
//         if (Array.isArray(stage.tests)) {
//           return (
//             total +
//             stage.tests.filter((test) => test != null && test !== "").length
//           );
//         }
//         return total;
//       }, 0);

//       console.log("🔍 Total tests calculated:", totalTests);
//       console.log("🔍 Number of stages:", hiringStages.length);

//       const isSingleTestAssignment =
//         hiringStages.length === 1 &&
//         totalTests === 1 &&
//         Array.isArray(hiringStages[0].tests) &&
//         hiringStages[0].tests.filter((test) => test != null && test !== "")
//           .length === 1;

//       console.log("🔍 Is single test assignment?", isSingleTestAssignment);
//       console.log(
//         "🔍 Assignment type:",
//         isSingleTestAssignment ? "SINGLE" : "MULTIPLE",
//       );

//       if (isSingleTestAssignment) {
//         // 🔹 SINGLE TEST ASSIGNMENT
//         const stage = hiringStages[0];
//         const validTests = Array.isArray(stage.tests)
//           ? stage.tests.filter((test) => test != null && test !== "")
//           : [];

//         if (validTests.length !== 1) {
//           toast.error("Test Assignment Error", {
//             description: "Expected exactly one test for single assignment",
//             duration: 3000,
//           });
//           return;
//         }

//         const testId = validTests[0];
//         console.log(
//           `📤 Assigning SINGLE test ${testId} to job ${createdJobId}`,
//         );

//         // Show loading toast
//         const loadingToastId = toast.loading("Assigning test...");

//         try {
//           const response = await JobServices.assignTestToJob(
//             createdJobId,
//             Number(testId),
//           );

//           toast.dismiss(loadingToastId);

//           console.log("📥 Single test assignment response:", response);

//           if (response?.status === "success") {
//             toast.success("Test Assigned Successfully!", {
//               description:
//                 response.message || "Test has been assigned to the job",
//               duration: 3000,
//             });

//             // Clear job ID from storage since process is complete
//             clearJobIdFromStorage();

//             setTimeout(() => {
//               navigate("/employer/jobs");
//             }, 1500);
//           } else {
//             toast.error("Test Assignment Failed", {
//               description: response?.message || "Failed to assign test",
//               duration: 3000,
//             });
//           }
//         } catch (error: any) {
//           toast.dismiss(loadingToastId);
//           throw error;
//         }
//       } else {
//         // 🔹 MULTIPLE TESTS ASSIGNMENT
//         const payload = {
//           stages: hiringStages
//             .map((stage, index) => {
//               const validTests = Array.isArray(stage.tests)
//                 ? stage.tests
//                     .filter((test) => test != null && test !== "")
//                     .map((test) => Number(test))
//                     .filter((test) => !isNaN(test))
//                 : [];

//               return {
//                 name: stage.name?.trim() || `Stage ${index + 1}`,
//                 description: (stage.description || "").trim(),
//                 order: Number(stage.order) || index + 1,
//                 tests: validTests,
//               };
//             })
//             .filter((stage) => stage.tests.length > 0),
//         };

//         const totalTestsInPayload = payload.stages.reduce(
//           (total, stage) => total + stage.tests.length,
//           0,
//         );

//         if (totalTestsInPayload === 0) {
//           toast.error("No Tests Selected", {
//             description: "Please select at least one test to assign",
//             duration: 3000,
//           });
//           return;
//         }

//         console.log("📤 Sending MULTIPLE hiring stages payload:", payload);
//         console.log(
//           "🔍 Full payload before sending:",
//           JSON.stringify(payload, null, 2),
//         );

//         // Show loading toast
//         const loadingToastId = toast.loading("Assigning tests...", {
//           description: `Assigning ${totalTestsInPayload} test(s) across ${payload.stages.length} stage(s)`,
//         });

//         try {
//           const response = await JobServices.assignMultipleTestsToJob(
//             createdJobId,
//             payload,
//           );

//           toast.dismiss(loadingToastId);

//           console.log("📥 Multiple tests assignment response:", response);

//           if (response?.status === "success") {
//             toast.success("Tests Assigned Successfully!", {
//               description:
//                 response.message ||
//                 "Hiring stages and tests have been assigned",
//               duration: 3000,
//             });

//             // Clear job ID from storage since process is complete
//             clearJobIdFromStorage();

//             setTimeout(() => {
//               navigate("/employer/jobs");
//             }, 1500);
//           } else {
//             toast.error("Test Assignment Failed", {
//               description: response?.message || "Failed to assign tests",
//               duration: 3000,
//             });
//           }
//         } catch (error: any) {
//           toast.dismiss(loadingToastId);
//           throw error;
//         }
//       }
//     } catch (error: any) {
//       console.error("❌ Error in test assignment:", error);
//       console.error("❌ Error response:", error.response?.data);
//       console.error("❌ Error status:", error.response?.status);

//       if (error.response?.data) {
//         console.error(
//           "❌ Full error data:",
//           JSON.stringify(error.response.data, null, 2),
//         );

//         if (error.response.status === 422 && error.response.data?.errors) {
//           // Show validation errors from server
//           const errorCount = Object.keys(error.response.data.errors).length;
//           toast.error("Test Assignment Failed", {
//             description: `Please fix ${errorCount} validation error${errorCount > 1 ? "s" : ""}`,
//             duration: 4000,
//           });

//           Object.entries(error.response.data.errors).forEach(
//             ([field, messages]) => {
//               if (Array.isArray(messages)) {
//                 messages.forEach((message: string) => {
//                   const formattedField = field
//                     .split("_")
//                     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//                     .join(" ");

//                   toast.error(`${formattedField}: ${message}`, {
//                     duration: 3000,
//                   });
//                 });
//               }
//             },
//           );
//         }
//       } else if (error.response?.status === 404) {
//         toast.error("API Endpoint Not Found", {
//           description: "Please check the backend configuration",
//           duration: 3000,
//         });
//       } else {
//         toast.error("Assignment Error", {
//           description:
//             error?.response?.data?.message || "Failed to assign tests",
//           duration: 3000,
//         });
//       }
//     } finally {
//       setIsSubmittingStages(false);
//     }
//   };

//   const handleSkipHiringStages = () => {
//     toast.success("Job Created Successfully!", {
//       description: "You can assign tests later from the job settings",
//       duration: 3000,
//     });

//     // Clear job ID from storage since process is complete
//     clearJobIdFromStorage();

//     setTimeout(() => {
//       navigate("/employer/jobs");
//     }, 1000);
//   };

//   const handleBackToJobDetails = () => {
//     setCurrentStep(1);
//   };

//   // Function to go to hiring stages without creating a new job
//   const handleGoToHiringStages = () => {
//     if (!createdJobId) {
//       toast.error("No job found. Please create a job first.");
//       return;
//     }
//     setCurrentStep(2);
//   };

//   // Function to cancel and start over
//   const handleCancelJob = () => {
//     if (
//       confirm(
//         "Are you sure you want to cancel? This will delete the current job draft.",
//       )
//     ) {
//       // Clear all storage
//       clearJobIdFromStorage();
//       form.clearFormStorage?.();
//       toast.info("Job creation cancelled", {
//         description: "You can start a new job posting",
//         duration: 3000,
//       });
//     }
//   };

//   return (
//     <div>
//       <div className="max-w-5xl mx-auto px-5 pt-6">
//         <h1 className="text-lg lg:text-[28px] font-semibold text-[#1B1B1C]">
//           Post a Job
//         </h1>

//         {/* Progress Steps */}
//         <div className="mb-8 mt-6">
//           <div className="flex items-center justify-between">
//             {steps.map((step, index) => (
//               <div key={step.id} className="flex items-center">
//                 <div
//                   className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
//                     currentStep === step.id
//                       ? "border-primary bg-primary text-white"
//                       : currentStep > step.id
//                         ? "border-green-500 bg-green-500 text-white"
//                         : "border-gray-300 bg-white text-gray-400"
//                   }`}>
//                   {currentStep > step.id ? (
//                     <CheckCircle className="h-6 w-6" />
//                   ) : (
//                     <span className="text-lg">{step.icon}</span>
//                   )}
//                 </div>
//                 <div className="ml-3">
//                   <div
//                     className={`font-medium ${
//                       currentStep === step.id
//                         ? "text-primary"
//                         : currentStep > step.id
//                           ? "text-green-600"
//                           : "text-gray-500"
//                     }`}>
//                     {step.title}
//                   </div>
//                   <div className="text-sm text-gray-500">
//                     {step.description}
//                   </div>
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div className="w-16 h-0.5 mx-4 bg-gray-300" />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Step 1: Job Details */}
//         {currentStep === 1 ? (
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(handleJobSubmit)}
//               className="space-y-8">
//               {/* Auto-save Status & Validation Summary */}
//               <div className="space-y-4">
//                 {/* Auto-save Status */}
//                 <div className="flex items-center justify-between text-sm">
//                   <div className="flex items-center gap-2">
//                     {form.formState.isDirty ? (
//                       <>
//                         <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></div>
//                         <span className="text-gray-600">Auto-saving...</span>
//                       </>
//                     ) : (
//                       <>
//                         <div className="h-2 w-2 rounded-full bg-green-500"></div>
//                         <span className="text-gray-600">All changes saved</span>
//                       </>
//                     )}
//                   </div>

//                   <div className="flex gap-2">
//                     {createdJobId && (
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         onClick={handleGoToHiringStages}
//                         className="text-xs text-blue-600 hover:text-blue-800">
//                         <ChevronRight className="h-3 w-3 mr-1" />
//                         Go to Hiring Stages
//                       </Button>
//                     )}

//                     {form.getSavedData?.() && (
//                       <Button
//                         type="button"
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => {
//                           if (
//                             confirm("Clear the restored draft and start fresh?")
//                           ) {
//                             form.clearFormStorage();
//                           }
//                         }}
//                         className="text-xs text-gray-500 hover:text-gray-700">
//                         Clear Draft
//                       </Button>
//                     )}
//                   </div>
//                 </div>

//                 {/* Existing Job Warning (if returning from step 2) */}
//                 {createdJobId && (
//                   <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
//                     <div className="flex items-center gap-2 text-blue-800 font-medium">
//                       <AlertCircle className="h-4 w-4" />
//                       <span>Job #{createdJobId} Already Created</span>
//                     </div>
//                     <p className="text-sm text-blue-700 mt-1">
//                       You can edit job details here, then click "Next" to return
//                       to hiring stages. No new job will be created.
//                     </p>
//                   </div>
//                 )}

//                 {/* Validation Summary */}
//                 {form.formState.errors &&
//                   Object.keys(form.formState.errors).length > 0 && (
//                     <div className="p-3 bg-red-50 border border-red-200 rounded-md">
//                       <div className="flex items-center gap-2 text-red-800 font-medium mb-2">
//                         <AlertCircle className="h-4 w-4" />
//                         <span>Please fix the following errors:</span>
//                       </div>
//                       <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
//                         {Object.entries(form.formState.errors).map(
//                           ([field, error]) => (
//                             <li key={field}>
//                               <button
//                                 type="button"
//                                 onClick={() => {
//                                   const element = document.querySelector(
//                                     `[name="${field}"]`,
//                                   );
//                                   if (element) {
//                                     element.scrollIntoView({
//                                       behavior: "smooth",
//                                       block: "center",
//                                     });
//                                     (element as HTMLElement).focus();
//                                   }
//                                 }}
//                                 className="hover:underline focus:outline-none focus:underline text-left">
//                                 {field
//                                   .split("_")
//                                   .map(
//                                     (word) =>
//                                       word.charAt(0).toUpperCase() +
//                                       word.slice(1),
//                                   )
//                                   .join(" ")}
//                                 : {error?.message as string}
//                               </button>
//                             </li>
//                           ),
//                         )}
//                       </ul>
//                     </div>
//                   )}

//                 {/* Success Preview */}
//                 {form.formState.isValid &&
//                   Object.keys(form.formState.errors).length === 0 && (
//                     <div className="p-3 bg-green-50 border border-green-200 rounded-md">
//                       <div className="flex items-center gap-2 text-green-800 font-medium">
//                         <CheckCircle className="h-4 w-4" />
//                         <span>Form is ready to submit!</span>
//                       </div>
//                       <p className="text-sm text-green-700 mt-1">
//                         All required fields are filled correctly.
//                       </p>
//                     </div>
//                   )}
//               </div>

//               <Card>
//                 <CardContent className="pt-6">
//                   <div className="space-y-8">
//                     <JobTitleForm />
//                     <SalaryForm />
//                     <AdditionalInformationForm />
//                     <LocationForm />
//                     <JobbenefitsForm />
//                     <JobDescriptionForm />
//                     <JobVisibilityForm />
//                   </div>
//                 </CardContent>
//               </Card>

//               <Separator />

//               <div className="flex justify-between">
//                 <div>
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={handleCancelJob}
//                     className="text-red-600 hover:text-red-700 hover:bg-red-50">
//                     Cancel
//                   </Button>
//                 </div>

//                 <div className="flex gap-3">
//                   {createdJobId ? (
//                     // When job already exists, show "Update & Continue" button
//                     <>
//                       <Button
//                         type="button"
//                         variant="outline"
//                         onClick={() => {
//                           // You can add update job logic here if needed
//                           toast.info("Job details saved", {
//                             description: "Returning to hiring stages",
//                           });
//                           setCurrentStep(2);
//                         }}>
//                         Save & Return to Hiring
//                       </Button>
//                       <Button
//                         type="button"
//                         onClick={handleGoToHiringStages}
//                         className="rounded-[6px] px-6 bg-blue-600 hover:bg-blue-700">
//                         Next: Hiring Stages
//                         <ChevronRight className="h-4 w-4 ml-2" />
//                       </Button>
//                     </>
//                   ) : (
//                     // When no job exists, show normal submit button
//                     <Button
//                       type="submit"
//                       className="rounded-[6px] px-6 max-lg:w-full"
//                       disabled={isSubmittingJob || form.formState.isSubmitting}>
//                       {isSubmittingJob ? (
//                         <>
//                           <Loader className="h-4 w-4 mr-2 animate-spin" />
//                           Creating Job...
//                         </>
//                       ) : (
//                         <>
//                           Next: Set up Hiring Process
//                           <ChevronRight className="h-4 w-4 ml-2" />
//                         </>
//                       )}
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </form>
//           </Form>
//         ) : (
//           /* Step 2: Hiring Stages */
//           <div className="space-y-8">
//             {/* Success Message */}
//             {createdJobId && (
//               <Card className="bg-green-50 border-green-200">
//                 <CardContent className="pt-6">
//                   <div className="flex items-center gap-3">
//                     <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
//                       <CheckCircle className="h-6 w-6 text-green-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-green-800">
//                         {createdJobId
//                           ? "Job Ready for Hiring Setup"
//                           : "Job Created Successfully!"}
//                       </h3>
//                       <p className="text-green-700">
//                         Job ID: #{createdJobId} • Now set up your hiring process
//                       </p>
//                       <p className="text-sm text-green-600 mt-1">
//                         {hiringStages.reduce(
//                           (total, stage) => total + (stage.tests?.length || 0),
//                           0,
//                         )}
//                         test(s) selected across {hiringStages.length} stage(s)
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Debug Button */}
//             {process.env.NODE_ENV === "development" && (
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 onClick={() => {
//                   console.log("🔍 Hiring Stages Data:", hiringStages);
//                   console.log("🔍 Created Job ID:", createdJobId);
//                   console.log(
//                     "🔍 Hiring Stages JSON:",
//                     JSON.stringify(hiringStages, null, 2),
//                   );
//                   hiringStages.forEach((stage, index) => {
//                     console.log(`Stage ${index + 1} (${stage.name}):`);
//                     console.log(`  Tests:`, stage.tests);
//                     console.log(
//                       `  Tests types:`,
//                       stage.tests?.map((t) => typeof t),
//                     );
//                     console.log(
//                       `  Order:`,
//                       stage.order,
//                       `(type: ${typeof stage.order})`,
//                     );
//                   });
//                 }}
//                 className="mb-4">
//                 Debug Hiring Stages
//               </Button>
//             )}

//             {/* Hiring Stages Form */}
//             <Card>
//               <CardContent className="pt-6">
//                 <HiringStagesForm
//                   onStagesChange={setHiringStages}
//                   jobId={createdJobId}
//                 />
//               </CardContent>
//             </Card>

//             <Separator />

//             {/* Navigation Buttons */}
//             <div className="flex justify-between">
//               <div className="flex gap-3">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={handleBackToJobDetails}
//                   disabled={isSubmittingStages}
//                   className="flex items-center gap-2">
//                   <ChevronLeft className="h-4 w-4" />
//                   Back to Job Details
//                 </Button>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={handleSkipHiringStages}
//                   disabled={isSubmittingStages}>
//                   Skip & Finish
//                 </Button>
//               </div>

//               <div className="flex gap-3">
//                 <Button
//                   type="button"
//                   onClick={handleHiringStagesSubmit}
//                   disabled={isSubmittingStages || hiringStages.length === 0}
//                   className="rounded-[6px] px-6 bg-green-600 hover:bg-green-700">
//                   {isSubmittingStages ? (
//                     <>
//                       <Loader className="h-4 w-4 mr-2 animate-spin" />
//                       Assigning Tests...
//                     </>
//                   ) : (
//                     "Finish & Assign Tests"
//                   )}
//                 </Button>
//               </div>
//             </div>

//             {/* Help Text */}
//             <Card className="bg-blue-50 border-blue-200">
//               <CardContent className="pt-6">
//                 <h4 className="font-medium text-blue-800 mb-2">
//                   💡 About Hiring Stages
//                 </h4>
//                 <ul className="text-sm text-blue-700 space-y-1">
//                   <li>
//                     • Hiring stages help organize your recruitment process
//                   </li>
//                   <li>
//                     • Assign tests to specific stages (e.g., Screening,
//                     Technical, Interview)
//                   </li>
//                   <li>• Tests can be assigned to one or multiple stages</li>
//                   <li>• You can modify stages later from the job settings</li>
//                   <li className="mt-2 font-medium">
//                     •{" "}
//                     {hiringStages.reduce(
//                       (total, stage) => total + (stage.tests?.length || 0),
//                       0,
//                     ) === 1
//                       ? "Single test assignment will be used"
//                       : "Multiple tests assignment will be used"}
//                   </li>
//                   <li className="text-xs text-blue-600 mt-2">
//                     {hiringStages.reduce(
//                       (total, stage) => total + (stage.tests?.length || 0),
//                       0,
//                     ) === 1
//                       ? "✓ Using single test endpoint for better performance"
//                       : "✓ Using bulk assignment endpoint"}
//                   </li>
//                 </ul>
//               </CardContent>
//             </Card>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


