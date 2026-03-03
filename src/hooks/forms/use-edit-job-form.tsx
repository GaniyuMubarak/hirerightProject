// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { toast } from "sonner";
// import JobServices from "@/services/job-services";

// // ── Schema ────────────────────────────────────────────────────────────────────

// export const editJobSchema = z
//   .object({
//     title: z.string().min(1, "Job title is required"),
//     employment_type: z.enum(["full_time", "part_time"]),
//     salary_currency: z.string().min(1, "Currency is required"),
//     salary_min: z.coerce.number().min(0, "Must be 0 or greater"),
//     salary_max: z.coerce.number().min(0, "Must be 0 or greater"),
//     positions_available: z.coerce
//       .number()
//       .min(1, "At least 1 position required"),
//     status: z.string().min(1, "Status is required"),
//   })
//   .refine((d) => d.salary_min < d.salary_max, {
//     message: "Minimum salary must be less than maximum salary",
//     path: ["salary_max"],
//   });

// export type EditJobSchemaType = z.infer<typeof editJobSchema>;

// // ── Hook ──────────────────────────────────────────────────────────────────────

// interface Job {
//   id: string;
//   title: string;
//   employment_type: "part_time" | "full_time";
//   salary_currency: string;
//   salary_min: number;
//   salary_max: number;
//   positions_available: number;
//   status: string;
// }

// interface UseEditJobFormOptions {
//   onSuccess?: () => void;
// }

// const useEditJobForm = ({ onSuccess }: UseEditJobFormOptions = {}) => {
//   const [editJob, setEditJob] = useState<Job | null>(null);
//   const [isSaving, setIsSaving] = useState(false);

//   const form = useForm<EditJobSchemaType>({
//     resolver: zodResolver(editJobSchema),
//     mode: "onChange",
//     defaultValues: {
//       title: "",
//       employment_type: "full_time",
//       salary_currency: "USD",
//       salary_min: 0,
//       salary_max: 0,
//       positions_available: 1,
//       status: "active",
//     },
//   });

//   // Open the modal and seed the form with the selected job's data
//   const openEdit = (job: Job) => {
//     setEditJob(job);
//     form.reset({
//       title: job.title,
//       employment_type: job.employment_type,
//       salary_currency: job.salary_currency,
//       salary_min: job.salary_min,
//       salary_max: job.salary_max,
//       positions_available: job.positions_available,
//       status: job.status,
//     });
//   };

//   const closeEdit = () => {
//     setEditJob(null);
//     form.reset();
//   };

//   const onSubmit = async (data: EditJobSchemaType) => {
//     if (!editJob) return;

//     setIsSaving(true);
//     try {
//       await JobServices.updateJob(editJob.id, {
//         ...data,
//         title: data.title.trim(),
//         salary_min: Number(data.salary_min),
//         salary_max: Number(data.salary_max),
//         positions_available: Number(data.positions_available),
//       });

