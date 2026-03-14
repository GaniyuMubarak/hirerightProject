// import { loginSchema, signupSchema } from "@/lib/validators/auth";
// import type { LoginSchemaType, SignupSchemaType } from "@/lib/validators/auth";
// import { setAuthSession, clearAuthStorage } from "@/lib/auth";
// import { useUser } from "@/providers/user-context";
// import AuthServices from "@/services/auth-services";
// import CompanyServices from "@/services/company-services";
// import FileServices from "@/services/file-services";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useNavigate, useLocation } from "react-router";
// import { toast } from "sonner";
// import useQueryParams from "../use-query-params";

// // ✅ Fix: no re-export of clearAuthStorage from here.
// // All callers must import directly from "@/lib/auth".
// // This file is a hook, not an auth utility.

// const useAuthForm = (page: "sign-up" | "login") => {
//   const { dispatch } = useUser();
//   const navigate = useNavigate();
//   const { queryParams } = useQueryParams();
//   const isSignUp = page === "sign-up";
//   const location = useLocation();

//   const form = useForm({
//     resolver: zodResolver(isSignUp ? signupSchema : loginSchema),
//     defaultValues: isSignUp
//       ? {
//           first_name: "",
//           last_name: "",
//           email: "",
//           password: "",
//           password_confirmation: "",
//           app_role: queryParams?.app_role || "candidate",
//           acceptTerms: false,
//         }
//       : {
//           email: "",
//           password: "",
//           rememberMe: false,
//         },
//   });

//   const onSubmit = async (data: SignupSchemaType | LoginSchemaType) => {
//     try {
//       let payload: any = { ...data };

//       if (isSignUp) {
//         const { acceptTerms, ...signupData } = data as SignupSchemaType;
//         payload = {
//           first_name: signupData.first_name,
//           last_name: signupData.last_name,
//           email: signupData.email,
//           password: signupData.password,
//           password_confirmation: signupData.password_confirmation,
//           app_role: signupData.app_role,
//         };
//       } else {
//         payload = {
//           ...data,
//           app_role: queryParams?.app_role || "candidate",
//         };
//       }

//       const res = isSignUp
//         ? await AuthServices.register(payload)
//         : await AuthServices.login(payload);

//       if (!res?.token) {
//         throw new Error("Invalid credentials");
//       }

//       const rememberMe = !isSignUp && !!(data as LoginSchemaType).rememberMe;

//       // ✅ Single call writes both cookies with matching expiry
//       setAuthSession(res, rememberMe);

//       // ✅ Dispatch separately — setAuthSession has no React context access
//       dispatch({ type: "USER_LOGIN", payload: res });

