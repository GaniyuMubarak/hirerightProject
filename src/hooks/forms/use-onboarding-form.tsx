// // import { OnboardingFormData } from "@/types/profile";
// // import { useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { useNavigate } from "react-router";
// // import { toast } from "sonner";
// // import { useCurrentUser } from "../use-current-user";

// // const useOnboardingForm = ({
// //   onSuccess,
// //   updateMode = false,
// // }: {
// //   onSuccess?: () => void;
// //   updateMode?: boolean;
// // } = {}) => {
// //   const [loading, setLoading] = useState(false);
// //   const navigator = useNavigate();
// //   const user = useCurrentUser();

// //   const form = useForm<OnboardingFormData>({
// //     defaultValues: {
// //       user: {
// //         first_name: user?.first_name || "",
// //         last_name: user?.last_name || "",
// //         email: user?.email || "",
// //         phone: user?.phone || "",
// //         address: user?.address || "",
// //         bio: user?.bio || "",
// //         title: user?.title || "",
// //       },
// //       education: [
// //         {
// //           id: undefined,
// //           institution: "",
// //           degree: "",
// //           field_of_study: "",
// //           location: "",
// //           start_date: "",
// //           end_date: "",
// //           is_current: false,
// //         },
// //       ],
// //       experience: [
// //         {
// //           id: undefined,
// //           company_name: "",
// //           job_title: "",
// //           description: "",
// //           location: "",
// //           employment_type: "full_time" as const,
// //           start_date: "",
// //           end_date: null,
// //           is_current: false,
// //         },
// //       ],
// //       certifications: [
// //         {
// //           id: undefined,
// //           name: "",
// //           organization: "",
// //           issue_date: "",
// //           expiration_date: null,
// //           has_expiry: false,
// //           is_expired: false,
// //         },
// //       ],
// //       // profile_picture: undefined,
// //       profile_picture: user?.profile_image || "",
// //       // resume: undefined,
// //       resume: user?.resume || "",
// //     },
// //   });

// //   const onSubmit = async (data: OnboardingFormData) => {
// //     setLoading(true);

// //     console.log("=== RAW FORM DATA ===");
// //     console.log("User:", data.user);
// //     console.log("Education:", data.education);
// //     console.log("Experience:", data.experience);
// //     console.log("Certifications:", data.certifications);
// //     console.log("=== END RAW DATA ===");

// //     try {
// //       const token = localStorage.getItem("token");

// //       if (!token) {
// //         toast.error("Please complete registration first");
// //         navigator("/auth/register");
// //         return;
// //       }

// //       const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// //       if (!API_BASE_URL) {
// //         toast.error("API configuration error. Please contact support.");
// //         return;
// //       }

// //       const formData = new FormData();

// //       // User fields
// //       if (data.user?.bio) formData.append("bio", data.user.bio);
// //       if (data.user?.title) formData.append("title", data.user.title);
// //       if (data.user?.phone) formData.append("phone", data.user.phone);
// //       if (data.user?.address) formData.append("address", data.user.address);
// //       if (data.user?.location) formData.append("location", data.user.location);
// //       if (data.user?.website) formData.append("website", data.user.website);

// //       // Profile picture
// //       if (data.profile_picture) {
// //         if (data.profile_picture instanceof File) {
// //           formData.append("profile_image", data.profile_picture);
// //         } else if (data.profile_picture.file instanceof File) {
// //           formData.append("profile_image", data.profile_picture.file);
// //         }
// //       }

// //       // Resume
// //       if (data.resume) {
// //         if (data.resume instanceof File) {
// //           formData.append("resume", data.resume);
// //         } else if (data.resume.file instanceof File) {
// //           formData.append("resume", data.resume.file);
// //         }
// //       }

