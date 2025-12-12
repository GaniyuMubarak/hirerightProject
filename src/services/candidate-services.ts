import requests from "./https-services";

const CandidateServices = {
  dashboard: async () => {
    return requests.get(`/candidates/dashboard`);
  },
  getAllJobs: async ({
    q,
    location,
    type,
    experience_level,
    salary_min,
    salary_max,
    sort_by,
    per_page,
  }: {
    q?: string;
    location?: string;
    type?: string;
    experience_level?: string;
    salary_min?: string;
    salary_max?: string;
    sort_by?: string;
    per_page?: string;
  }) => {
    const queries = new URLSearchParams({
      ...(q && { q }),
      ...(location && { location }),
      ...(type && { type }),
      ...(experience_level && { experience_level }),
      ...(salary_min && { salary_min }),
      ...(salary_max && { salary_max }),
      ...(sort_by && { sort_by }),
      ...(per_page && { per_page }),
    });
    return requests.get(`/candidates/jobs?${queries.toString()}`);
  },

  getJob: async (id: string) => {
    return requests.get(`/candidates/jobs/${id}`);
  },
  getRecommendedJob: async () => {
    return requests.get(`/candidates/jobs/recommended`);
  },
  applyJob: async (id: string, data: any) => {
    return requests.post(`/candidates/jobs/${id}/apply`, data);
  },

  applications: async () => {
    return requests.get(`/candidates/applications`);
  },
  getProfile: async () => {
    return requests.get(`/candidates/profile`);
  },
};

export default CandidateServices;
