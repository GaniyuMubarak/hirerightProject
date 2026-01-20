import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const useEmployerOnboardingForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Get user info from localStorage or auth context
  const getUserEmail = () => {
    // Try different possible storage locations
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
      email: getUserEmail(), // This should preload the email
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
      role: "",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    
    try {
      // Helper function to format URLs properly
      const formatUrl = (url: string): string | null => {
        if (!url || url.trim() === '') return null;
        
        const trimmedUrl = url.trim();
        
        // Add https:// if missing
        if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
          return `https://${trimmedUrl}`;
        }
        
        return trimmedUrl;
      };

      // Get authentication token
      const token = localStorage.getItem('access_token') || localStorage.getItem('token');
      
      if (!token) {
        toast.error("Please log in to continue");
        setLoading(false);
        navigate("/login");
        return;
      }

      // Validate required fields
      if (!data.email || data.email.trim() === '') {
        toast.error("Company email is required");
        setLoading(false);
        return;
      }

      if (!data.country || data.country.trim() === '') {
        toast.error("Country is required");
        setLoading(false);
        return;
      }

      // Prepare company data with properly formatted URLs
      const companyData = {
        name: data.name || "",
        email: data.email.trim(), // Use email from form (should be preloaded)
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
      console.log("User email from form:", data.email);
      
      // Make direct API call with axios
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/employers/company`,
        companyData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      
      toast.success("Company profile created successfully!");
      navigate("/employer/dashboard");
    } catch (err: any) {
      console.error("Company creation error:", err);
      
      if (err.response?.status === 412) {
        toast.error("Authentication failed. Please log in again.");
      } else if (err?.response?.data?.errors) {
        console.error("Validation errors:", err.response.data.errors);
        
        const errors = err.response.data.errors;
        Object.keys(errors).forEach(field => {
          if (Array.isArray(errors[field])) {
            errors[field].forEach((errorMsg: string) => {
              toast.error(`${field}: ${errorMsg}`);
            });
          }
        });
      } else {
        const errorMessage = err?.response?.data?.message || 
                            err?.response?.data?.error || 
                            err?.message || 
                            "Failed to create company";
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return { form, onSubmit, loading };
};

export default useEmployerOnboardingForm;