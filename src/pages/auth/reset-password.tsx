import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import { Link, Navigate, useLocation } from "react-router";

export default function ResetPassword() {
  const location = useLocation();
  const email = location.state?.email as string | undefined;

  // If someone lands here directly without an email, send them back
  if (!email) {
    return <Navigate to="/forgot-password" replace />;
  }

  return (
    <div className="min-h-svh p-6 md:p-10 flex flex-col">
      <div className="flex justify-center gap-2 md:justify-start">
        {/* <Link
          to="/"
          className="flex items-center gap-2 text-[#AFAEAD] text-[22px] font-semibold"> */}
          <img
            src="/App logo.png"
            alt="Logo"
            className="h-12 w-auto object-contain"
          />
        {/* </Link> */}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-center gap-5 mt-2">
            <h1 className="text-4xl font-medium">Set new password</h1>
            <p className="text-base text-[#475467] text-center">
              Enter the reset code sent to{" "}
              <span className="font-medium text-foreground">{email}</span> and
              choose a new password.
            </p>
          </div>

          <ResetPasswordForm email={email} />

          <Link
            to="/forgot-password"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full text-[#475467] text-sm h-auto",
            )}>
            <ArrowLeftIcon className="size-4" /> Back
          </Link>
        </div>
      </div>
    </div>
  );
}
