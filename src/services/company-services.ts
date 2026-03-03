// import requests from "./https-services";

// const CompanyServices = {
//   getEmployerTests: async () => {
//     const response = await fetch("/api/employer/tests", {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch employer tests");
//     }

//     return response.json();
//   },

//   getTestById: async (testId: string) => {
//     const response = await fetch(`/api/tests/${testId}`, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch test");
//     }

//     return response.json();
//   },

//   getCompany: async () => {
//     return requests.get("/employers/company");
//   },
//   createCompany: async (body: any) => {
//     return requests.post("/employers/company", body);
//   },
//   dashboard: async () => {
//     return requests.get(`/employers/dashboard`);
//   },
//   getStaffs: async () => {
//     return requests.get("/employers/company/staffs");
//   },
//   getJobApplications: async (jobId: string) => {
//     return requests.get(`/employers/jobs/${jobId}/applications`);
//   },
//   getCandidateById: async (id: string) => {
//     return requests.get(`/employers/candidates/${id}`);
//   },
// };

// export default CompanyServices;

// import requests from "./https-services";

// const CompanyServices = {
//   // ── Company ────────────────────────────────────────────────────────────────
//   getCompany: async () => {
//     return requests.get("/employers/company");
//   },
//   createCompany: async (body: any) => {
//     return requests.post("/employers/company", body);
//   },

//   // ── Dashboard ──────────────────────────────────────────────────────────────
//   dashboard: async () => {
//     return requests.get("/employers/dashboard");
//   },

//   // ── Staff ──────────────────────────────────────────────────────────────────
//   getStaffs: async () => {
//     return requests.get("/employers/company/staffs");
//   },

//   // ── Candidates ─────────────────────────────────────────────────────────────
//   getEmployerCandidates: async () => {
//     // Response: { message, candidates: { current_page, data: [...], total, per_page } }
//     return requests.get("/employers/candidates");
//   },
//   getCandidateById: async (id: string) => {
//     // Response: { message, candidate: { id, first_name, last_name, email, phone, bio,
//     //   title, address, resume, profile_image, cover_image, linkedin_url, twitter_url,
//     //   applications: [{ id, job, status, applied_at, test_results }] } }
//     return requests.get(`/employers/candidates/${id}`);
//   },
//   getCandidateResume: async (id: string) => {
//     // Response: { message, resume: { filename, file_url, uploaded_at } }
//     return requests.get(`/employers/candidates/${id}/resume`);
//   },

//   // ── Applications ───────────────────────────────────────────────────────────
//   getApplications: async ({
//     status,
//     job_id,
//   }: {
//     status?: string;
//     job_id?: string;
//   } = {}) => {
//     // Response: { status, data: { current_page, data: [...], total, per_page } }
//     const queries = new URLSearchParams({
//       ...(status && { status }),
//       ...(job_id && { job_id }),
//     });
//     return requests.get(`/employers/applications?${queries.toString()}`);
//   },
//   getApplicationById: async (id: string) => {
//     // Response: { status, data: { id, candidate, job, status, applied_at,
//     //   test_assigned, test_result: { score, passed, completed_at } } }
//     return requests.get(`/employers/applications/${id}`);
//   },
//   updateApplicationStatus: async (
//     id: string,
//     body: {
//       status: "pending" | "shortlisted" | "interview" | "hired" | "rejected";
//       notes?: string;
//     },
//   ) => {
//     // Response: { message, application: { id, status, updated_at } }
//     return requests.put(`/employers/applications/${id}/status`, body);
//   },

//   // ── Job Applications ───────────────────────────────────────────────────────
//   getJobApplications: async (jobId: string) => {
//     // Response: { status, data: [{ id, candidate, status, applied_at }] }
//     return requests.get(`/employers/jobs/${jobId}/applications`);
//   },
// };

// export default CompanyServices;

import requests from "./https-services";

