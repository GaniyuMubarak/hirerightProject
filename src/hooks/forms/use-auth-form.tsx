// import { loginSchema, signupSchema } from "@/lib/validators/auth";
// import type { LoginSchemaType, SignupSchemaType } from "@/lib/validators/auth";
// import { useUser } from "@/providers/user-context";
// import AuthServices from "@/services/auth-services";
// import CompanyServices from "@/services/company-services";
// import FileServices from "@/services/file-services";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Cookies from "js-cookie";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router";
// import { toast } from "sonner";
// import useQueryParams from "../use-query-params";

// const useAuthForm = (page: "sign-up" | "login") => {
//   const { dispatch } = useUser();
//   const navigate = useNavigate();
//   const { queryParams } = useQueryParams();

//   const isSignUp = page === "sign-up";

//   const form = useForm<SignupSchemaType | LoginSchemaType>({
//     resolver: zodResolver(isSignUp ? signupSchema : loginSchema),
//     defaultValues: isSignUp
//       ? {
//           first_name: "",
//           last_name: "",
//           email: "",
//           password: "",
//           password_confirmation: "",
//           app_role: "candidate",
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
//       // Prepare payload - remove fields not needed by backend
//       let payload: any = { ...data };

//       if (isSignUp) {
//         // Remove acceptTerms from API payload (frontend validation only)
//         const { acceptTerms, ...signupData } = data as SignupSchemaType;

//         // Create a clean payload with only required fields
//         payload = {
//           first_name: signupData.first_name,
//           last_name: signupData.last_name,
//           email: signupData.email,
//           password: signupData.password,
//           password_confirmation: signupData.password_confirmation,
//           app_role: signupData.app_role,
//         };

//         // Debug: Log the payload being sent
//         console.log("📦 Signup payload:", payload);
//       } else {
//         // For login, add app_role from query params if available
//         payload = {
//           ...data,
//           app_role: queryParams?.app_role || "candidate",
//         };

//         // Debug: Log the payload being sent
//         console.log("📦 Login payload:", payload);
//       }

//       // Step 1: Authentication (signup or login)
//       const res = isSignUp
//         ? await AuthServices.register(payload)
//         : await AuthServices.login(payload);

//       if (!res?.token) {
//         throw new Error("Invalid credentials");
//       }

//       // Step 2: Store auth data
//       const cookieExpiry = (data as LoginSchemaType).rememberMe ? 30 : 0.5; // 30 days or 12 hours

//       dispatch({ type: "USER_LOGIN", payload: res });
//       Cookies.set("HRuserInfo", JSON.stringify(res), { expires: cookieExpiry });

//       // Step 3: Success notification
//       toast.success(
//         isSignUp ? "Registration successful!" : "Login successful!"
//       );

//       // Step 4: Handle post-auth navigation
//       if (isSignUp) {
//         navigate("/email-verification");
//         return;
//       }

//       // Login flow - navigate based on role
//       const role = res.user.app_role;

//       if (role === "employer") {
//         const company = await CompanyServices.getCompany();

//         if (!company?.data) {
//           navigate("/employer/onboarding");
//           return;
//         }

//         navigate("/employer/dashboard");
//         return;
//       }

//       // For candidates, check resume in background (non-blocking)
//       FileServices.getEntityFile("CandidateResume", res.user.id).catch(() => {
//         // Silently handle - don't block navigation
//       });

//       navigate(`/${role}/dashboard`);
//     } catch (err: any) {
//       // Debug: Log the full error
//       console.error("❌ Full error object:", err);
//       console.error("❌ Error response:", err.response);
//       console.error("❌ Error data:", err.response?.data);

//       // Handle different error types
//       const status = err.response?.status;
//       const errorData = err.response?.data;

//       if (status === 422) {
//         // Log validation errors for debugging
//         console.error("🔍 Validation errors (errors key):", errorData?.errors);
//         console.error("🔍 Validation errors (direct):", errorData);

//         // Backend might return errors in different formats
//         const errors = errorData?.errors || errorData;

