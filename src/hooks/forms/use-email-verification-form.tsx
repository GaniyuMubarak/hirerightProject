// import React from "react";
// import {
//   emailVerificationSchema,
//   EmailVerificationSchemaType,
// } from "@/lib/validators/auth";
// import { useUser } from "@/providers/user-context";
// import AuthServices from "@/services/auth-services";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Cookies from "js-cookie";
// import { useForm } from "react-hook-form";
// import { useLocation, useNavigate } from "react-router";
// import { toast } from "sonner";
// import { useCurrentUser } from "../use-current-user";

// const useEmailVerificationForm = () => {
//   const { dispatch } = useUser();
//   const user = useCurrentUser();
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Get email from location state or current user
//   const emailFromState = location.state?.email;
//   const email = emailFromState || user?.email;

//   const form = useForm<EmailVerificationSchemaType>({
//     resolver: zodResolver(emailVerificationSchema),
//     defaultValues: {
//       otp: "",
//     },
//   });

//   const onSubmit = async (data: EmailVerificationSchemaType) => {
//     try {
//       if (!email) {
//         toast.error("Email not found. Please try again.");
//         return;
//       }

//       console.log("🔐 Verifying OTP for email:", email);

//       // ✅ CORRECT ENDPOINT: Use validateEmailOtp instead of verifyEmail
//       const res = await AuthServices.validateEmailOtp(email, data.otp);

//       console.log("✅ OTP verification successful:", res);

//       toast.success("Email verified successfully!");

//       // Update user state with verified status
//       if (res?.user) {
//         const updatedUserInfo = {
//           ...user,
//           ...res.user,
//           email_verified: true,
//           email_verified_at: new Date().toISOString(),
//         };

//         dispatch({
//           type: "USER_LOGIN",
//           payload: { ...res, user: updatedUserInfo },
//         });

//         // Update cookie with verified status
//         const currentCookie = Cookies.get("HRuserInfo");
//         if (currentCookie) {
//           const cookieData = JSON.parse(currentCookie);
//           Cookies.set(
//             "HRuserInfo",
//             JSON.stringify({
//               ...cookieData,
//               user: updatedUserInfo,
//             }),
//             { expires: 0.5 }
//           );
//         }
//       }

//       // Navigate based on user role
//       const role = res?.user?.app_role || user?.app_role;

//       if (role === "employer") {
//         navigate("/employer/onboarding");
//       } else {
//         navigate("/candidate/onboarding");
//       }
//     } catch (err: any) {
//       console.error("❌ OTP verification error:", {
//         status: err.response?.status,
//         data: err.response?.data,
//         message: err.response?.data?.message,
//       });

//       const status = err.response?.status;
//       const errorData = err.response?.data;

//       if (status === 422) {
//         // Handle validation errors
//         if (errorData?.errors) {
//           Object.entries(errorData.errors).forEach(([field, messages]) => {
//             form.setError(field as any, {
//               type: "server",
//               message: Array.isArray(messages) ? messages[0] : String(messages),
//             });
//           });
//           toast.error("Invalid verification code");
//         } else {
//           toast.error(errorData?.message || "Invalid verification code");
//         }
//       } else if (status === 400) {
//         toast.error("Invalid or expired verification code");
//       } else if (status === 404) {
//         toast.error("User not found");
//       } else if (status === 410) {
//         toast.error("Verification code has expired. Please request a new one.");
//       } else if (status === 429) {
//         toast.error("Too many attempts. Please wait before trying again.");
//       } else {
//         toast.error(
//           errorData?.message || "An error occurred. Please try again."
//         );
//       }
//     }
//   };

//   const resendCode = async () => {
//     if (!email) {
//       toast.error("Email not found");
//       return;
//     }

//     try {
//       console.log("📤 Resending OTP to:", email);
//       // ✅ Use the correct endpoint: resendOtp
//       await AuthServices.resendOtp(email);
//       toast.success("Verification code sent! Check your email.");
//     } catch (err: any) {
//       console.error("❌ Resend OTP error:", err.response?.data);

//       const errorData = err.response?.data;