//       toast.success("Job updated successfully");
//       closeEdit();
//       onSuccess?.();
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || "Failed to update job");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return {
//     form,
//     editJob,
//     isSaving,
//     isOpen: !!editJob,
//     openEdit,
//     closeEdit,
//     onSubmit: form.handleSubmit(onSubmit),
//   };
// };

// export default useEditJobForm;

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { toast } from "sonner";
// import { jobPostingSchema } from "@/lib/validators/job";
// import JobServices from "@/services/job-services";

// // ── Schema ────────────────────────────────────────────────────────────────────
// // Pick only the fields used in the edit modal from the shared schema, so
// // validation rules (types, min/max, messages) stay in one place.

// const editableFields = jobPostingSchema.pick({
//   title: true,
//   employment_type: true,
//   salary_currency: true,
//   salary_min: true,
//   salary_max: true,
//   positions_available: true,
// });

// // `status` lives outside jobPostingSchema (it's hardcoded to "published" on
// // create), so we extend with it here only.
// export const editJobSchema = editableFields.extend({
//   status: z.enum(["active", "inactive", "draft", "closed"], {
//     required_error: "Status is required",
//   }),
// });

// export type EditJobSchemaType = z.infer<typeof editJobSchema>;

// // ── Types ─────────────────────────────────────────────────────────────────────

// interface Job {
//   id: string;
//   title: string;
//   employment_type: "part_time" | "full_time";
//   salary_currency: string;
//   salary_min: number;
//   salary_max: number;
//   positions_available: number;
//   status: string;
// }

// interface UseEditJobFormOptions {
//   onSuccess?: () => void;
// }

// // ── Hook ──────────────────────────────────────────────────────────────────────

// const useEditJobForm = ({ onSuccess }: UseEditJobFormOptions = {}) => {
//   const [editJob, setEditJob] = useState<Job | null>(null);
//   const [isSaving, setIsSaving] = useState(false);

//   const form = useForm<EditJobSchemaType>({
//     resolver: zodResolver(editJobSchema),
//     mode: "onChange", // matches useJobForm — real-time validation
//     defaultValues: {
//       title: "",
//       employment_type: "full_time",
//       salary_currency: "USD",
//       salary_min: undefined,
//       salary_max: undefined,
//       positions_available: 1,
//       status: "active",
//     },
//   });

//   // Open the modal and seed the form with the selected job's current values
//   const openEdit = (job: Job) => {
//     setEditJob(job);
//     form.reset({
//       title: job.title,
//       employment_type: job.employment_type,
//       salary_currency: job.salary_currency,
//       salary_min: job.salary_min,
//       salary_max: job.salary_max,
//       positions_available: job.positions_available,
//       status: job.status as EditJobSchemaType["status"],
//     });
//   };

//   const closeEdit = () => {
//     setEditJob(null);
//     form.reset();
//   };

//   // Mirrors the field-error toast pattern from useJobForm
//   const showFieldErrors = () => {
//     const { errors } = form.formState;
//     Object.entries(errors).forEach(([fieldName, error], index) => {
//       if (error?.message) {
//         const label = fieldName
//           .split("_")
//           .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
//           .join(" ");

//         setTimeout(() => {
//           toast.error(`Invalid ${label}`, {
//             description: error.message,
//             duration: 3000,
//             id: `edit-field-error-${fieldName}`, // deduplicate
//           });
//         }, index * 200);
//       }
//     });
//   };

//   const handleSubmit = async (data: EditJobSchemaType) => {
//     if (!editJob) return;

//     setIsSaving(true);
//     try {
//       await JobServices.updateJob(editJob.id, {
//         title: data.title.trim(),
//         employment_type: data.employment_type,
//         salary_currency: data.salary_currency,
//         salary_min: data.salary_min ? Number(data.salary_min).toFixed(2) : null,
//         salary_max: data.salary_max ? Number(data.salary_max).toFixed(2) : null,
//         positions_available: Number(data.positions_available),
//         status: data.status,
//       });

//       toast.success("Job updated successfully", {
//         description: `"${data.title}" has been saved`,
//         duration: 3000,
//       });
//       closeEdit();
//       onSuccess?.();
//     } catch (err: any) {
//       // Mirror PostJob's server validation error handling
//       if (err?.response?.status === 422 && err.response.data?.errors) {
//         const errorCount = Object.keys(err.response.data.errors).length;
//         toast.error("Server Validation Failed", {
//           description: `Please fix ${errorCount} error${errorCount > 1 ? "s" : ""}`,
//           duration: 4000,
//         });

//         Object.entries(err.response.data.errors).forEach(
//           ([field, messages], index) => {
//             if (Array.isArray(messages)) {
//               messages.forEach((message: string, msgIndex) => {
//                 setTimeout(
//                   () => {
//                     const label = field
//                       .split("_")
//                       .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
//                       .join(" ");
//                     toast.error(`${label}: ${message}`, { duration: 3000 });
//                   },
//                   index * 300 + msgIndex * 100,
//                 );
//               });
//             }
//           },
//         );
//       } else {
//         toast.error("Failed to update job", {
//           description:
//             err?.response?.data?.message || "An unexpected error occurred",
//           duration: 4000,
//         });
//       }
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // Pre-validate then submit — mirrors useJobForm's onSubmit trigger pattern
//   const onSubmit = form.handleSubmit(handleSubmit, () => {
//     showFieldErrors();
//   });

//   return {
//     form,
//     editJob,
//     isSaving,
//     isOpen: !!editJob,
//     openEdit,
//     closeEdit,
//     onSubmit,
//   };
// };

// export default useEditJobForm;

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { jobPostingSchema } from "@/lib/validators/job";
import JobServices from "@/services/job-services";

// ── Schema ────────────────────────────────────────────────────────────────────

export const editJobSchema = jobPostingSchema.extend({
  status: z.enum(["active", "inactive", "draft", "closed", "published"], {
    required_error: "Status is required",
  }),
});

export type EditJobSchemaType = z.infer<typeof editJobSchema>;

// ── Types ─────────────────────────────────────────────────────────────────────

interface Job {
  id: string;
  title: string;
  [key: string]: any;
}

interface UseEditJobFormOptions {
  onSuccess?: () => void;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

const useEditJobForm = ({ onSuccess }: UseEditJobFormOptions = {}) => {
  const [editJob, setEditJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<EditJobSchemaType>({
    resolver: zodResolver(editJobSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      employment_type: "full_time",
      work_mode: "remote",
      experience_level: "entry",
      min_years_experience: 0,
      positions_available: 1,
      salary_min: undefined,
      salary_max: undefined,
      salary_currency: "USD",
      hide_salary: false,
      is_featured: false,
      is_published: true,
      location: "",
      requirements: "",
      responsibilities: "",
      benefits: [],
      deadline: "",
      type: "permanent",
      remote_regions: ["Global"],
      status: "active",
    },
  });

  // ── Open sheet: fetch job then populate form ───────────────────────────────

  const openEdit = async (job: Job) => {
    setEditJob(job);
    setIsLoading(true);

    try {
      const response = await JobServices.getJob(job.id);
      const data = response?.data;

      if (!data) throw new Error("Job not found");

      form.reset({
        title: data.title ?? "",
        description: data.description ?? "",
        employment_type: data.employment_type ?? "full_time",
        work_mode: data.work_mode ?? "remote",
        experience_level: data.experience_level ?? "entry",
        min_years_experience: Number(data.min_years_experience) || 0,
        positions_available: Number(data.positions_available) || 1,
        salary_min: data.salary_min ? Number(data.salary_min) : undefined,
        salary_max: data.salary_max ? Number(data.salary_max) : undefined,
        salary_currency: data.salary_currency ?? "USD",
        hide_salary: Boolean(data.hide_salary),
        is_featured: Boolean(data.is_featured),
        is_published: Boolean(data.is_published),
        location: data.location ?? "",
        requirements: data.requirements ?? "",
        responsibilities: data.responsibilities ?? "",
        benefits: Array.isArray(data.benefits)
          ? data.benefits
          : data.benefits
            ? data.benefits
                .split(",")
                .map((b: string) => b.trim())
                .filter(Boolean)
            : [],
        deadline: data.deadline
          ? new Date(data.deadline).toISOString().split("T")[0]
          : "",
        type: data.type ?? "permanent",
        remote_regions: data.remote_regions?.length
          ? data.remote_regions
          : ["Global"],
        status: data.status ?? "active",
      });
    } catch (err: any) {
      toast.error("Failed to load job", {
        description:
          err?.response?.data?.message || "Could not fetch job details",
        duration: 4000,
      });
      setEditJob(null);
    } finally {
      setIsLoading(false);
    }
  };

  const closeEdit = () => {
    setEditJob(null);
    form.reset();
  };

  // ── Field-error toasts (mirrors useJobForm) ────────────────────────────────

  useEffect(() => {
    const { errors, touchedFields } = form.formState;
    Object.entries(errors).forEach(([fieldName, error]) => {
      if (
        touchedFields[fieldName as keyof EditJobSchemaType] &&
        error?.message
      ) {
        const label = fieldName
          .split("_")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");

        toast.error(`Invalid ${label}`, {
          description: error.message,
          duration: 3000,
          id: `edit-field-error-${fieldName}`,
        });
      }
    });
  }, [form.formState.errors, form.formState.touchedFields]);

  // ── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = async (data: EditJobSchemaType) => {
    if (!editJob) return;
    setIsSaving(true);

    const loadingToastId = toast.loading("Saving changes...", {
      description: "Please wait while we update your job",
    });

    try {
      const payload = {
        title: data.title.trim(),
        description: data.description.trim(),
        requirements: data.requirements?.trim() || "",
        responsibilities: data.responsibilities?.trim() || "",
        benefits: Array.isArray(data.benefits)
          ? data.benefits.filter(Boolean).join(", ")
          : data.benefits || "",
        employment_type: data.employment_type,
        work_mode: data.work_mode,
        type: data.type || "permanent",
        experience_level: data.experience_level,
        positions_available: Number(data.positions_available),
        min_years_experience: Number(data.min_years_experience),
        salary_min: data.salary_min ? Number(data.salary_min).toFixed(2) : null,
        salary_max: data.salary_max ? Number(data.salary_max).toFixed(2) : null,
        salary_currency: data.salary_currency || "USD",
        hide_salary: Boolean(data.hide_salary),
        location: data.location?.trim() || "",
        deadline: data.deadline ? new Date(data.deadline).toISOString() : null,
        is_featured: Boolean(data.is_featured),
        is_published: Boolean(data.is_published),
        remote_regions: data.remote_regions?.length
          ? data.remote_regions
          : ["Global"],
        status: data.status,
      };

      const response = await JobServices.updateJob(editJob.id, payload);
      toast.dismiss(loadingToastId);

      if (response?.status === "success" || response?.data) {
        toast.success("Job updated successfully", {
          description: `"${data.title}" has been saved`,
          duration: 3000,
        });
        closeEdit();
        onSuccess?.();
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (err: any) {
      toast.dismiss(loadingToastId);

      if (err?.response?.status === 422 && err.response.data?.errors) {
        const errorCount = Object.keys(err.response.data.errors).length;
        toast.error("Server Validation Failed", {
          description: `Please fix ${errorCount} error${errorCount > 1 ? "s" : ""}`,
          duration: 4000,
        });
        Object.entries(err.response.data.errors).forEach(
          ([field, messages], index) => {
            if (Array.isArray(messages)) {
              messages.forEach((message: string, msgIndex) => {
                setTimeout(
                  () => {
                    const label = field
                      .split("_")
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ");
                    toast.error(`${label}: ${message}`, { duration: 3000 });
                  },
                  index * 300 + msgIndex * 100,
                );
              });
            }
          },
        );
      } else {
        toast.error("Failed to update job", {
          description:
            err?.response?.data?.message || "An unexpected error occurred",
          duration: 4000,
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  const onSubmit = form.handleSubmit(handleSubmit, () => {
    const { errors } = form.formState;
    const errorCount = Object.keys(errors).length;

    toast.error("Form Validation Failed", {
      description: `Please fix ${errorCount} error${errorCount > 1 ? "s" : ""} before saving`,
      duration: 4000,
    });

    Object.entries(errors).forEach(([fieldName, error], index) => {
      setTimeout(() => {
        const label = fieldName
          .split("_")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
        toast.error(`Invalid ${label}`, {
          description: error?.message,
          duration: 3000,
          id: `edit-field-error-${fieldName}`,
        });
      }, index * 200);
    });
  });

  return {
    form,
    editJob,
    isLoading,
    isSaving,
    isOpen: !!editJob,
    openEdit,
    closeEdit,
    onSubmit,
  };
};

export default useEditJobForm;