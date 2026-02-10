import requests from "./https-services";
import { EmployerProfileData } from "@/types/employer-profile";

class ProfileService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = import.meta.env.VITE_API_BASE_URL;
  }

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem("access_token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  async getEmployerProfile(): Promise<EmployerProfileData> {
    try {
      const response = await fetch(`${this.apiUrl}/employers/company`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Response is not JSON:", await response.text());
        throw new Error(
          "API returned HTML instead of JSON. Check backend logs."
        );
      }

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = "/sign-in";
          throw new Error("Unauthorized");
        }
        if (response.status === 404) {
          throw new Error("Company profile not found");
        }
        if (response.status === 412) {
          throw new Error("Please create a company profile first");
        }
        throw new Error(`Failed to fetch profile: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data); // Debug log

      return this.transformToProfileFormat(data.data || data);
    } catch (error) {
      console.error("Error fetching employer profile:", error);
      throw error;
    }
  }

  async saveEmployerProfile(profileData: EmployerProfileData): Promise<any> {
    try {
      const apiData = this.transformToApiFormat(profileData);

      const response = await fetch(`${this.apiUrl}/employers/company`, {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        throw new Error(`Failed to save profile: ${response.statusText}`);
      }

      const data = await response.json();
      return this.transformToProfileFormat(data.data || data);
    } catch (error) {
      console.error("Error saving employer profile:", error);
      throw error;
    }
  }

  private transformToProfileFormat(apiData: any): EmployerProfileData {
    console.log("Transforming API data:", apiData); // Debug log

    return {
      basic: {
        fullName: apiData.owner?.full_name || "", // From owner relationship
        jobTitle: apiData.owner?.title || "",
        email: apiData.email || "",
        phone: apiData.phone || "",
      },
      company: {
        companyName: apiData.name || "",
        industry: apiData.industry_code || "",
        companySize:
          apiData.size_range ||
          `${apiData.size_min || ""}-${apiData.size_max || ""}`,
        foundedYear: apiData.founded_year || "",
        description: apiData.about || "",
        location: apiData.full_address || apiData.address || "",
        logoUrl: apiData.logo_url || "",
      },
      social: {
        website: apiData.website || "",
        linkedin: apiData.social_links?.linkedin || apiData.linkedin_url || "",
        twitter: apiData.social_links?.twitter || apiData.twitter_url || "",
        github: "",
      },
      additional: {
        hiringPreferences: [],
        interviewProcess: "",
        benefits: "",
      },
      id: apiData.id,
      userId: apiData.owner_id,
      createdAt: apiData.created_at,
      updatedAt: apiData.updated_at,
    };
  }

  private transformToApiFormat(profileData: EmployerProfileData): any {
    return {
      name: profileData.company.companyName,
      email: profileData.basic.email,
      phone: profileData.basic.phone,
      about: profileData.company.description,
      website: profileData.social.website,
      industry_code: profileData.company.industry,
      address: profileData.company.location,
      linkedin_url: profileData.social.linkedin,
      twitter_url: profileData.social.twitter,
    };
  }
}

export const profileService = new ProfileService();