//       if (err.response?.status === 429) {
//         toast.error(
//           "Too many requests. Please wait a moment before trying again."
//         );
//       } else {
//         toast.error(
//           errorData?.message || "Failed to resend code. Please try again."
//         );
//       }
//     }
//   };

//   return {
//     form,
//     onSubmit,
//     resendCode,
//     loading: form.formState.isSubmitting,
//     email,
//   };
// };

// export default useEmailVerificationForm;







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

  // Get email from location state or current user
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

      // ✅ CHECK: Token should already exist from registration
      const existingToken = localStorage.getItem("token");
      console.log(
        "Token before verification:",
        existingToken ? "EXISTS" : "MISSING"
      );

      // Verify OTP
      const res = await AuthServices.validateEmailOtp(email, data.otp);

      console.log("✅ OTP verification successful:", res);

      // ✅ CRITICAL: Preserve or update token
      // If backend returns a new token, use it. Otherwise keep existing one.
      if (res?.token) {
        localStorage.setItem("token", res.token);
        console.log("Token updated from verification response");
      } else if (!existingToken) {
        // This shouldn't happen, but handle it
        console.error("⚠️ WARNING: No token after verification!");
        toast.error("Session error. Please register again.");
        navigate("/auth/register");
        return;
      } else {
        console.log("Token preserved from registration");
      }

      // Verify token is still there
      const tokenAfterVerification = localStorage.getItem("token");
      console.log(
        "Token after verification:",
        tokenAfterVerification ? "EXISTS" : "MISSING"
      );

      toast.success("Email verified successfully!");

      // Update user state with verified status
      if (res?.user) {
        const updatedUserInfo = {
          ...user,
          ...res.user,
          email_verified: true,
          email_verified_at: new Date().toISOString(),
        };

        dispatch({
          type: "USER_LOGIN",
          payload: {
            token: tokenAfterVerification, // Include token in payload
            ...res,
            user: updatedUserInfo,
          },
        });

        // Update cookie with verified status
        const currentCookie = Cookies.get("HRuserInfo");
        if (currentCookie) {
          const cookieData = JSON.parse(currentCookie);
          Cookies.set(
            "HRuserInfo",
            JSON.stringify({
              ...cookieData,
              token: tokenAfterVerification, // Include token in cookie
              user: updatedUserInfo,
            }),
            { expires: 0.5 }
          );
        }
      }

      // Navigate based on user role
      const role = res?.user?.app_role || user?.app_role;

      console.log("Navigating to onboarding. Role:", role);

      if (role === "employer") {
        navigate("/employer/onboarding");
      } else {
        navigate("/candidate/onboarding");
      }
    } catch (err: any) {
      console.error("❌ OTP verification error:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.response?.data?.message,
      });

      const status = err.response?.status;
      const errorData = err.response?.data;

      if (status === 422) {
        // Handle validation errors
        if (errorData?.errors) {
          Object.entries(errorData.errors).forEach(([field, messages]) => {
            form.setError(field as any, {
              type: "server",
              message: Array.isArray(messages) ? messages[0] : String(messages),
            });
          });
          toast.error("Invalid verification code");
        } else {
          toast.error(errorData?.message || "Invalid verification code");
        }
      } else if (status === 400) {
        toast.error("Invalid or expired verification code");
      } else if (status === 404) {
        toast.error("User not found");
      } else if (status === 410) {
        toast.error("Verification code has expired. Please request a new one.");
      } else if (status === 429) {
        toast.error("Too many attempts. Please wait before trying again.");
      } else {
        toast.error(
          errorData?.message || "An error occurred. Please try again."
        );
      }
    }
  };

  const resendCode = async () => {
    if (!email) {
      toast.error("Email not found");
      return;
    }

    try {
      console.log("📤 Resending OTP to:", email);
      await AuthServices.resendOtp(email);
      toast.success("Verification code sent! Check your email.");
    } catch (err: any) {
      console.error("❌ Resend OTP error:", err.response?.data);

      const errorData = err.response?.data;

      if (err.response?.status === 429) {
        toast.error(
          "Too many requests. Please wait a moment before trying again."
        );
      } else {
        toast.error(
          errorData?.message || "Failed to resend code. Please try again."
        );
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