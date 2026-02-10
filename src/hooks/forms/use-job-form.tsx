import { jobPostingSchema, JobPostingSchemaType } from "@/lib/validators/job";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const STORAGE_KEY = "post-job-form-data";

const useJobForm = () => {
  const [loading, setLoading] = useState(false);
  const [hasRestored, setHasRestored] = useState(false);

  const form = useForm<JobPostingSchemaType>({
    resolver: zodResolver(jobPostingSchema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      // Required fields with defaults
      title: "",
      description: "",
      employment_type: "full_time" as const,
      work_mode: "remote" as const,
      experience_level: "entry",
      min_years_experience: 0,
      positions_available: 1,

      // Optional fields with defaults
      salary_min: undefined,
      salary_max: undefined,
      salary_currency: "USD",
      location: "",
      requirements: "",
      responsibilities: "",
      benefits: [], // Keep as array in form, convert to string for API
      deadline: "",
      type: "permanent",
      remote_regions: ["Global"], // Default non-empty array

      // Boolean fields
      hide_salary: false,
      is_featured: false,
      is_published: true,
    },
  });

  // Load saved form data on mount
  useEffect(() => {
    if (hasRestored) return; // Prevent multiple restores

    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);

        // Restore form values
        if (parsedData.formValues) {
          const formValues = parsedData.formValues;

          // Set all form values
          Object.keys(formValues).forEach((key) => {
            const value = formValues[key];
            // Only restore if the value is not undefined
            if (value !== undefined) {
              form.setValue(key as any, value, {
                shouldValidate: false, // Don't validate on restore
                shouldDirty: true, // Mark as dirty so user knows there's saved data
                shouldTouch: true,
              });
            }
          });

          console.log("✅ Restored job form data from localStorage");
          setHasRestored(true);

          toast.info("Draft Restored", {
            description: "Your previous form data has been restored",
            duration: 5000,
            action: {
              label: "Clear",
              onClick: () => clearFormStorage(),
            },
          });
        }
      }
    } catch (error) {
      console.error("❌ Failed to restore job form data:", error);
      // Clear corrupted data
      clearFormStorage();
    }
  }, [form, hasRestored]);

  // Save form data whenever it changes (debounced)
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      try {
        const formValues = form.getValues();

        const dataToSave = {
          formValues,
          timestamp: new Date().toISOString(),
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      } catch (error) {
        console.error("Failed to save form data:", error);
      }
    }, 500); // Debounce to prevent too frequent saves

    return () => clearTimeout(debounceTimer);
  }, [form.watch()]);

  // Show validation errors as toasts when fields are touched and have errors
  useEffect(() => {
    const { errors, touchedFields } = form.formState;

    Object.entries(errors).forEach(([fieldName, error]) => {
      if (
        touchedFields[fieldName as keyof JobPostingSchemaType] &&
        error?.message
      ) {
        // Format field name for display
        const formattedField = fieldName
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        // Show error toast (with deduplication)
        toast.error(`Invalid ${formattedField}`, {
          description: error.message,
          duration: 3000,
          id: `field-error-${fieldName}`, // Prevent duplicate toasts
        });
      }
    });
  }, [form.formState.errors, form.formState.touchedFields]);

  const formatPayload = (data: JobPostingSchemaType) => {
    return {
      // Required text fields
      title: data.title?.trim() || "",
      description: data.description?.trim() || "",
      requirements: data.requirements?.trim() || "",
      responsibilities: data.responsibilities?.trim() || "",
      benefits: Array.isArray(data.benefits)
        ? data.benefits.filter(Boolean).join(", ")
        : data.benefits || "",

      // Job type fields
      employment_type: data.employment_type || "full_time",
      work_mode: data.work_mode || "remote",
      type: data.type || "permanent",
      experience_level: data.experience_level || "entry",

      // Numeric fields
      positions_available: Number(data.positions_available) || 1,
      min_years_experience: Number(data.min_years_experience) || 0,

      // Salary fields
      salary_min: data.salary_min ? Number(data.salary_min).toFixed(2) : null,
      salary_max: data.salary_max ? Number(data.salary_max).toFixed(2) : null,
      salary_currency: data.salary_currency || "USD",
      hide_salary: Boolean(data.hide_salary),

      // Location and timing
      location: data.location?.trim() || "",
      deadline: data.deadline ? new Date(data.deadline).toISOString() : null,

      // Publication flags
      is_featured: Boolean(data.is_featured),
      is_published: Boolean(data.is_published),

      // Array field - ensure non-empty
      remote_regions:
        Array.isArray(data.remote_regions) && data.remote_regions.length > 0
          ? data.remote_regions
          : ["Global"],
    };
  };

  const onSubmit = async (data: JobPostingSchemaType) => {
    setLoading(true);

    try {
      // First, validate the entire form
      const isValid = await form.trigger();

      if (!isValid) {
        const errors = form.formState.errors;
        const errorCount = Object.keys(errors).length;

        // Show summary error toast
        toast.error("Form Validation Failed", {
          description: `Please fix ${errorCount} error${errorCount > 1 ? "s" : ""} before submitting`,
          duration: 4000,
        });

        // Show individual error toasts for each field
        Object.entries(errors).forEach(([fieldName, error], index) => {
          setTimeout(() => {
            const formattedField = fieldName
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");

            toast.error(`Invalid ${formattedField}`, {
              description: error?.message,
              duration: 3000,
            });
          }, index * 300);
        });

        throw new Error("Form validation failed");
      }

      // Format the data properly
      const payload = formatPayload(data);

      console.log("📤 Formatted payload from useJobForm:", payload);

      return payload;
    } catch (err: any) {
      if (err.message !== "Form validation failed") {
        toast.error("Form Processing Error", {
          description: "Failed to process form data. Please check your inputs.",
          duration: 3000,
        });
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Function to clear saved form data
  const clearFormStorage = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      form.reset(); // Reset form to default values
      setHasRestored(false);
      console.log("🗑️ Cleared job form data from localStorage");

      toast.success("Draft Cleared", {
        description: "Form has been reset to default values",
        duration: 1000,
      });
    } catch (error) {
      console.error("Failed to clear form storage:", error);
      toast.error("Clear Failed", {
        description: "Failed to clear saved form data",
        duration: 3000,
      });
    }
  };

  // Function to get saved data
  const getSavedData = () => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      return savedData ? JSON.parse(savedData) : null;
    } catch (error) {
      console.error("Failed to get saved data:", error);
      return null;
    }
  };

  // Check if form has unsaved changes
  const hasUnsavedChanges = () => {
    return form.formState.isDirty;
  };

  // Validate the form programmatically
  const validateForm = async (): Promise<{
    isValid: boolean;
    errors: string[];
  }> => {
    const isValid = await form.trigger();

    if (!isValid) {
      const errors: string[] = [];
      Object.entries(form.formState.errors).forEach(([field, error]) => {
        if (error?.message) {
          const formattedField = field
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          errors.push(`${formattedField}: ${error.message}`);
        }
      });

      return { isValid: false, errors };
    }

    return { isValid: true, errors: [] };
  };

  return {
    form,
    onSubmit,
    loading,
    clearFormStorage,
    getSavedData,
    hasUnsavedChanges,
    formatPayload,
    validateForm,
    hasRestored,
  };
};

