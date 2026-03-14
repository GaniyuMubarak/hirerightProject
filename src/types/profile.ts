export interface OnboardingFormData {
  profile_picture: any;
  resume: any;
  user: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    bio: string;
    title: string;
    website?: string;
    location?: string;
  };
  education: Array<{
    id?: number;
    institution: string;
    degree: string;
    field_of_study: string;
    location: string;
    start_date: string;
    end_date: string;
    is_current: boolean;
    activities?: string;
    description?: string;
  }>;
  experience: Array<{
    id?: number;
    company_name: string;
    job_title: string;
    description: string;
    location: string;
    employment_type: string;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
  }>;
  certifications: Array<{
    id?: number;
    name: string;
    organization: string;
    issue_date: string;
    expiration_date: string | null;
    has_expiry: boolean;
    is_expired: boolean;
  }>;
}

// Shape of POST /candidates/profile and PUT /profile responses
export interface CandidateProfileApiResponse {
  status: "success" | "error";
  message?: string;
  data: {
    user: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      phone: string | null;
      address: string | null;
      bio: string | null;
      title: string | null;
      profile_image_url: string | null;
      cover_image_url: string | null;
      resume_url: string | null;
      cover_letter_file_url: string | null;
      portfolio_url: string | null;
    };
    education: any[];
    experiences: any[];
    certifications: any[];
  };
}