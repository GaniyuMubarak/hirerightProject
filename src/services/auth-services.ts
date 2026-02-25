import {
  EmailVerificationSchemaType,
  LoginSchemaType,
  RegisterSchemaType,
  ForgetPasswordSchemaType,
  ResetPasswordSchemaType,
} from "@/lib/validators/auth";
import requests from "./https-services";

// Response types for better type safety
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

// Interface for email OTP validation
export interface EmailOtpPayload {
  email: string;
  otp: string;
}

const AuthServices = {
  /**
   * Register a new user
   * @param body - User registration data
   * @returns Promise with registration response
   */
  register: async (body: RegisterSchemaType): Promise<AuthResponse> => {
    console.log("📤 Registering user:", body);
    return requests.post("/auth/register", body);
  },

  /**
   * Login existing user
   * @param body - Login credentials
   * @returns Promise with authentication response
   */
  login: async (body: LoginSchemaType): Promise<AuthResponse> => {
    console.log("📤 Logging in user:", { email: body.email });
    return requests.post("/auth/login", body);
  },

  /**
   * Verify email with OTP code
   * @param data - Email and OTP
   * @returns Promise with verification response containing token and user
   */
  verifyEmailOTP: async (data: {
    email: string;
    otp: string;
  }): Promise<VerifyEmailResponse> => {
    console.log("📤 Verifying email OTP:", data);
    
    // ✅ requests.post() already returns response.data
    const result = await requests.post("/auth/validate/email-otp", data);
    
    console.log("📥 Verification result:", result);

    // Save token
    if (result.token) {
      localStorage.setItem("token", result.token);
      if (result.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
      }
    }

    return result;
  },

  /**
   * Validate email OTP (alias for verifyEmailOTP)
   * @param email - User email
   * @param otp - OTP code
   * @returns Promise with verification response
   */
  validateEmailOtp: async (
    email: string,
    otp: string,
  ): Promise<VerifyEmailResponse> => {
    console.log("📤 Validating email OTP:", { email, otp });
    
    // ✅ requests.post() already returns response.data
    const result = await requests.post("/auth/validate/email-otp", {
      email,
      otp,
    });

    // Save token
    if (result.token) {
      localStorage.setItem("token", result.token);
      if (result.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
      }
    }

    return result;
  },

  /**
   * Resend OTP verification code
   * @param email - User email
   * @returns Promise with response
   */
  resendOTP: async (
    email: string,
  ): Promise<{ message: string }> => {
    console.log("📤 Resending OTP to:", email);
    
    // ✅ requests.post() already returns response.data
    const result = await requests.post("/auth/resend-otp", {
      type: "email",
      email,
    });
    
    console.log("📥 Resend result:", result);
    
    return result;
  },

  /**
   * Resend verification email (alias for resendOTP)
   * @param email - User email
   * @returns Promise with response
   */
  resendVerificationEmail: async (
    email: string,
  ): Promise<{ message: string }> => {
    console.log("📤 Resending verification email to:", email);
    return AuthServices.resendOTP(email);
  },

  /**
   * Resend OTP (alias for resendOTP)
   * @param email - User email
   * @returns Promise with response
   */
  resendOtp: async (
    email: string,
  ): Promise<{ message: string }> => {
    console.log("📤 Resending OTP to:", email);
    return AuthServices.resendOTP(email);
  },

  /**
   * Request password reset
   * @param body - Forget password data (usually email)
   * @returns Promise with response
   */
  forgetPassword: async (
    body: ForgetPasswordSchemaType,
  ): Promise<{ message: string }> => {
    console.log("📤 Requesting password reset for:", body.email);
    return requests.put("/auth/forget-password", body);
  },

  /**
   * Reset password with token
   * @param body - Reset password data (token + new password)
   * @returns Promise with response
   */
  resetPassword: async (
    body: ResetPasswordSchemaType,
  ): Promise<{ message: string }> => {
    console.log("📤 Resetting password with token");
    return requests.put("/auth/reset-password", body);
  },

  /**
   * Logout current user
   * @returns Promise with logout response
   */
  logout: async (): Promise<{ message: string }> => {
    console.log("📤 Logging out user");
    return requests.post("/auth/logout");
  },

  /**
   * Refresh authentication token
   * @param refreshToken - The refresh token
   * @returns Promise with new tokens
   */
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    console.log("📤 Refreshing token");
    return requests.post("/auth/refresh-token", { refreshToken });
  },

  /**
   * Validate phone OTP (if your app supports phone verification)
   * @param phone - User phone number
   * @param otp - OTP code
   * @returns Promise with verification response
   */
  validatePhoneOtp: async (
    phone: string,
    otp: string,
  ): Promise<VerifyEmailResponse> => {
    console.log("📤 Validating phone OTP:", { phone, otp });
    return requests.post("/auth/validate/phone-otp", { phone, otp });
  },

  /**
   * Request password reset (matches your backend route)
   * @param email - User email
   * @returns Promise with response
   */
  requestPasswordReset: async (
    email: string,
  ): Promise<{ message: string }> => {
    console.log("📤 Requesting password reset for:", email);
    return requests.post("/auth/request-password-reset", { email });
  },
};

export default AuthServices;