// //       // Education
// //       if (data.education && Array.isArray(data.education)) {
// //         const validEducation = data.education.filter(
// //           (edu) => edu.institution && edu.degree && edu.field_of_study,
// //         );
// //         validEducation.forEach((edu, index) => {
// //           // ✅ Send id so backend updates existing record instead of creating new one
// //           if (edu.id)
// //             formData.append(`education[${index}][id]`, String(edu.id));
// //           formData.append(`education[${index}][institution]`, edu.institution);
// //           formData.append(`education[${index}][degree]`, edu.degree);
// //           formData.append(
// //             `education[${index}][field_of_study]`,
// //             edu.field_of_study,
// //           );
// //           if (edu.location)
// //             formData.append(`education[${index}][location]`, edu.location);
// //           if (edu.start_date)
// //             formData.append(`education[${index}][start_date]`, edu.start_date);
// //           if (edu.end_date)
// //             formData.append(`education[${index}][end_date]`, edu.end_date);
// //           formData.append(
// //             `education[${index}][is_current]`,
// //             edu.is_current ? "1" : "0",
// //           );
// //         });
// //       }

// //       // Experience
// //       if (data.experience && Array.isArray(data.experience)) {
// //         const validExperience = data.experience.filter(
// //           (exp) => exp.company_name && exp.job_title,
// //         );
// //         validExperience.forEach((exp, index) => {
// //           // ✅ Send id so backend updates existing record instead of creating new one
// //           if (exp.id)
// //             formData.append(`experiences[${index}][id]`, String(exp.id));
// //           formData.append(
// //             `experiences[${index}][company_name]`,
// //             exp.company_name,
// //           );
// //           formData.append(`experiences[${index}][job_title]`, exp.job_title);
// //           if (exp.description)
// //             formData.append(
// //               `experiences[${index}][description]`,
// //               exp.description,
// //             );
// //           if (exp.location)
// //             formData.append(`experiences[${index}][location]`, exp.location);
// //           if (exp.employment_type)
// //             formData.append(
// //               `experiences[${index}][employment_type]`,
// //               exp.employment_type,
// //             );
// //           if (exp.start_date)
// //             formData.append(
// //               `experiences[${index}][start_date]`,
// //               exp.start_date,
// //             );
// //           if (exp.end_date)
// //             formData.append(`experiences[${index}][end_date]`, exp.end_date);
// //           formData.append(
// //             `experiences[${index}][is_current]`,
// //             exp.is_current ? "1" : "0",
// //           );
// //         });
// //       }

// //       // Certifications
// //       if (data.certifications && Array.isArray(data.certifications)) {
// //         const validCertifications = data.certifications.filter(
// //           (cert) => cert.name && cert.organization,
// //         );
// //         validCertifications.forEach((cert, index) => {
// //           // ✅ Send id so backend updates existing record instead of creating new one
// //           if (cert.id)
// //             formData.append(`certifications[${index}][id]`, String(cert.id));
// //           formData.append(`certifications[${index}][name]`, cert.name);
// //           formData.append(
// //             `certifications[${index}][organization]`,
// //             cert.organization,
// //           );
// //           if (cert.issue_date)
// //             formData.append(
// //               `certifications[${index}][issue_date]`,
// //               cert.issue_date,
// //             );
// //           if (cert.expiration_date)
// //             formData.append(
// //               `certifications[${index}][expiration_date]`,
// //               cert.expiration_date,
// //             );
// //           formData.append(
// //             `certifications[${index}][has_expiry]`,
// //             cert.has_expiry ? "1" : "0",
// //           );
// //         });
// //       }

// //       const url = updateMode
// //         ? `${API_BASE_URL}/profile`
// //         : `${API_BASE_URL}/candidates/profile`;

// //       const method = updateMode ? "PUT" : "POST";

// //       console.log(`Submitting to: ${url} [${method}]`);

// //       const response = await fetch(url, {
// //         method,
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           Accept: "application/json",
// //         },
// //         body: formData,
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         console.error("API Error:", errorData);

// //         if (errorData.errors) {
// //           Object.keys(errorData.errors).forEach((field) => {
// //             const message = Array.isArray(errorData.errors[field])
// //               ? errorData.errors[field][0]
// //               : errorData.errors[field];
// //             toast.error(`${field}: ${message}`);
// //           });
// //         } else {
// //           toast.error(errorData.message || "Failed to save profile");
// //         }
// //         return;
// //       }