//         // Validation errors from backend
//         if (errors && typeof errors === "object") {
//           Object.entries(errors).forEach(([field, messages]) => {
//             const errorMessage = Array.isArray(messages)
//               ? messages[0]
//               : String(messages);
//             console.log(`Setting error for ${field}:`, errorMessage);

//             form.setError(field as any, {
//               type: "server",
//               message: errorMessage,
//             });
//           });
//           toast.error("Please check the form for errors");
//         } else {
//           toast.error(errorData?.message || "Validation failed");
//         }
//       } else if (status === 401) {
//         toast.error("Invalid email or password");
//       } else if (status === 409) {
//         toast.error("This email is already registered");
//       } else if (status === 403) {
//         toast.error("Your account has been suspended. Please contact support.");
//       } else if (err.code === "ERR_NETWORK") {
//         toast.error("Network error. Please check your connection.");
//       } else {
//         toast.error(
//           errorData?.message || "An error occurred. Please try again."
//         );
//       }
//     }
//   };

//   return {
//     form,
//     onSubmit,
//     loading: form.formState.isSubmitting,
//   };
// };

// export default useAuthForm;







// import { loginSchema, signupSchema } from "@/lib/validators/auth";
// import type { LoginSchemaType, SignupSchemaType } from "@/lib/validators/auth";
// import { useUser } from "@/providers/user-context";
// import AuthServices from "@/services/auth-services";
// import CompanyServices from "@/services/company-services";
// import FileServices from "@/services/file-services";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Cookies from "js-cookie";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router";
// import { toast } from "sonner";
// import useQueryParams from "../use-query-params";

// const useAuthForm = (page: "sign-up" | "login") => {
//   const { dispatch } = useUser();
//   const navigate = useNavigate();
//   const { queryParams } = useQueryParams();

//   const isSignUp = page === "sign-up";

//   const form = useForm<SignupSchemaType | LoginSchemaType>({
//     resolver: zodResolver(isSignUp ? signupSchema : loginSchema),
//     defaultValues: isSignUp
//       ? {
//           first_name: "",
//           last_name: "",
//           email: "",
//           password: "",
//           password_confirmation: "",
//           app_role: "candidate",
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
//       // Prepare payload - remove fields not needed by backend
//       let payload: any = { ...data };

//       if (isSignUp) {
//         // Remove acceptTerms from API payload (frontend validation only)
//         const { acceptTerms, ...signupData } = data as SignupSchemaType;

//         // Create a clean payload with only required fields
//         payload = {
//           first_name: signupData.first_name,
//           last_name: signupData.last_name,
//           email: signupData.email,
//           password: signupData.password,
//           password_confirmation: signupData.password_confirmation,
//           app_role: signupData.app_role,
//         };

//         // Debug: Log the payload being sent
//         console.log("📦 Signup payload:", payload);
//       } else {
//         // For login, add app_role from query params if available
//         payload = {
//           ...data,
//           app_role: queryParams?.app_role || "candidate",
//         };

//         // Debug: Log the payload being sent
//         console.log("📦 Login payload:", payload);
//       }

//       // Step 1: Authentication (signup or login)
//       const res = isSignUp
//         ? await AuthServices.register(payload)
//         : await AuthServices.login(payload);

//       if (!res?.token) {
//         throw new Error("Invalid credentials");
//       }

//       // Step 2: Store auth data
//       const cookieExpiry = (data as LoginSchemaType).rememberMe ? 30 : 0.5; // 30 days or 12 hours

//       dispatch({ type: "USER_LOGIN", payload: res });
//       Cookies.set("HRuserInfo", JSON.stringify(res), { expires: cookieExpiry });

//       // Step 3: Success notification
//       toast.success(
//         isSignUp ? "Registration successful!" : "Login successful!"
//       );

//       // Step 4: Handle post-auth navigation
//       if (isSignUp) {
//         navigate("/email-verification");
//         return;
//       }

//       // Login flow - navigate based on role
//       const role = res.user.app_role;

