import requests from "./https-services";

const CandidateJobServices = {
  getAllJobs: async () => {
    return requests.get(`/candidates/jobs`);
  },

  getJob: async (id: string) => {
    return requests.get(`/candidates/jobs/${id}`);
  },
};

export default CandidateJobServices;
