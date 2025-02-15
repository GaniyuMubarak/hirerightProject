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
  };
  education: Array<{
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
    name: string;
    organization: string;
    issue_date: string;
    expiration_date: string | null;
    has_expiry: boolean;
    is_expired: boolean;
  }>;
}
