import {
  emailVerificationSchema,
  EmailVerificationSchemaType,
} from "@/lib/validators/auth";
import { useUser } from "@/providers/user-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useCurrentUser } from "../use-current-user";

const useEmailVerificationForm = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useUser();
  const user = useCurrentUser();
  const navigate = useNavigate();

  const form = useForm<EmailVerificationSchemaType>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: EmailVerificationSchemaType) => {
    setLoading(true);

    //move
    if (user.app_role === "employer") {
      navigate("/employer/onboarding");
      return;
    }
    navigate("/candidate/onboarding");

    // try {
    //   const res = await AuthServices.verifyEmail(data);
    //   toast.success("Login Success!");
    //   dispatch({ type: "USER_LOGIN", payload: res });
    //   Cookies.set("userInfo", JSON.stringify(res));
    // } catch (err: any) {
    //   toast.error(err?.response?.data?.message || "An error occurred");
    // } finally {
    //   setLoading(false);
    // }
  };

  return {
    form,
    onSubmit,
    loading,
  };
};

export default useEmailVerificationForm;