// //       const result = await response.json();
// //       console.log("Success:", result);

// //       toast.success(
// //         updateMode
// //           ? "Profile updated successfully"
// //           : "Profile saved successfully",
// //       );

// //       if (onSuccess) {
// //         onSuccess();
// //       } else {
// //         navigator("/candidate/dashboard");
// //       }
// //     } catch (err: any) {
// //       console.error("Onboarding error:", err);
// //       toast.error(err.message || "An error occurred");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return { form, onSubmit, loading };
// // };

// // export default useOnboardingForm;

// import { OnboardingFormData } from "@/types/profile";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router";
// import { toast } from "sonner";
// import { useCurrentUser } from "../use-current-user";

// const useOnboardingForm = ({
//   onSuccess,
//   updateMode = false,
// }: {
//   onSuccess?: () => void;
//   updateMode?: boolean;
// } = {}) => {
//   const [loading, setLoading] = useState(false);
//   const navigator = useNavigate();
//   const user = useCurrentUser();

//   const form = useForm<OnboardingFormData>({
//     defaultValues: {
//       user: {
//         first_name: user?.first_name || "",
//         last_name: user?.last_name || "",
//         email: user?.email || "",
//         phone: user?.phone || "",
//         address: user?.address || "",
//         bio: user?.bio || "",
//         title: user?.title || "",
//       },
//       education: [
//         {
//           id: undefined,
//           institution: "",
//           degree: "",
//           field_of_study: "",
//           location: "",
//           start_date: "",
//           end_date: "",
//           is_current: false,
//         },
//       ],
//       experience: [
//         {
//           id: undefined,
//           company_name: "",
//           job_title: "",
//           description: "",
//           location: "",
//           employment_type: "full_time" as const,
//           start_date: "",
//           end_date: "", // ✅ null causes React "value prop should not be null" warning
//           is_current: false,
//         },
//       ],
//       certifications: [
//         {
//           id: undefined,
//           name: "",
//           organization: "",
//           issue_date: "",
//           expiration_date: "", // ✅ null causes React "value prop should not be null" warning
//           has_expiry: false,
//           is_expired: false,
//         },
//       ],
//       profile_picture: user?.profile_image || "",
//       resume: user?.resume || "",
//     },
//   });

//   const onSubmit = async (data: OnboardingFormData) => {
//     setLoading(true);

//     console.log("=== RAW FORM DATA ===");
//     console.log("User:", data.user);
//     console.log("Education:", data.education);
//     console.log("Experience:", data.experience);
//     console.log("Certifications:", data.certifications);
//     console.log("=== END RAW DATA ===");

//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         toast.error("Please complete registration first");
//         navigator("/auth/register");
//         return;
//       }

//       const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//       if (!API_BASE_URL) {
//         toast.error("API configuration error. Please contact support.");
//         return;
//       }

//       const formData = new FormData();

//       // User fields
//       // ✅ FIX 1: first_name and last_name were never being sent
//       if (data.user?.first_name) formData.append("first_name", data.user.first_name);
//       if (data.user?.last_name) formData.append("last_name", data.user.last_name);
//       if (data.user?.bio) formData.append("bio", data.user.bio);
//       if (data.user?.title) formData.append("title", data.user.title);
//       if (data.user?.phone) formData.append("phone", data.user.phone);
//       if (data.user?.address) formData.append("address", data.user.address);
//       if (data.user?.location) formData.append("location", data.user.location);
//       if (data.user?.website) formData.append("website", data.user.website);

//       // Profile picture
//       if (data.profile_picture) {
//         if (data.profile_picture instanceof File) {
//           formData.append("profile_image", data.profile_picture);
//         } else if (data.profile_picture.file instanceof File) {
//           formData.append("profile_image", data.profile_picture.file);
//         }
//       }

