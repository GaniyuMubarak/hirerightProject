import requests from "./https-services";

const JobServices = {
  getAllJobs: async () => {
    return requests.get(`/employers/jobs`);
  },

  getJob: async (id: string) => {
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
};

export default JobServices;