//       if (role === "employer") {
//         const company = await CompanyServices.getCompany();

//         if (!company?.data) {
//           navigate("/employer/onboarding");
//           return;
//         }

//         navigate("/employer/dashboard");
//         return;
//       }

//       // For candidates, check resume in background (non-blocking)
//       FileServices.getEntityFile("CandidateResume", res.user.id).catch(() => {
//         // Silently handle - don't block navigation
//       });

//       navigate(`/${role}/dashboard`);
//     } catch (err: any) {
//       // Debug: Log the full error
//       console.error("❌ Full error object:", err);
//       console.error("❌ Error response:", err.response);
//       console.error("❌ Error data:", err.response?.data);

//       // Handle different error types
//       const status = err.response?.status;
//       const errorData = err.response?.data;

//       if (status === 422) {
//         // Log validation errors for debugging
//         console.error("🔍 Validation errors (errors key):", errorData?.errors);
//         console.error("🔍 Validation errors (direct):", errorData);

//         // Log the actual error messages
//         if (errorData?.email) {
//           console.error("📧 Email error:", errorData.email);
//         }

//         // Backend might return errors in different formats
//         const errors = errorData?.errors || errorData;

//         // Validation errors from backend
//         if (errors && typeof errors === "object") {
//           Object.entries(errors).forEach(([field, messages]) => {
//             const errorMessage = Array.isArray(messages)
//               ? messages[0]
//               : String(messages);
//             console.log(`Setting error for ${field}:`, errorMessage);

//             form.setError(field as any, {
//               type: "server",
//               message: errorMessage,
//             });
//           });
//           toast.error("Please check the form for errors");
//         } else {
//           toast.error(errorData?.message || "Validation failed");
//         }
//       } else if (status === 401) {
//         toast.error("Invalid email or password");
//       } else if (status === 409) {
//         toast.error("This email is already registered");
//       } else if (status === 403) {
//         toast.error("Your account has been suspended. Please contact support.");
//       } else if (err.code === "ECONNABORTED") {
//         toast.error(
//           "Request timed out. The server is taking too long to respond. Please try again."
//         );
//       } else if (err.code === "ERR_NETWORK") {
//         toast.error("Network error. Please check your connection.");
//       } else {
//         toast.error(
//           errorData?.message || "An error occurred. Please try again."
//         );
//       }
//     }
//   };

//   return {
//     form,
//     onSubmit,
//     loading: form.formState.isSubmitting,
//   };
// };

import { loginSchema, signupSchema } from "@/lib/validators/auth";
import type { LoginSchemaType, SignupSchemaType } from "@/lib/validators/auth";
import { useUser } from "@/providers/user-context";
import AuthServices from "@/services/auth-services";
import CompanyServices from "@/services/company-services";
import FileServices from "@/services/file-services";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import useQueryParams from "../use-query-params";

