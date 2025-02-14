import { EmailVerificationSchemaType } from "@/lib/validators/auth";
import requests from "./https-services";

const ProfileServices = {
  getProfile: async (body: any) => {
    return requests.post("/candidates/profile", body);
  },

  updateProfile: async (body: any) => {
    return requests.put(`/profile`, body);
  },

  verifyEmail: async (body: EmailVerificationSchemaType) => {
    return requests.post(`/auth/login`, body);
  },

  forgetPassword: async (body: any) => {
    return requests.put("/auth/forget-password", body);
  },

  resetPassword: async (body: any) => {
    return requests.put("/auth/reset-password", body);
  },
};

export default ProfileServices;