export default useJobForm;








//TEST VERSION WITH DRAFT SAVE/RESTORE

// import { jobPostingSchema, JobPostingSchemaType } from "@/lib/validators/job";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";

// const STORAGE_KEY = "post-job-form-data";

// const useJobForm = () => {
//   const [loading, setLoading] = useState(false);

//   const form = useForm<JobPostingSchemaType>({
//     resolver: zodResolver(jobPostingSchema),
//     mode: "onChange", // Enable real-time validation
//     defaultValues: {
//       employment_type: "full_time",
//       work_mode: "remote",
//       // type: "permanent",
//       hide_salary: false,
//       is_featured: false,
//       is_published: true,
//     },
//   });

//   // Load saved form data on mount
//   useEffect(() => {
//     try {
//       const savedData = localStorage.getItem(STORAGE_KEY);
//       if (savedData) {
//         const parsedData = JSON.parse(savedData);

//         // Restore form values
//         if (parsedData.formValues) {
//           Object.keys(parsedData.formValues).forEach((key) => {
//             const value = parsedData.formValues[key];
//             // Only restore if the value is not undefined
//             if (value !== undefined) {
//               form.setValue(key as any, value, {
//                 shouldValidate: false, // Don't validate on restore
//                 shouldDirty: true, // Mark as dirty so user knows there's saved data
//               });
//             }
//           });
//           console.log("✅ Restored job form data from localStorage");
//           toast.info("Draft restored from previous session", {
//             duration: 3000,
//           });
//         }
//       }
//     } catch (error) {
//       console.error("❌ Failed to restore job form data:", error);
//     }
//   }, [form]);

//   // Save form data whenever it changes
//   useEffect(() => {
//     const subscription = form.watch((formValues) => {
//       try {
//         const savedData = localStorage.getItem(STORAGE_KEY);
//         const existingData = savedData ? JSON.parse(savedData) : {};

//         const dataToSave = {
//           ...existingData,
//           formValues,
//           timestamp: new Date().toISOString(),
//         };

//         localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
//       } catch (error) {
//         console.error("Failed to save form data:", error);
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, [form]);

//   const onSubmit = async (data: any) => {
//     setLoading(true);

//     try {
//       // Format benefits as comma-separated string
//       const payload = {
//         ...data,
//         benefits: data.benefits?.join(","),
//       };

//       // Import JobServices and call createJob
//       // This will be handled in the PostJob component
//       return payload;
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || "An error occurred");
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to clear saved form data
//   const clearFormStorage = () => {
//     try {
//       localStorage.removeItem(STORAGE_KEY);
//       console.log("🗑️ Cleared job form data from localStorage");
//     } catch (error) {
//       console.error("Failed to clear form storage:", error);
//     }
//   };

//   // Function to get saved data
//   const getSavedData = () => {
//     try {
//       const savedData = localStorage.getItem(STORAGE_KEY);
//       return savedData ? JSON.parse(savedData) : null;
//     } catch (error) {
//       console.error("Failed to get saved data:", error);
//       return null;
//     }
//   };

//   // Check if form has unsaved changes
//   const hasUnsavedChanges = () => {
//     return form.formState.isDirty;
//   };

//   return {
//     form,
//     onSubmit,
//     loading,
//     clearFormStorage,
//     getSavedData,
//     hasUnsavedChanges,
//   };
// };

// export default useJobForm;


