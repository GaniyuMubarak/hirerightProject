import { loginSchema, signupSchema } from "@/lib/validators/auth";
import type { LoginSchemaType, SignupSchemaType } from "@/lib/validators/auth";
import { useUser } from "@/providers/user-context";
import AuthServices from "@/services/auth-services";
import CompanyServices from "@/services/company-services";
import FileServices from "@/services/file-services";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router";
import { toast } from "sonner";
import useQueryParams from "../use-query-params";

const useAuthForm = (page: "sign-up" | "login") => {
  const { dispatch } = useUser();
  const navigate = useNavigate();
  const { queryParams } = useQueryParams();
  const isSignUp = page === "sign-up";
  const location = useLocation(); // ✅ add this

  const form = useForm({
    resolver: zodResolver(isSignUp ? signupSchema : loginSchema),
    defaultValues: isSignUp
      ? {
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          password_confirmation: "",
          // app_role: "candidate",
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
        console.log("📦 Signup payload:", payload);
      } else {
        payload = {
          ...data,
          app_role: queryParams?.app_role || "candidate",
        };
        console.log("📦 Login payload:", payload);
      }
      // else {
      //   const app_role = queryParams?.app_role;
      //   if (!app_role) {
      //     toast.error("Please select your account type before signing in.");
      //     navigate("/account-type");
      //     return;
      //   }
      //   payload = { ...data, app_role };
      //   console.log("📦 Login payload:", payload);
      // }

      // Step 1: Auth request
      const res = isSignUp
        ? await AuthServices.register(payload)
        : await AuthServices.login(payload);

      if (!res?.token) {
        throw new Error("Invalid credentials");
      }

      // Step 2: Store auth data
      const cookieExpiry = (data as LoginSchemaType).rememberMe ? 30 : 0.5;
      localStorage.setItem("token", res.token);
      dispatch({ type: "USER_LOGIN", payload: res });
      Cookies.set("HRuserInfo", JSON.stringify(res), { expires: cookieExpiry });

      // Step 3: Handle navigation based on action type
      if (isSignUp) {
        const signupEmail = (data as SignupSchemaType).email;

        // SIGNUP FLOW: Always go to email verification
        console.log("📧 Redirecting to email verification for:", signupEmail);
        toast.success(
          "Registration successful! Please check your email for the verification code.",
        );

        // Backend automatically sends the OTP on registration
        // Wait a moment to ensure the email is sent
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // ✅ Navigate to email verification with email in state
        navigate("/auth/email-verification", {
          state: { email: signupEmail },
          replace: true,
        });
        return;
      }

      // LOGIN FLOW: Success notification
      toast.success("Login successful!");

      // Step 4: Login flow - navigate based on role
      const role = res.user.app_role;

      if (role === "employer") {
        try {
          const company = await CompanyServices.getCompany();
          if (!company?.data) {
            navigate("/employer/onboarding");
          } else {
            navigate("/employer/dashboard");
          }
        } catch (error) {
          // If company fetch fails, assume no company and go to onboarding
          console.log("No company found, redirecting to onboarding");
          navigate("/employer/onboarding");
        }
        return;
      }

      // Candidate flow
      FileServices.getEntityFile("CandidateResume", res.user.id).catch(() => {
        // Silently handle - resume check is non-blocking
      });
      // navigate(`/candidate/dashboard`);
      const from = location.state?.from;
      navigate(from || "/candidate/dashboard", { replace: true });
    } catch (err: any) {
      console.error("❌ Auth error:", err);

      const status = err.response?.status;
      const errorData = err.response?.data;

      if (status === 422) {
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
      } else if (status === 401) {
        toast.error("Invalid email or password");
      } else if (status === 409) {
        toast.error("This email is already registered");
      } else if (status === 403) {
        // Check if this is an unverified email error
        if (
          errorData?.message?.toLowerCase().includes("verify") ||
          errorData?.requires_verification
        ) {
          toast.error("Please verify your email before logging in.");

          // ✅ Redirect to verification page with email
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
        toast.error(
          errorData?.message || "An error occurred. Please try again.",
        );
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