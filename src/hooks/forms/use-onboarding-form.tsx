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