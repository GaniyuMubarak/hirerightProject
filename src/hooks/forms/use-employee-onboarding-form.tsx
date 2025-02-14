import CompanyServices from "@/services/company-services";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const useEmployerOnboardingForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      about: "",
      website: "",
      address: "",
      city: "",
      state: "",
      country: "",
      postal_code: "",
      size_min: 1,
      size_max: 50,
      industry_code: "",
      linkedin_url: "",
      twitter_url: "",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      // Fix
      delete data.profile_image;
      delete data.banner_image;

      await CompanyServices.createCompany(data);
      toast.success("Company updated successfully");
      navigate("/employer/dashboard");
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

export default useEmployerOnboardingForm;
