import {
  // EmailVerificationSchemaType,
  LoginSchemaType,
  RegisterSchemaType,
  ForgetPasswordSchemaType,
  ResetPasswordSchemaType,
} from "@/lib/validators/auth";
import requests from "./https-services";

export interface AuthResponse {
  token?: string;
  user?: any;
  message?: string;
  requires_verification?: boolean;
}

export interface VerifyEmailResponse {
  token: string;
  user: any;
  message?: string;
}

export interface EmailOtpPayload {
  email: string;
  otp: string;
}

const AuthServices = {
  register: async (body: RegisterSchemaType): Promise<AuthResponse> => {
    return requests.post("/auth/register", body);
  },

  login: async (body: LoginSchemaType): Promise<AuthResponse> => {
    return requests.post("/auth/login", body);
  },

  verifyEmailOTP: async (data: {
    email: string;
    otp: string;
  }): Promise<VerifyEmailResponse> => {
    const result = await requests.post("/auth/validate/email-otp", data);
    if (result.token) {
      localStorage.setItem("token", result.token);
      if (result.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
      }
    }
    return result;
  },

  validateEmailOtp: async (
    email: string,
    otp: string,
  ): Promise<VerifyEmailResponse> => {
    const result = await requests.post("/auth/validate/email-otp", {
      email,
      otp,
    });
    if (result.token) {
      localStorage.setItem("token", result.token);
      if (result.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
      }
    }
    return result;
  },

  resendOTP: async (email: string): Promise<{ message: string }> => {
    return requests.post("/auth/resend-otp", { type: "email", email });
  },

  resendVerificationEmail: async (
    email: string,
  ): Promise<{ message: string }> => {
    return AuthServices.resendOTP(email);
  },

  resendOtp: async (email: string): Promise<{ message: string }> => {
    return AuthServices.resendOTP(email);
  },

  // ✅ POST — credentials stay in encrypted request body
  forgetPassword: async (
    body: ForgetPasswordSchemaType,
  ): Promise<{ message: string }> => {
    return requests.post("/auth/forget-password", body);
  },

  // ✅ POST — credentials stay in encrypted request body
  resetPassword: async (
    body: ResetPasswordSchemaType,
  ): Promise<{ message: string }> => {
    return requests.post("/auth/reset-password", body);
  },

  logout: async (): Promise<{ message: string }> => {
    return requests.post("/auth/logout");
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    return requests.post("/auth/refresh-token", { refreshToken });
  },

  validatePhoneOtp: async (
    phone: string,
    otp: string,
  ): Promise<VerifyEmailResponse> => {
    return requests.post("/auth/validate/phone-otp", { phone, otp });
  },

  requestPasswordReset: async (email: string): Promise<{ message: string }> => {
    return requests.post("/auth/request-password-reset", { email });
  },
};

export default AuthServices;