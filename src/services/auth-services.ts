// import {
//   // EmailVerificationSchemaType,
//   LoginSchemaType,
//   RegisterSchemaType,
//   ForgetPasswordSchemaType,
//   ResetPasswordSchemaType,
// } from "@/lib/validators/auth";
// import requests from "./https-services";

// export interface AuthResponse {
//   token?: string;
//   user?: any;
//   message?: string;
//   requires_verification?: boolean;
// }

// export interface VerifyEmailResponse {
//   token: string;
//   user: any;
//   message?: string;
// }

// export interface EmailOtpPayload {
//   email: string;
//   otp: string;
// }

// const AuthServices = {
//   register: async (body: RegisterSchemaType): Promise<AuthResponse> => {
//     return requests.post("/auth/register", body);
//   },

//   login: async (body: LoginSchemaType): Promise<AuthResponse> => {
//     return requests.post("/auth/login", body);
//   },

//   verifyEmailOTP: async (data: {
//     email: string;
//     otp: string;
//   }): Promise<VerifyEmailResponse> => {
//     const result = await requests.post("/auth/validate/email-otp", data);
//     if (result.token) {
//       localStorage.setItem("token", result.token);
//       if (result.user) {
//         localStorage.setItem("user", JSON.stringify(result.user));
//       }
//     }
//     return result;
//   },

//   validateEmailOtp: async (
//     email: string,
//     otp: string,
//   ): Promise<VerifyEmailResponse> => {
//     const result = await requests.post("/auth/validate/email-otp", {
//       email,
//       otp,
//     });
//     if (result.token) {
//       localStorage.setItem("token", result.token);
//       if (result.user) {
//         localStorage.setItem("user", JSON.stringify(result.user));
//       }
//     }
//     return result;
//   },

//   resendOTP: async (email: string): Promise<{ message: string }> => {
//     return requests.post("/auth/resend-otp", { type: "email", email });
//   },

//   resendVerificationEmail: async (
//     email: string,
//   ): Promise<{ message: string }> => {
//     return AuthServices.resendOTP(email);
//   },

//   resendOtp: async (email: string): Promise<{ message: string }> => {
//     return AuthServices.resendOTP(email);
//   },

//   // ✅ POST — credentials stay in encrypted request body
//   forgetPassword: async (
//     body: ForgetPasswordSchemaType,
//   ): Promise<{ message: string }> => {
//     return requests.post("/auth/forget-password", body);
//   },

//   // ✅ POST — credentials stay in encrypted request body
//   resetPassword: async (
//     body: ResetPasswordSchemaType,
//   ): Promise<{ message: string }> => {
//     return requests.post("/auth/reset-password", body);
//   },

//   logout: async (): Promise<{ message: string }> => {
//     return requests.post("/auth/logout");
//   },

//   refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
//     return requests.post("/auth/refresh-token", { refreshToken });
//   },

//   validatePhoneOtp: async (
//     phone: string,
//     otp: string,
//   ): Promise<VerifyEmailResponse> => {
//     return requests.post("/auth/validate/phone-otp", { phone, otp });
//   },

//   requestPasswordReset: async (email: string): Promise<{ message: string }> => {
//     return requests.post("/auth/request-password-reset", { email });
//   },
// };

// export default AuthServices;

import {
  LoginSchemaType,
  RegisterSchemaType,
  ForgetPasswordSchemaType,
  ResetPasswordSchemaType,
} from "@/lib/validators/auth";
import requests from "./https-services";
import { setAuthSession } from "@/lib/auth";
import type { AuthResponse as SharedAuthResponse } from "@/lib/types/auth";

// ---------------------------------------------------------------------------
// Local response types
// ---------------------------------------------------------------------------

export interface AuthResponse {
  token?: string;
  refreshToken?: string;
  user?: any;
  message?: string;
  requires_verification?: boolean;
}

export interface VerifyEmailResponse {
  token: string;
  refreshToken?: string;
  user: any;
  message?: string;
}

// ---------------------------------------------------------------------------
// Auth Services
// ---------------------------------------------------------------------------

const AuthServices = {
  register: async (body: RegisterSchemaType): Promise<AuthResponse> => {
    return requests.post("/auth/register", body);
  },

  login: async (body: LoginSchemaType): Promise<AuthResponse> => {
    return requests.post("/auth/login", body);
  },

  // ✅ Fixed: calls setAuthSession so BOTH cookies are written (token +
  // session). Previously only persistAuthTokens was called, which wrote
  // HRuserInfo but not HRsessionInfo — user had a valid token after
  // verification but reloading logged them out because readSessionFromCookie
  // returned null.
  //
  // NOTE: setAuthSession writes cookies only. The calling component must
  // still dispatch({ type: "USER_LOGIN", payload: result }) to update
  // UserContext for the current session.
  verifyEmailOTP: async (data: {
    email: string;
    otp: string;
  }): Promise<VerifyEmailResponse> => {
    const result = await requests.post("/auth/validate/email-otp", data);
    if (result.token && result.user) {
      setAuthSession(result as SharedAuthResponse);
    }
    return result;
  },

  // ✅ Same fix — both cookies written via setAuthSession
  validateEmailOtp: async (
    email: string,
    otp: string,
  ): Promise<VerifyEmailResponse> => {
    const result = await requests.post("/auth/validate/email-otp", {
      email,
      otp,
    });
    if (result.token && result.user) {
      setAuthSession(result as SharedAuthResponse);
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

  forgetPassword: async (
    body: ForgetPasswordSchemaType,
  ): Promise<{ message: string }> => {
    return requests.post("/auth/forget-password", body);
  },

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