const CompanyServices = {
  // ── Company ────────────────────────────────────────────────────────────────
  getCompany: async () => {
    return requests.get("/employers/company");
  },
  createCompany: async (body: any) => {
    return requests.post("/employers/company", body);
  },
  updateCompany: async (body: any) => {
    return requests.put("/employers/company", body);
  },

  // ── Dashboard ──────────────────────────────────────────────────────────────
  dashboard: async () => {
    return requests.get("/employers/dashboard");
  },

  // ── Staff ──────────────────────────────────────────────────────────────────
  getStaffs: async () => {
    return requests.get("/employers/company/staffs");
  },

  // ── Jobs ───────────────────────────────────────────────────────────────────
  getJobs: async () => {
    return requests.get("/employers/jobs");
  },
  getJobById: async (id: string) => {
    return requests.get(`/employers/jobs/${id}`);
  },
  createJob: async (body: any) => {
    return requests.post("/employers/jobs", body);
  },
  updateJob: async (id: string, body: any) => {
    return requests.put(`/employers/jobs/${id}`, body);
  },
  deleteJob: async (id: string) => {
    return requests.delete(`/employers/jobs/${id}`);
  },
  updateJobStatus: async (id: string, status: string) => {
    return requests.put(`/employers/jobs/${id}/status`, { status });
  },

  // ── Candidates ─────────────────────────────────────────────────────────────
  getEmployerCandidates: async () => {
    // Response: { message, candidates: { current_page, data: [{ id, first_name,
    //   last_name, email, phone, bio, title, job_applications }], total, per_page } }
    return requests.get("/employers/candidates");
  },
  getCandidateById: async (id: string) => {
    // Response: { message, candidate: { id, first_name, last_name, email, phone,
    //   bio, title, address, resume, profile_image, cover_image, linkedin_url,
    //   twitter_url, applications: [{ id, job, status, applied_at, test_results }] } }
    return requests.get(`/employers/candidates/${id}`);
  },
  getCandidateResume: async (id: string) => {
    // Response: { message, resume: { filename, file_url, uploaded_at } }
    return requests.get(`/employers/candidates/${id}/resume`);
  },

  // ── Applications ───────────────────────────────────────────────────────────
  getApplications: async ({
    status,
    job_id,
  }: { status?: string; job_id?: string } = {}) => {
    // Response: { status, data: { current_page, data: [{ id, candidate: { id,
    //   first_name, last_name, email, phone, title, profile_image }, job, status,
    //   applied_at, updated_at }], total, per_page } }
    const queries = new URLSearchParams({
      ...(status && { status }),
      ...(job_id && { job_id }),
    });
    return requests.get(`/employers/applications?${queries.toString()}`);
  },
  updateApplicationStatus: async (
    id: string,
    body: {
      status: "pending" | "shortlisted" | "interview" | "hired" | "rejected";
      notes?: string;
      rejection_reason?: string;
    },
  ) => {
    return requests.put(`/employers/applications/${id}/status`, body);
  },
  bulkUpdateApplicationStatus: async (body: {
    application_ids: number[];
    status: string;
    notes?: string;
    rejection_reason?: string;
  }) => {
    return requests.post("/employers/applications/bulk-update", body);
  },

  // ── Job Applications ───────────────────────────────────────────────────────
  getJobApplications: async (jobId: string) => {
    // Response: { status, data: [{ id, candidate: { id, first_name, last_name,
    //   title }, status, applied_at }] }
    return requests.get(`/employers/jobs/${jobId}/applications`);
  },

  // ── Tests ─────────────────────────────────────────────────────────────────
  getTests: async () => {
    return requests.get("/employers/tests");
  },
  createTest: async (body: any) => {
    return requests.post("/employers/tests", body);
  },
  assignTest: async (testId: string, job_application_id: number) => {
    return requests.post(`/employers/tests/${testId}/assign`, {
      job_application_id,
    });
  },
  getTestSubmissions: async (testId: string) => {
    return requests.get(`/employers/tests/${testId}/submissions`);
  },
};

export default CompanyServices;