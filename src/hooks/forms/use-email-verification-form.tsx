import React from "react";
import {
  emailVerificationSchema,
  EmailVerificationSchemaType,
} from "@/lib/validators/auth";
import { useUser } from "@/providers/user-context";
import AuthServices from "@/services/auth-services";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { useCurrentUser } from "../use-current-user";

const useEmailVerificationForm = () => {
  const { dispatch } = useUser();
  const user = useCurrentUser();
  const location = useLocation();
  const navigate = useNavigate();

  const emailFromState = location.state?.email;
  const email = emailFromState || user?.email;

  const form = useForm<EmailVerificationSchemaType>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      otp: "",
    },
  });
  const onSubmit = async (data: EmailVerificationSchemaType) => {
    try {
      if (!email) {
        toast.error("Email not found. Please try again.");
        return;
      }

      console.log("🔐 Verifying OTP for email:", email);

      const response = await AuthServices.verifyEmailOTP({
        email,
        otp: data.otp,
      });

      console.log("✅ OTP verification response:", response);

      // ✅ Handle "already verified" case
      if (response.message === "Email already verified.") {
        toast.success("Email already verified!");

        // If you have user info in cookies/state, you might want to:
        // 1. Fetch the user data again
        // 2. Or redirect based on stored role

        // Get existing user info from cookies if available
        const existingUserInfo = Cookies.get("HRuserInfo");
        if (existingUserInfo) {
          const parsed = JSON.parse(existingUserInfo);
          const role = parsed.user?.app_role;

          if (role === "employer") {
            navigate("/employer/onboarding");
          } else {
            navigate("/candidate/onboarding");
          }
          return;
        }

        // If no stored user info, you might need to fetch it
        // or redirect to login
        toast.info("Please log in again");
        navigate("/login");
        return;
      }

      // ✅ Check for token and user (for normal verification flow)
      if (!response || !response.token || !response.user) {
        throw new Error("Invalid response from server");
      }

      toast.success("Email verified successfully!");

      // Update state
      const updatedUserInfo = {
        ...response.user,
        email_verified: true,
        email_verified_at: new Date().toISOString(),
      };

      dispatch({
        type: "USER_LOGIN",
        payload: {
          token: response.token,
          user: updatedUserInfo,
        },
      });

      Cookies.set(
        "HRuserInfo",
        JSON.stringify({
          token: response.token,
          user: updatedUserInfo,
        }),
        { expires: 30 },
      );

      // Navigate based on role
      const role = response.user.app_role;

      console.log("✅ Navigating to onboarding. Role:", role);

      if (role === "employer") {
        navigate("/employer/onboarding");
      } else {
        navigate("/candidate/onboarding");
      }
    } catch (err: any) {
      console.error("❌ OTP verification error:", err);

      const status = err.response?.status;
      const errorData = err.response?.data;

      if (status === 422) {
        toast.error(errorData?.message || "Invalid verification code");
      } else if (status === 400 || status === 410) {
        toast.error(errorData?.message || "Invalid or expired code");
      } else if (status === 429) {
        toast.error("Too many attempts. Please wait.");
      } else {
        toast.error(
          errorData?.message || "Verification failed. Please try again.",
        );
      }

      // form.setError("otp", {
      //   type: "manual",
      //   message: "Invalid OTP",
      // });
      form.reset({ otp: "" }); // ← clear field after failure
      form.setError("otp", {
        type: "manual",
        message: "Invalid OTP",
      });
    }
  };

  const resendCode = async () => {
    if (!email) {
      toast.error("Email not found");
      return;
    }

    try {
      console.log("📤 Resending OTP to:", email);
      const response = await AuthServices.resendOTP(email);

      console.log("✅ Resend response:", response);

      toast.success(response.message || "Code sent! Check your email.");
    } catch (err: any) {
      console.error("❌ Resend error:", err);

      const errorData = err.response?.data;

      if (err.response?.status === 429) {
        toast.error("Too many requests. Please wait.");
      } else {
        toast.error(errorData?.message || "Failed to resend code.");
      }
    }
  };

  return {
    form,
    onSubmit,
    resendCode,
    loading: form.formState.isSubmitting,
    email,
  };
};

export default useEmailVerificationForm;