import {
  EmailVerificationSchemaType,
  LoginSchemaType,
} from "@/lib/validators/auth";
import requests from "./https-services";

const AuthServices = {
  register: async (body: any) => {
    return requests.post("/auth/register", body);
  },

  login: async (body: LoginSchemaType) => {
    return requests.post(`/auth/login`, body);
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

export default AuthServices;
