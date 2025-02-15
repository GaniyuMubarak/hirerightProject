import { loginSchema, LoginSchemaType } from "@/lib/validators/auth";
import { useUser } from "@/providers/user-context";
import AuthServices from "@/services/auth-services";
import CompanyServices from "@/services/company-services";
import FileServices from "@/services/file-services";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import useQueryParams from "../use-query-params";

const useAuthForm = (page: "sign-up" | "login") => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useUser();
  const navigate = useNavigate();
  const { queryParams } = useQueryParams();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    setLoading(true);
    const cookieTimeOut = 0.5;

    try {
      const payload = {
        ...data,
        app_role: queryParams?.app_role,
        password_confirmation: data.password,
      };
      let res;

      if (page === "sign-up") {
        res = await AuthServices.register(payload);
      } else {
        res = await AuthServices.login(payload);
      }

      if (!res?.token) throw new Error("Invalid credentials");

      toast.success("Login Success!");
      dispatch({ type: "USER_LOGIN", payload: res });
      Cookies.set("HRuserInfo", JSON.stringify(res), {
        expires: cookieTimeOut,
      });

      if (page === "sign-up") {
        navigate("/email-verification");
        return;
      }

      // if (!res?.user?.email_verified) {
      //   navigate("/email-verification");
      //   return;
      // }

      const appRole = res?.user?.app_role;

      // check if employer has a company of redirect to onboarding
      if (appRole === "employer") {
        const company = await CompanyServices.getCompany();
        if (!company?.data) {
          navigate("/employer/onboarding");
          return;
        }
      }

      //check if user has resume or redirect to onboaring
      const resume = await FileServices.getEntityFile(
        "CandidateResume",
        res?.user?.id
      );

      if (!resume) return navigate(`/${appRole}/dashboard`);

      navigate(`/${appRole}/dashboard`);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    onSubmit,
    loading,
  };
};

export default useAuthForm;
