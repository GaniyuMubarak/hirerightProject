import requests from "./https-services";

const CompanyServices = {
  getCompany: async () => {
    return requests.get("/employers/company");
  },
  createCompany: async (body: any) => {
    return requests.post("/employers/company", body);
  },

  dashboard: async () => {
    return requests.get(`/employers/dashboard`);
  },
};

export default CompanyServices;