//       if (isSignUp) {
//         toast.success(
//           "Registration successful! Please check your email for the verification code.",
//         );
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         navigate("/auth/email-verification", {
//           state: { email: (data as SignupSchemaType).email },
//           replace: true,
//         });
//         return;
//       }

//       toast.success("Login successful!");

//       const role = res.user.app_role;

//       if (role === "employer") {
//         try {
//           const company = await CompanyServices.getCompany();
//           navigate(
//             company?.data ? "/employer/dashboard" : "/employer/onboarding",
//           );
//         } catch {
//           navigate("/employer/onboarding");
//         }
//         return;
//       }

//       FileServices.getEntityFile("CandidateResume", res.user.id).catch(
//         () => {},
//       );
//       const from = location.state?.from;
//       navigate(from || "/candidate/dashboard", { replace: true });
//     } catch (err: any) {
//       const status = err.response?.status;
//       const errorData = err.response?.data;

//       if (status === 401) {
//         clearAuthStorage();
//         toast.error("Invalid email or password");
//       } else if (status === 422) {
//         const errors = errorData?.errors || errorData;
//         if (errors && typeof errors === "object") {
//           Object.entries(errors).forEach(([field, messages]) => {
//             form.setError(field as any, {
//               type: "server",
//               message: Array.isArray(messages) ? messages[0] : String(messages),
//             });
//           });
//           toast.error("Please check the form for errors");
//         } else {
//           toast.error(errorData?.message || "Validation failed");
//         }
//       } else if (status === 409) {
//         toast.error("This email is already registered");
//       } else if (status === 403) {
//         if (
//           errorData?.message?.toLowerCase().includes("verify") ||
//           errorData?.requires_verification
//         ) {
//           toast.error("Please verify your email before logging in.");
//           navigate("/auth/email-verification", {
//             state: { email: (data as LoginSchemaType).email },
//           });
//           return;
//         }
//         toast.error("Your account has been suspended. Please contact support.");
//       } else if (err.code === "ECONNABORTED") {
//         toast.error("Request timed out. Please try again.");
//       } else if (err.code === "ERR_NETWORK") {
//         toast.error("Network error. Please check your connection.");
//       } else {
//         toast.error("An error occurred. Please try again.");
//       }

//       throw err;
//     }
//   };

//   return {
//     form,
//     onSubmit,
//     loading: form.formState.isSubmitting,
//   };
// };

// export default useAuthForm;

import { loginSchema, signupSchema } from "@/lib/validators/auth";
import type { LoginSchemaType, SignupSchemaType } from "@/lib/validators/auth";
import { setAuthSession, clearAuthStorage } from "@/lib/auth";
import { useUser } from "@/providers/user-context";
import AuthServices from "@/services/auth-services";
import CompanyServices from "@/services/company-services";
import FileServices from "@/services/file-services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router";
import { toast } from "sonner";
import useQueryParams from "../use-query-params";

const useAuthForm = (page: "sign-up" | "login") => {
  const { dispatch } = useUser();
  const navigate = useNavigate();
  const { queryParams } = useQueryParams();
  const isSignUp = page === "sign-up";
  const location = useLocation();

  const form = useForm({
    resolver: zodResolver(isSignUp ? signupSchema : loginSchema),
    defaultValues: isSignUp
      ? {
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          password_confirmation: "",
          app_role: queryParams?.app_role || "candidate",
          acceptTerms: false,
        }
      : {
          email: "",
          password: "",
          rememberMe: false,
        },
  });

  const onSubmit = async (data: SignupSchemaType | LoginSchemaType) => {
    try {
      let payload: any = { ...data };

      if (isSignUp) {
        const { acceptTerms, ...signupData } = data as SignupSchemaType;
        payload = {
          first_name: signupData.first_name,
          last_name: signupData.last_name,
          email: signupData.email,
          password: signupData.password,
          password_confirmation: signupData.password_confirmation,
          app_role: signupData.app_role,
        };
      } else {
        payload = {
          ...data,
          app_role: queryParams?.app_role || "candidate",
        };
      }

      const res = isSignUp
        ? await AuthServices.register(payload)
        : await AuthServices.login(payload);

      if (!res?.token) {
        throw new Error("Invalid credentials");
      }

      const rememberMe = !isSignUp && !!(data as LoginSchemaType).rememberMe;

      setAuthSession(res, rememberMe);
      dispatch({ type: "USER_LOGIN", payload: res });

      if (isSignUp) {
        toast.success(
          "Registration successful! Please check your email for the verification code.",
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/auth/email-verification", {
          state: { email: (data as SignupSchemaType).email },
          replace: true,
        });
        return;
      }

      toast.success("Login successful!");

      const role = res.user.app_role;

      // ✅ Admin routing — redirect to admin dashboard
      if (role === "admin") {
        navigate("/admin/dashboard", { replace: true });
        return;
      }

      if (role === "employer") {
        try {
          const company = await CompanyServices.getCompany();
          navigate(
            company?.data ? "/employer/dashboard" : "/employer/onboarding",
          );
        } catch {
          navigate("/employer/onboarding");
        }
        return;
      }

      // Candidate
      FileServices.getEntityFile("CandidateResume", res.user.id).catch(
        () => {},
      );
      const from = location.state?.from;
      navigate(from || "/candidate/dashboard", { replace: true });
    } catch (err: any) {
      const status = err.response?.status;
      const errorData = err.response?.data;

      if (status === 401) {
        clearAuthStorage();
        toast.error("Invalid email or password");
      } else if (status === 422) {
        const errors = errorData?.errors || errorData;
        if (errors && typeof errors === "object") {
          Object.entries(errors).forEach(([field, messages]) => {
            form.setError(field as any, {
              type: "server",
              message: Array.isArray(messages) ? messages[0] : String(messages),
            });
          });
          toast.error("Please check the form for errors");
        } else {
          toast.error(errorData?.message || "Validation failed");
        }
      } else if (status === 409) {
        toast.error("This email is already registered");
      } else if (status === 403) {
        if (
          errorData?.message?.toLowerCase().includes("verify") ||
          errorData?.requires_verification
        ) {
          toast.error("Please verify your email before logging in.");
          navigate("/auth/email-verification", {
            state: { email: (data as LoginSchemaType).email },
          });
          return;
        }
        toast.error("Your account has been suspended. Please contact support.");
      } else if (err.code === "ECONNABORTED") {
        toast.error("Request timed out. Please try again.");
      } else if (err.code === "ERR_NETWORK") {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An error occurred. Please try again.");
      }

      throw err;
    }
  };

  return {
    form,
    onSubmit,
    loading: form.formState.isSubmitting,
  };
};

export default useAuthForm;