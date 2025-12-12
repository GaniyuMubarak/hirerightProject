// import React from "react";
// import ProfileServices from "@/services/profile-services";
// import FileServices from "@/services/file-services"; // Assuming you have this
// import { OnboardingFormData } from "@/types/profile";
// import { useState, useCallback } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router";
// import { toast } from "sonner";
// import { useCurrentUser } from "../use-current-user";
// import { useFileUpload } from "../use-file-upload";

// interface UploadProgress {
//   profilePicture: number;
//   resume: number;
// }

// const useOnboardingForm = () => {
//   const [loading, setLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
//     profilePicture: 0,
//     resume: 0,
//   });
//   const [uploadedFileIds, setUploadedFileIds] = useState<{
//     profilePicture?: string;
//     resume?: string;
//   }>({});
//   const navigator = useNavigate();
//   const { uploadPendingFile } = useFileUpload();
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
//           company_name: "",
//           job_title: "",
//           description: "",
//           location: "",
//           employment_type: "full_time" as const,
//           start_date: "",
//           end_date: null,
//           is_current: false,
//         },
//       ],
//       certifications: [
//         {
//           name: "",
//           organization: "",
//           issue_date: "",
//           expiration_date: null,
//           has_expiry: false,
//           is_expired: false,
//         },
//       ],
//       profile_picture: undefined,
//       resume: undefined,
//     },
//   });

//   // Validate files before upload
//   const validateFiles = (data: OnboardingFormData) => {
//     const errors: string[] = [];

//     // Profile picture validation
//     if (data.profile_picture) {
//       const profilePic = data.profile_picture;
//       const allowedImageTypes = [
//         "image/jpeg",
//         "image/png",
//         "image/gif",
//         "image/webp",
//       ];
//       const maxSize = 5 * 1024 * 1024; // 5MB

//       if (!allowedImageTypes.includes(profilePic.type)) {
//         errors.push("Profile picture must be JPEG, PNG, GIF, or WebP");
//       }
//       if (profilePic.size > maxSize) {
//         errors.push("Profile picture must be less than 5MB");
//       }
//     }

//     // Resume validation
//     if (data.resume) {
//       const resume = data.resume;
//       const allowedDocTypes = [
//         "application/pdf",
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//         "text/plain",
//       ];
//       const maxSize = 10 * 1024 * 1024; // 10MB

//       if (!allowedDocTypes.includes(resume.type)) {
//         errors.push("Resume must be PDF, DOC, DOCX, or TXT");
//       }
//       if (resume.size > maxSize) {
//         errors.push("Resume must be less than 10MB");
//       }
//     }

//     return errors;
//   };

//   // Upload a single file with progress tracking
//   const uploadFileWithProgress = useCallback(
//     async (
//       file: File,
//       entityType: string,
//       onProgress?: (progress: number) => void
//     ): Promise<string> => {
//       try {
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("entityType", entityType);
//         formData.append("entityId", user?.id || "");

//         const xhr = new XMLHttpRequest();

//         return new Promise((resolve, reject) => {
//           xhr.upload.addEventListener("progress", (event) => {
//             if (event.lengthComputable && onProgress) {
//               const progress = Math.round((event.loaded / event.total) * 100);
//               onProgress(progress);
//             }
//           });

//           xhr.addEventListener("load", () => {
//             if (xhr.status === 200 || xhr.status === 201) {
//               const response = JSON.parse(xhr.responseText);
//               resolve(response.fileId || response.id);
//             } else {
//               reject(new Error(`Upload failed with status ${xhr.status}`));
//             }
//           });

//           xhr.addEventListener("error", () => {
//             reject(new Error("Upload failed due to network error"));
//           });

//           xhr.open("POST", "/api/storage/upload");
//           xhr.setRequestHeader(
//             "Authorization",
//             `Bearer ${localStorage.getItem("token")}`
//           );
//           xhr.send(formData);
//         });
//       } catch (error) {
//         throw new Error(
//           `File upload failed: ${
//             error instanceof Error ? error.message : "Unknown error"
//           }`
//         );
//       }
//     },
//     [user?.id]
//   );

