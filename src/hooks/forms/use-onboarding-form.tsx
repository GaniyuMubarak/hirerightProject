import ProfileServices from "@/services/profile-services";
import { OnboardingFormData } from "@/types/profile";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useCurrentUser } from "../use-current-user";
import { useFileUpload } from "../use-file-upload";

const useOnboardingForm = () => {
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  const { uploadPendingFile } = useFileUpload();
  const user = useCurrentUser();
  const form = useForm<OnboardingFormData>({
    defaultValues: {
      user: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        bio: "",
        title: "",
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
          employment_type: "full_time",
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
    },
  });

  const onSubmit = async (data: OnboardingFormData) => {
    setLoading(true);

    try {
      const res = await ProfileServices.updateProfile(data);
      if (data.profile_picture) {
        await uploadPendingFile({
          files: [data.profile_picture],
          entity_id: res?.id,
          entityType: "UserProfile",
        });
      }
      if (data.resume) {
        await uploadPendingFile({
          files: [data.resume],
          entity_id: user?.id,
          entityType: "CandidateResume",
        });
      }
      toast.success(res?.message || "Profile updated successfully");
      navigator("/candidate/dashboard");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "An error occurred");
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