const useAuthForm = (page: "sign-up" | "login") => {
  const { dispatch } = useUser();
  const navigate = useNavigate();
  const { queryParams } = useQueryParams();

  const isSignUp = page === "sign-up";

  const form = useForm<SignupSchemaType | LoginSchemaType>({
    resolver: zodResolver(isSignUp ? signupSchema : loginSchema),
    defaultValues: isSignUp
      ? {
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          password_confirmation: "",
          app_role: "candidate",
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
      // Prepare payload - remove fields not needed by backend
      let payload: any = { ...data };

      if (isSignUp) {
        // Remove acceptTerms from API payload (frontend validation only)
        const { acceptTerms, ...signupData } = data as SignupSchemaType;

        // Create a clean payload with only required fields
        payload = {
          first_name: signupData.first_name,
          last_name: signupData.last_name,
          email: signupData.email,
          password: signupData.password,
          password_confirmation: signupData.password_confirmation,
          app_role: signupData.app_role,
        };

        // Debug: Log the payload being sent
        console.log("📦 Signup payload:", payload);
      } else {
        // For login, add app_role from query params if available
        payload = {
          ...data,
          app_role: queryParams?.app_role || "candidate",
        };

        // Debug: Log the payload being sent
        console.log("📦 Login payload:", payload);
      }

      // Step 1: Authentication (signup or login)
      const res = isSignUp
        ? await AuthServices.register(payload)
        : await AuthServices.login(payload);

      if (!res?.token) {
        throw new Error("Invalid credentials");
      }

      // Step 2: Store auth data
      const cookieExpiry = (data as LoginSchemaType).rememberMe ? 30 : 0.5; // 30 days or 12 hours

      // ✅ SAVE TOKEN TO LOCALSTORAGE
      localStorage.setItem('token', res.token);
      console.log('✅ Token saved to localStorage:', res.token);

      dispatch({ type: "USER_LOGIN", payload: res });
      Cookies.set("HRuserInfo", JSON.stringify(res), { expires: cookieExpiry });

      // Step 3: Success notification
      toast.success(
        isSignUp ? "Registration successful!" : "Login successful!"
      );

      // Step 4: Handle post-auth navigation
      if (isSignUp) {
        // Check if email is already verified (auto-verified by backend)
        if (res.user?.email_verified || res.user?.email_verified_at) {
          // Email already verified - go directly to onboarding
          console.log("✅ Email auto-verified, redirecting to onboarding");
          toast.success("Please complete your profile to continue.");
          
          const role = res.user.app_role;
          
          if (role === 'candidate') {
            navigate('/candidate/onboarding');
          } else if (role === 'employer') {
            navigate('/employer/onboarding');
          } else {
            navigate('/dashboard');
          }
          return;
        } else {
          // Email not verified - go to verification page
          console.log("⏳ Email needs verification");
          navigate("/email-verification");
          return;
        }
      }

      // Login flow - navigate based on role
      const role = res.user.app_role;

      if (role === "employer") {
        const company = await CompanyServices.getCompany();

        if (!company?.data) {
          navigate("/employer/onboarding");
          return;
        }

        navigate("/employer/dashboard");
        return;
      }

      // For candidates, check resume in background (non-blocking)
      FileServices.getEntityFile("CandidateResume", res.user.id).catch(() => {
        // Silently handle - don't block navigation
      });

      navigate(`/${role}/dashboard`);
    } catch (err: any) {
      // Debug: Log the full error
      console.error("❌ Full error object:", err);
      console.error("❌ Error response:", err.response);
      console.error("❌ Error data:", err.response?.data);

      // Handle different error types
      const status = err.response?.status;
      const errorData = err.response?.data;

      if (status === 422) {
        // Log validation errors for debugging
        console.error("🔍 Validation errors (errors key):", errorData?.errors);
        console.error("🔍 Validation errors (direct):", errorData);

        // Log the actual error messages
        if (errorData?.email) {
          console.error("📧 Email error:", errorData.email);
        }

        // Backend might return errors in different formats
        const errors = errorData?.errors || errorData;

        // Validation errors from backend
        if (errors && typeof errors === "object") {
          Object.entries(errors).forEach(([field, messages]) => {
            const errorMessage = Array.isArray(messages)
              ? messages[0]
              : String(messages);
            console.log(`Setting error for ${field}:`, errorMessage);

            form.setError(field as any, {
              type: "server",
              message: errorMessage,
            });
          });
          toast.error("Please check the form for errors");
        } else {
          toast.error(errorData?.message || "Validation failed");
        }
      } else if (status === 401) {
        toast.error("Invalid email or password");
      } else if (status === 409) {
        toast.error("This email is already registered");
      } else if (status === 403) {
        toast.error("Your account has been suspended. Please contact support.");
      } else if (err.code === "ECONNABORTED") {
        toast.error(
          "Request timed out. The server is taking too long to respond. Please try again."
        );
      } else if (err.code === "ERR_NETWORK") {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error(
          errorData?.message || "An error occurred. Please try again."
        );
      }
    }
  };

  return {
    form,
    onSubmit,
    loading: form.formState.isSubmitting,
  };
};

export default useAuthForm;