//   // Clean up uploaded files if something fails
//   const cleanupUploadedFiles = useCallback(async () => {
//     try {
//       const promises = [];

//       if (uploadedFileIds.profilePicture) {
//         promises.push(
//           FileServices.deleteFile(uploadedFileIds.profilePicture).catch(() => {
//             console.warn("Failed to delete profile picture");
//           })
//         );
//       }

//       if (uploadedFileIds.resume) {
//         promises.push(
//           FileServices.deleteFile(uploadedFileIds.resume).catch(() => {
//             console.warn("Failed to delete resume");
//           })
//         );
//       }

//       await Promise.allSettled(promises);
//       setUploadedFileIds({});
//     } catch (error) {
//       console.error("Error cleaning up files:", error);
//     }
//   }, [uploadedFileIds]);

//   const onSubmit = async (data: OnboardingFormData) => {
//     setLoading(true);
//     setUploadProgress({ profilePicture: 0, resume: 0 });
//     setUploadedFileIds({});

//     try {
//       // 1. Validate files
//       const validationErrors = validateFiles(data);
//       if (validationErrors.length > 0) {
//         validationErrors.forEach((error) => toast.error(error));
//         setLoading(false);
//         return;
//       }

//       // 2. Upload files first (so we have file IDs for the profile)
//       const uploadedFiles: { profile_picture_id?: string; resume_id?: string } =
//         {};

//       if (data.profile_picture) {
//         try {
//           toast.info("Uploading profile picture...");
//           const fileId = await uploadFileWithProgress(
//             data.profile_picture,
//             "UserProfile",
//             (progress) =>
//               setUploadProgress((prev) => ({
//                 ...prev,
//                 profilePicture: progress,
//               }))
//           );
//           uploadedFiles.profile_picture_id = fileId;
//           setUploadedFileIds((prev) => ({ ...prev, profilePicture: fileId }));
//           toast.success("Profile picture uploaded");
//         } catch (error) {
//           toast.error("Failed to upload profile picture");
//           throw error;
//         }
//       }

//       if (data.resume) {
//         try {
//           toast.info("Uploading resume...");
//           const fileId = await uploadFileWithProgress(
//             data.resume,
//             "CandidateResume",
//             (progress) =>
//               setUploadProgress((prev) => ({ ...prev, resume: progress }))
//           );
//           uploadedFiles.resume_id = fileId;
//           setUploadedFileIds((prev) => ({ ...prev, resume: fileId }));
//           toast.success("Resume uploaded");
//         } catch (error) {
//           toast.error("Failed to upload resume");
//           throw error;
//         }
//       }

//       // 3. Prepare profile data with file references
//       const profileData = {
//         ...data,
//         user: {
//           ...data.user,
//           profile_picture_id: uploadedFiles.profile_picture_id,
//           resume_id: uploadedFiles.resume_id,
//         },
//         // Remove the actual file objects since we only need IDs now
//         profile_picture: undefined,
//         resume: undefined,
//       };

//       // 4. Update profile with file references
//       const res = await ProfileServices.updateProfile(profileData);

//       // 5. Use your existing uploadPendingFile as fallback if needed
//       // (This is optional since we already uploaded files above)
//       try {
//         if (data.profile_picture) {
//           await uploadPendingFile({
//             files: [data.profile_picture],
//             entity_id: user?.id,
//             entityType: "UserProfile",
//           });
//         }
//         if (data.resume) {
//           await uploadPendingFile({
//             files: [data.resume],
//             entity_id: user?.id,
//             entityType: "CandidateResume",
//           });
//         }
//       } catch (uploadError) {
//         console.warn("Secondary upload failed:", uploadError);
//         // Don't fail the whole process if this falls back fails
//       }

//       toast.success(res?.message || "Profile updated successfully");
//       navigator("/candidate/dashboard");
//     } catch (err: any) {
//       console.error("Onboarding error:", err);

//       // Clean up uploaded files if profile update failed
//       await cleanupUploadedFiles();

//       const errorMessage =
//         err?.response?.data?.message ||
//         err?.message ||
//         "An error occurred during onboarding";

//       toast.error(errorMessage);

