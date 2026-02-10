
export interface EmployerProfileData {
  // Files for upload
  logo?: File | string; // File for upload, string for URL
  registration_document?: File | string; // Company registration document

  // Company info (similar to candidate's user object)
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

  // Contact person (similar to candidate's user but for employer)
  contact_person: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    position: string;
    bio?: string;
  };

  // Company departments/teams (similar to candidate's education/experience)
  departments: Array<{
    id?: string;
    name: string;
    manager?: string;
    employee_count?: number;
    description?: string;
    location?: string;
  }>;

  // Company locations/branches
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

  // Hiring preferences (similar to candidate's certifications)
  hiring_preferences: Array<{
    id?: string;
    job_type: string;
    location_type: string;
    experience_level: string;
    department?: string;
    description?: string;
  }>;

  // Social media links
  social_links: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    github?: string;
  };

  // Company culture/benefits
  benefits: Array<{
    id?: string;
    name: string;
    category: "health" | "financial" | "work_life" | "development" | "other";
    description?: string;
  }>;

  // Verification status
  verification?: {
    is_verified: boolean;
    verification_date?: string;
    verified_by?: string;
    verification_type?: "email" | "phone" | "document";
  };

  // Settings
  settings?: {
    email_notifications: boolean;
    candidate_updates: boolean;
    newsletter: boolean;
    privacy_settings: "public" | "private" | "limited";
  };

  // Metadata
  id?: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

// Form data for API submission
export interface EmployerOnboardingFormData {
  logo?: any;
  registration_document?: any;

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

  departments?: Array<{
    name: string;
    manager?: string;
    employee_count?: number;
    description?: string;
    location?: string;
  }>;

  locations?: Array<{
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

  hiring_preferences?: Array<{
    job_type: string;
    location_type: string;
    experience_level: string;
    department?: string;
    description?: string;
  }>;

  social_links?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    github?: string;
  };

  benefits?: Array<{
    name: string;
    category: "health" | "financial" | "work_life" | "development" | "other";
    description?: string;
  }>;
}
