


// Shape of GET /employers/company response
export interface EmployerCompanyProfile {
  id: number;
  name: string;
  slug: string;
  email: string;
  phone: string;
  about: string;
  website: string;
  industry_code: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string | null;
  full_address: string;
  size_min: number | null;
  size_max: number | null;
  size_range: string | null;
  status: string;
  is_verified: boolean;
  is_featured: boolean;
  // Backend returns object when links exist, empty array when none
  social_links: Record<string, string> | any[];
  linkedin_url?: string;
  twitter_url?: string;
  owner: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    app_role: string;
  };
  created_at: string;
  updated_at: string;
}

// Shape of POST /employers/company and PUT /employers/company responses
export interface EmployerProfileApiResponse {
  status?: "success" | "error";
  message?: string;
  data: EmployerCompanyProfile;
}

// Form data shape used by use-employer-onboarding-form
export interface EmployerOnboardingFormData {
  name: string;
  email: string;
  phone: string;
  about: string;
  website: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  size_min: number;
  size_max: number;
  industry_code: string;
  linkedin_url: string;
  twitter_url: string;
  firstName: string;
  lastName: string;
  role: string;
}

// Legacy — kept for any existing components that import from this file
// Remove once EmployerOnboardingFormData is adopted everywhere
export interface EmployerProfileData {
  logo?: File | string;
  registration_document?: File | string;
  company: {
    name: string;
    legal_name?: string;
    email: string;
    phone: string;
    address: string;
    description: string;
    industry: string;
    size: string;
    founded_year?: string;
    website?: string;
    registration_number?: string;
    tax_id?: string;
  };
  contact_person: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    position: string;
    bio?: string;
  };
  departments: Array<{
    id?: string;
    name: string;
    manager?: string;
    employee_count?: number;
    description?: string;
    location?: string;
  }>;
  locations: Array<{
    id?: string;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    phone?: string;
    email?: string;
    is_headquarters: boolean;
    type: "office" | "warehouse" | "store" | "factory";
  }>;
  hiring_preferences: Array<{
    id?: string;
    job_type: string;
    location_type: string;
    experience_level: string;
    department?: string;
    description?: string;
  }>;
  social_links: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    github?: string;
  };
  benefits: Array<{
    id?: string;
    name: string;
    category: "health" | "financial" | "work_life" | "development" | "other";
    description?: string;
  }>;
  verification?: {
    is_verified: boolean;
    verification_date?: string;
    verified_by?: string;
    verification_type?: "email" | "phone" | "document";
  };
  settings?: {
    email_notifications: boolean;
    candidate_updates: boolean;
    newsletter: boolean;
    privacy_settings: "public" | "private" | "limited";
  };
  id?: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}