//       // Resume
//       if (data.resume) {
//         if (data.resume instanceof File) {
//           formData.append("resume", data.resume);
//         } else if (data.resume.file instanceof File) {
//           formData.append("resume", data.resume.file);
//         }
//       }

//       // Education
//       if (data.education && Array.isArray(data.education)) {
//         // ✅ degree restored — backend validates it as required
//         const validEducation = data.education.filter(
//           (edu) => edu.institution && edu.degree && edu.field_of_study,
//         );
//         validEducation.forEach((edu, index) => {
//           if (edu.id)
//             formData.append(`education[${index}][id]`, String(edu.id));
//           formData.append(`education[${index}][institution]`, edu.institution);
//           if (edu.degree)
//             formData.append(`education[${index}][degree]`, edu.degree);
//           formData.append(
//             `education[${index}][field_of_study]`,
//             edu.field_of_study,
//           );
//           if (edu.location)
//             formData.append(`education[${index}][location]`, edu.location);
//           if (edu.start_date)
//             formData.append(`education[${index}][start_date]`, edu.start_date);
//           if (edu.end_date)
//             formData.append(`education[${index}][end_date]`, edu.end_date);
//           formData.append(
//             `education[${index}][is_current]`,
//             edu.is_current ? "1" : "0",
//           );
//         });
//       }

//       // Experience
//       if (data.experience && Array.isArray(data.experience)) {
//         const validExperience = data.experience.filter(
//           (exp) => exp.company_name && exp.job_title,
//         );
//         validExperience.forEach((exp, index) => {
//           if (exp.id)
//             formData.append(`experiences[${index}][id]`, String(exp.id));
//           formData.append(
//             `experiences[${index}][company_name]`,
//             exp.company_name,
//           );
//           formData.append(`experiences[${index}][job_title]`, exp.job_title);
//           if (exp.description)
//             formData.append(
//               `experiences[${index}][description]`,
//               exp.description,
//             );
//           if (exp.location)
//             formData.append(`experiences[${index}][location]`, exp.location);
//           if (exp.employment_type)
//             formData.append(
//               `experiences[${index}][employment_type]`,
//               exp.employment_type,
//             );
//           if (exp.start_date)
//             formData.append(
//               `experiences[${index}][start_date]`,
//               exp.start_date,
//             );
//           if (exp.end_date)
//             formData.append(`experiences[${index}][end_date]`, exp.end_date);
//           formData.append(
//             `experiences[${index}][is_current]`,
//             exp.is_current ? "1" : "0",
//           );
//         });
//       }

//       // Certifications
//       if (data.certifications && Array.isArray(data.certifications)) {
//         const validCertifications = data.certifications.filter(
//           (cert) => cert.name && cert.organization,
//         );
//         validCertifications.forEach((cert, index) => {
//           if (cert.id)
//             formData.append(`certifications[${index}][id]`, String(cert.id));
//           formData.append(`certifications[${index}][name]`, cert.name);
//           formData.append(
//             `certifications[${index}][organization]`,
//             cert.organization,
//           );
//           if (cert.issue_date)
//             formData.append(
//               `certifications[${index}][issue_date]`,
//               cert.issue_date,
//             );
//           if (cert.expiration_date)
//             formData.append(
//               `certifications[${index}][expiration_date]`,
//               cert.expiration_date,
//             );
//           formData.append(
//             `certifications[${index}][has_expiry]`,
//             cert.has_expiry ? "1" : "0",
//           );
//         });
//       }

//       const url = updateMode
//         ? `${API_BASE_URL}/profile`
//         : `${API_BASE_URL}/candidates/profile`;

//       const method = updateMode ? "PUT" : "POST";

//       console.log(`Submitting to: ${url} [${method}]`);

//       const response = await fetch(url, {
//         method,
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("API Error:", errorData);

//         if (errorData.errors) {
//           Object.keys(errorData.errors).forEach((field) => {
//             const message = Array.isArray(errorData.errors[field])
//               ? errorData.errors[field][0]
//               : errorData.errors[field];
//             toast.error(`${field}: ${message}`);
//           });
//         } else {
//           toast.error(errorData.message || "Failed to save profile");
//         }
//         return;
//       }