//       // If it's a validation error from the server, you might want to
//       // set form errors
//       if (err?.response?.data?.errors) {
//         const errors = err.response.data.errors;
//         Object.keys(errors).forEach((field) => {
//           form.setError(field as any, {
//             type: "manual",
//             message: errors[field][0],
//           });
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Reset form function
//   const resetForm = useCallback(() => {
//     form.reset();
//     setUploadProgress({ profilePicture: 0, resume: 0 });
//     setUploadedFileIds({});
//   }, [form]);

//   // Watch for file changes to validate
//   const profilePicture = form.watch("profile_picture");
//   const resume = form.watch("resume");

//   // Auto-validate files when they change
//   const validateFileOnChange = useCallback(
//     (file: File | undefined, type: "image" | "document") => {
//       if (!file) return;

//       if (type === "image") {
//         const allowedTypes = [
//           "image/jpeg",
//           "image/png",
//           "image/gif",
//           "image/webp",
//         ];
//         if (!allowedTypes.includes(file.type)) {
//           form.setError("profile_picture", {
//             type: "manual",
//             message: "Please upload a valid image (JPEG, PNG, GIF, WebP)",
//           });
//         } else if (file.size > 5 * 1024 * 1024) {
//           form.setError("profile_picture", {
//             type: "manual",
//             message: "Image must be less than 5MB",
//           });
//         } else {
//           form.clearErrors("profile_picture");
//         }
//       } else {
//         const allowedTypes = [
//           "application/pdf",
//           "application/msword",
//           "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//           "text/plain",
//         ];
//         if (!allowedTypes.includes(file.type)) {
//           form.setError("resume", {
//             type: "manual",
//             message: "Please upload a valid document (PDF, DOC, DOCX, TXT)",
//           });
//         } else if (file.size > 10 * 1024 * 1024) {
//           form.setError("resume", {
//             type: "manual",
//             message: "Document must be less than 10MB",
//           });
//         } else {
//           form.clearErrors("resume");
//         }
//       }
//     },
//     [form]
//   );

//   // Watch file changes and validate
//   React.useEffect(() => {
//     if (profilePicture) {
//       validateFileOnChange(profilePicture, "image");
//     }
//   }, [profilePicture, validateFileOnChange]);

//   React.useEffect(() => {
//     if (resume) {
//       validateFileOnChange(resume, "document");
//     }
//   }, [resume, validateFileOnChange]);

//   return {
//     form,
//     onSubmit,
//     loading,
//     uploadProgress,
//     resetForm,
//     isFormValid: form.formState.isValid,
//     isDirty: form.formState.isDirty,
//   };
// };

// export default useOnboardingForm;





import React from "react";
import { OnboardingFormData } from "@/types/profile";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useCurrentUser } from "../use-current-user";

