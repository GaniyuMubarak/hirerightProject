import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface UseEmployerOnboardingFormProps {
  isEditMode?: boolean;
}

const useEmployerOnboardingForm = ({
  isEditMode = false,
}: UseEmployerOnboardingFormProps = {}) => {
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditMode); 
  const [profileId, setProfileId] = useState<number | null>(null);
  const navigate = useNavigate();

  // Get user info from localStorage or auth context
  const getUserEmail = () => {
    const userEmail = localStorage.getItem("user_email");
    const userData = localStorage.getItem("user");

    if (userEmail) return userEmail;

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        return parsedUser.email || "";
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }

    return "";
  };

  const form = useForm({
    defaultValues: {
      // Company Profile - Get email from localStorage
      name: "",
      email: getUserEmail(), 
      phone: "",
      about: "",
      website: "",
      address: "",
      city: "",
      state: "",
      country: "NG", // Default to Nigeria
      postal_code: "",
      size_min: 1,
      size_max: 50,
      industry_code: "",
      linkedin_url: "",
      twitter_url: "",

      // Personal Info
      firstName: "",
      lastName: "",
      role: "employer",
      // role: "",
    },
  });

  // Fetch existing profile data in edit mode
  useEffect(() => {
    if (isEditMode) {
      fetchProfileData();
    }
  }, [isEditMode]);

  const fetchProfileData = async () => {
    try {
      setIsFetching(true);
      const token =
        localStorage.getItem("access_token") || localStorage.getItem("token");

      if (!token) {
        toast.error("Please log in to continue");
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/employers/company`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data && response.data.data) {
        const profile = response.data.data;
        setProfileId(profile.id);

        // Helper function to get URL without protocol for display
        const getDisplayUrl = (url: string): string => {
          if (!url) return "";
          // Remove https:// or http:// prefix for display
          return url.replace(/^https?:\/\//, "");
        };

        // Reset form with fetched data
        form.reset({
          name: profile.name || "",
          email: profile.email || getUserEmail(),
          phone: profile.phone || "",
          about: profile.about || "",
          website: getDisplayUrl(profile.website || ""),
          address: profile.address || "",
          city: profile.city || "",
          state: profile.state || "",
          country: profile.country || "NG",
          postal_code: profile.postal_code || "",
          size_min: profile.size_min || 1,
          size_max: profile.size_max || 50,
          industry_code: profile.industry_code || "",
          linkedin_url: getDisplayUrl(
            profile.social_links?.linkedin || profile.linkedin_url || "",
          ),
          twitter_url: getDisplayUrl(
            profile.social_links?.twitter || profile.twitter_url || "",
          ),
          firstName: profile.owner?.first_name || "",
          lastName: profile.owner?.last_name || "",
          role: "",
        });

        console.log("Profile data loaded:", profile);
      }
    } catch (err: any) {
      console.error("Error fetching profile:", err);

      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error("Please log in to continue");
        navigate("/login");
      } else if (err.response?.status === 404) {
        // No profile exists yet, stay in edit mode but treat as create
        toast.info("No existing profile found. Creating new profile.");
      } else {
        const errorMessage =
          err?.response?.data?.message || "Failed to load profile data";
        toast.error(errorMessage);
      }
    } finally {
      setIsFetching(false);
    }
  };

  // Helper function to format URLs properly
  const formatUrl = (url: string): string | null => {
    if (!url || url.trim() === "") return null;

    const trimmedUrl = url.trim();

    // Add https:// if missing
    if (
      !trimmedUrl.startsWith("http://") &&
      !trimmedUrl.startsWith("https://")
    ) {
      return `https://${trimmedUrl}`;
    }

    return trimmedUrl;
  };

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      // Get authentication token
      const token =
        localStorage.getItem("access_token") || localStorage.getItem("token");

      if (!token) {
        toast.error("Please log in to continue");
        setLoading(false);
        navigate("/login");
        return;
      }

      // Validate required fields
      if (!data.email || data.email.trim() === "") {
        toast.error("Company email is required");
        setLoading(false);
        return;
      }

      if (!data.country || data.country.trim() === "") {
        toast.error("Country is required");
        setLoading(false);
        return;
      }

      // Prepare company data with properly formatted URLs
      const companyData = {
        name: data.name || "",
        email: data.email.trim(),
        phone: data.phone || "",
        about: data.about || "",
        website: formatUrl(data.website),
        address: data.address || "",
        city: data.city || "",
        state: data.state || "",
        country: data.country.trim(),
        postal_code: data.postal_code || "",
        size_min: data.size_min || 1,
        size_max: data.size_max || 50,
        industry_code: data.industry_code || "",
        linkedin_url: formatUrl(data.linkedin_url),
        twitter_url: formatUrl(data.twitter_url),
      };

      console.log("Sending company data:", companyData);
      console.log("Is edit mode:", isEditMode);
      console.log("Profile ID:", profileId);

      let response;

      if (isEditMode && profileId) {
        // Update existing profile
        response = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/employers/company`,
          companyData,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        toast.success("Company profile updated successfully!");
      } else {
        // Create new profile
        response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/employers/company`,
          companyData,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        toast.success("Company profile created successfully!");
      }

      // Navigate back to profile page after success
      // navigate("/employer/profile");
      navigate("/employer/dashboard");
    } catch (err: any) {
      console.error("Company save error:", err);

      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error("Authentication failed. Please log in again.");
        navigate("/login");
      } else if (err?.response?.data?.errors) {
        console.error("Validation errors:", err.response.data.errors);

        const errors = err.response.data.errors;
        Object.keys(errors).forEach((field) => {
          if (Array.isArray(errors[field])) {
            errors[field].forEach((errorMsg: string) => {
              toast.error(`${field}: ${errorMsg}`);
            });
          }
        });
      } else {
        const errorMessage =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Failed to save company profile";
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    onSubmit,
    loading,
    isFetching,
    profileId,
    refetchProfile: fetchProfileData,
  };
};

export default useEmployerOnboardingForm;