//       const result = await response.json();
//       console.log("Success:", result);

//       toast.success(
//         updateMode
//           ? "Profile updated successfully"
//           : "Profile saved successfully",
//       );

//       if (onSuccess) {
//         onSuccess();
//       } else {
//         navigator("/candidate/dashboard");
//       }
//     } catch (err: any) {
//       console.error("Onboarding error:", err);
//       toast.error(err.message || "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { form, onSubmit, loading };
// };

// export default useOnboardingForm;

import {
  OnboardingFormData,
  CandidateProfileApiResponse,
} from "@/types/profile";
import { getApiErrorMessage } from "@/lib/api-error";
import { hasValidTokenCookie } from "@/lib/auth";
import { useUser } from "@/providers/user-context";
import requests from "@/services/https-services";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useCurrentUser } from "../use-current-user";

// Safely extracts a File from whatever shape the upload component stores.
// UploadFileForm stores: { file: File, url, name, type, size }
// Direct file input stores: File
// Returns null if no valid File found.
function extractFile(value: any): File | null {
  if (!value) return null;
  if (value instanceof File) return value;
  if (value?.file instanceof File) return value.file;
  return null;
}

// Ensures website is sent as a valid URL.
// Adds https:// prefix if missing.
function formatUrl(url: string): string | null {
  if (!url || url.trim() === "") return null;
  const trimmed = url.trim();
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

const useOnboardingForm = ({
  onSuccess,
  updateMode = false,
}: {
  onSuccess?: () => void;
  updateMode?: boolean;
} = {}) => {
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  const user = useCurrentUser();
  const { dispatch, state } = useUser();

  const form = useForm<OnboardingFormData>({
    defaultValues: {
      user: {
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
        bio: user?.bio || "",
        title: user?.title || "",
        website: user?.website || "",
        location: user?.location || "",
      },
      education: [
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
      experience: [
        {
          id: undefined,
          company_name: "",
          job_title: "",
          description: "",
          location: "",
          employment_type: "full_time" as const,
          start_date: "",
          end_date: "",
          is_current: false,
        },
      ],
      certifications: [
        {
          id: undefined,
          name: "",
          organization: "",
          issue_date: "",
          expiration_date: "",
          has_expiry: false,
          is_expired: false,
        },
      ],
      profile_picture: undefined,
      resume: undefined,
    },
  });

  const onSubmit = async (data: OnboardingFormData) => {
    setLoading(true);

    try {
      if (!hasValidTokenCookie()) {
        toast.error("Please sign in to continue.");
        navigator("/sign-in");
        return;
      }

      const formData = new FormData();

      // User fields
      if (data.user?.first_name)
        formData.append("first_name", data.user.first_name);
      if (data.user?.last_name)
        formData.append("last_name", data.user.last_name);
      if (data.user?.bio) formData.append("bio", data.user.bio);
      if (data.user?.title) formData.append("title", data.user.title);
      if (data.user?.phone) formData.append("phone", data.user.phone);
      if (data.user?.address) formData.append("address", data.user.address);
      if (data.user?.location) formData.append("location", data.user.location);

      // ✅ website formatted before sending — backend rejects bare domains
      const formattedWebsite = formatUrl(data.user?.website ?? "");
      if (formattedWebsite) formData.append("website", formattedWebsite);

      // ✅ extractFile handles both File and { file: File, url, name, ... } shapes
      const profileImage = extractFile(data.profile_picture);
      if (profileImage) formData.append("profile_image", profileImage);

      const resume = extractFile(data.resume);
      if (resume) formData.append("resume", resume);

      // Education
      if (Array.isArray(data.education)) {
        const validEducation = data.education.filter(
          (edu) => edu.institution && edu.degree && edu.field_of_study,
        );
        validEducation.forEach((edu, index) => {
          if (edu.id)
            formData.append(`education[${index}][id]`, String(edu.id));
          formData.append(`education[${index}][institution]`, edu.institution);
          if (edu.degree)
            formData.append(`education[${index}][degree]`, edu.degree);
          formData.append(
            `education[${index}][field_of_study]`,
            edu.field_of_study,
          );
          if (edu.location)
            formData.append(`education[${index}][location]`, edu.location);
          if (edu.start_date)
            formData.append(`education[${index}][start_date]`, edu.start_date);
          if (edu.end_date)
            formData.append(`education[${index}][end_date]`, edu.end_date);
          formData.append(
            `education[${index}][is_current]`,
            edu.is_current ? "1" : "0",
          );
        });
      }

      // Experience
      if (Array.isArray(data.experience)) {
        const validExperience = data.experience.filter(
          (exp) => exp.company_name && exp.job_title,
        );
        validExperience.forEach((exp, index) => {
          if (exp.id)
            formData.append(`experiences[${index}][id]`, String(exp.id));
          formData.append(
            `experiences[${index}][company_name]`,
            exp.company_name,
          );
          formData.append(`experiences[${index}][job_title]`, exp.job_title);
          if (exp.description)
            formData.append(
              `experiences[${index}][description]`,
              exp.description,
            );
          if (exp.location)
            formData.append(`experiences[${index}][location]`, exp.location);
          if (exp.employment_type)
            formData.append(
              `experiences[${index}][employment_type]`,
              exp.employment_type,
            );
          if (exp.start_date)
            formData.append(
              `experiences[${index}][start_date]`,
              exp.start_date,
            );
          if (exp.end_date)
            formData.append(`experiences[${index}][end_date]`, exp.end_date);
          formData.append(
            `experiences[${index}][is_current]`,
            exp.is_current ? "1" : "0",
          );
        });
      }

      // Certifications
      if (Array.isArray(data.certifications)) {
        const validCertifications = data.certifications.filter(
          (cert) => cert.name && cert.organization,
        );
        validCertifications.forEach((cert, index) => {
          if (cert.id)
            formData.append(`certifications[${index}][id]`, String(cert.id));
          formData.append(`certifications[${index}][name]`, cert.name);
          formData.append(
            `certifications[${index}][organization]`,
            cert.organization,
          );
          if (cert.issue_date)
            formData.append(
              `certifications[${index}][issue_date]`,
              cert.issue_date,
            );
          if (cert.expiration_date)
            formData.append(
              `certifications[${index}][expiration_date]`,
              cert.expiration_date,
            );
          formData.append(
            `certifications[${index}][has_expiry]`,
            cert.has_expiry ? "1" : "0",
          );
        });
      }

      // No manual Content-Type — Axios auto-detects multipart/form-data boundary
      const url = updateMode ? "/profile" : "/candidates/profile";
      const response: CandidateProfileApiResponse = updateMode
        ? await requests.put(url, formData)
        : await requests.post(url, formData);

      // Update UserContext with fresh user data so top bar reflects changes immediately
      const freshUser = response?.data?.user;
      if (freshUser && state.userInfo) {
        dispatch({
          type: "USER_LOGIN",
          payload: {
            ...state.userInfo,
            user: {
              ...state.userInfo.user,
              ...freshUser,
            },
          },
        });
      }

      toast.success(
        updateMode
          ? "Profile updated successfully"
          : "Profile saved successfully",
      );

      if (onSuccess) {
        onSuccess();
      } else {
        navigator("/candidate/dashboard");
      }
    } catch (err: any) {
      const status = err?.response?.status;
      const errorData = err?.response?.data;

      if (status === 422 && errorData?.errors) {
        Object.entries(errorData.errors).forEach(([field, messages]) => {
          const message = Array.isArray(messages)
            ? messages[0]
            : String(messages);
          toast.error(`${field}: ${message}`);
        });
      } else {
        toast.error(
          getApiErrorMessage(err, "Failed to save profile. Please try again."),
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { form, onSubmit, loading };
};

export default useOnboardingForm;