const useOnboardingForm = () => {
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  const user = useCurrentUser();

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
      },
      education: [
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
      experience: [
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
      certifications: [
        {
          name: "",
          organization: "",
          issue_date: "",
          expiration_date: null,
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

    // Debug: Log raw form data
    console.log('=== RAW FORM DATA ===');
    console.log('User:', data.user);
    console.log('Education:', data.education);
    console.log('Experience:', data.experience);
    console.log('Certifications:', data.certifications);
    console.log('Resume:', data.resume);
    console.log('Profile Picture:', data.profile_picture);
    console.log('=== END RAW DATA ===');

    try {
      // Get token
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please complete registration first');
        navigator('/auth/register');
        return;
      }

      // Get API base URL from environment
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      
      if (!API_BASE_URL) {
        toast.error('API configuration error. Please contact support.');
        console.error('VITE_API_BASE_URL is not defined');
        return;
      }

      // Create FormData
      const formData = new FormData();

      // Add user fields
      if (data.user?.bio) formData.append('bio', data.user.bio);
      if (data.user?.title) formData.append('title', data.user.title);
      if (data.user?.phone) formData.append('phone', data.user.phone);
      if (data.user?.address) formData.append('address', data.user.address);

      // Add profile picture if exists
      if (data.profile_picture) {
        if (data.profile_picture instanceof File) {
          formData.append('profile_image', data.profile_picture);
        } else if (data.profile_picture.file instanceof File) {
          formData.append('profile_image', data.profile_picture.file);
        }
      }

      // Add resume if exists
      if (data.resume) {
        if (data.resume instanceof File) {
          formData.append('resume', data.resume);
        } else if (data.resume.file instanceof File) {
          formData.append('resume', data.resume.file);
        }
      }

      // Add education array - CRITICAL: Check if array exists and has data
      if (data.education && Array.isArray(data.education)) {
        // Filter out empty education entries
        const validEducation = data.education.filter(edu => 
          edu.institution && edu.degree && edu.field_of_study
        );

        if (validEducation.length > 0) {
          validEducation.forEach((edu, index) => {
            formData.append(`education[${index}][institution]`, edu.institution);
            formData.append(`education[${index}][degree]`, edu.degree);
            formData.append(`education[${index}][field_of_study]`, edu.field_of_study);
            if (edu.location) formData.append(`education[${index}][location]`, edu.location);
            if (edu.start_date) formData.append(`education[${index}][start_date]`, edu.start_date);
            if (edu.end_date) formData.append(`education[${index}][end_date]`, edu.end_date);
            formData.append(`education[${index}][is_current]`, edu.is_current ? '1' : '0');
          });
        }
      }

      // Add experience array
      if (data.experience && Array.isArray(data.experience)) {
        // Filter out empty experience entries
        const validExperience = data.experience.filter(exp => 
          exp.company_name && exp.job_title
        );

        if (validExperience.length > 0) {
          validExperience.forEach((exp, index) => {
            formData.append(`experiences[${index}][company_name]`, exp.company_name);
            formData.append(`experiences[${index}][job_title]`, exp.job_title);
            if (exp.description) formData.append(`experiences[${index}][description]`, exp.description);
            if (exp.location) formData.append(`experiences[${index}][location]`, exp.location);
            if (exp.employment_type) formData.append(`experiences[${index}][employment_type]`, exp.employment_type);
            if (exp.start_date) formData.append(`experiences[${index}][start_date]`, exp.start_date);
            if (exp.end_date) formData.append(`experiences[${index}][end_date]`, exp.end_date);
            formData.append(`experiences[${index}][is_current]`, exp.is_current ? '1' : '0');
          });
        }
      }

      // Add certifications array
      if (data.certifications && Array.isArray(data.certifications)) {
        // Filter out empty certification entries
        const validCertifications = data.certifications.filter(cert => 
          cert.name && cert.organization
        );

        if (validCertifications.length > 0) {
          validCertifications.forEach((cert, index) => {
            formData.append(`certifications[${index}][name]`, cert.name);
            formData.append(`certifications[${index}][organization]`, cert.organization);
            if (cert.issue_date) formData.append(`certifications[${index}][issue_date]`, cert.issue_date);
            if (cert.expiration_date) formData.append(`certifications[${index}][expiration_date]`, cert.expiration_date);
            formData.append(`certifications[${index}][has_expiry]`, cert.has_expiry ? '1' : '0');
          });
        }
      }

      // Debug: Log what's being sent
      console.log('=== FORM DATA DEBUG ===');
      for (let [key, value] of formData.entries()) {
        console.log(key, ':', value instanceof File ? `FILE: ${value.name}` : value);
      }
      console.log('=== END DEBUG ===');

      console.log('Submitting to:', `${API_BASE_URL}/candidates/profile`);
      console.log('Token exists:', !!token);

      // Submit to API
      const response = await fetch(`${API_BASE_URL}/candidates/profile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: formData,
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        
        // Handle validation errors
        if (errorData.errors) {
          Object.keys(errorData.errors).forEach((field) => {
            const message = Array.isArray(errorData.errors[field]) 
              ? errorData.errors[field][0] 
              : errorData.errors[field];
            toast.error(`${field}: ${message}`);
          });
        } else {
          toast.error(errorData.message || 'Failed to save profile');
        }
        return;
      }

      const result = await response.json();
      console.log('Success:', result);

      toast.success('Profile updated successfully');
      navigator('/candidate/dashboard');

    } catch (err: any) {
      console.error('Onboarding error:', err);
      toast.error(err.message || 'An error occurred during onboarding');
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    onSubmit,
    loading,
  };
};

export default useOnboardingForm;