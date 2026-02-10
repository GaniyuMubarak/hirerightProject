import requests from "./https-services";

const CompanyServices = {
  getEmployerTests: async () => {
    const response = await fetch("/api/employer/tests", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch employer tests");
    }

    return response.json();
  },

  getTestById: async (testId: string) => {
    const response = await fetch(`/api/tests/${testId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch test");
    }

    return response.json();
  },

  getCompany: async () => {
    return requests.get("/employers/company");
  },
  createCompany: async (body: any) => {
    return requests.post("/employers/company", body);
  },
  dashboard: async () => {
    return requests.get(`/employers/dashboard`);
  },
  getStaffs: async () => {
    return requests.get("/employers/company/staffs");
  },
  getJobApplications: async (jobId: string) => {
    return requests.get(`/employers/jobs/${jobId}/applications`);
  },
};

export default CompanyServices;
