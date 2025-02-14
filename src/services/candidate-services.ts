import requests from "./https-services";

const CandidateServices = {
  dashboard: async () => {
    return requests.get(`/employers/dashboard`);
  },
};

export default CandidateServices;
