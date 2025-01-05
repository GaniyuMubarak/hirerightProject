import { EmailVerificationForm } from "@/components/auth/email-verification-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router";

export default function EmailVerification() {
  return (
    <div className="min-h-svh p-6 md:p-10 flex flex-col">
      <div className="flex justify-center gap-2 md:justify-start">
        <a
          href="#"
          className="flex items-center gap-2 text-[#AFAEAD] text-[22px] font-semibold"
        >
          <img src="/logo.svg" alt="Logo" className="size-8" />
          Logo
        </a>
      </div>
      <div className="flex-1 flex  flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-center gap-5 mt-2">
            <h1 className="text-4xl font-medium">Check your email.</h1>
            <p className="text-base text-[#475467]">
              We sent a verification link to johndoe@gmail.com
            </p>
          </div>
          <EmailVerificationForm />

          <Link
            to="/sign-up"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full text-[#475467] text-sm h-auto"
            )}
          >
            <ArrowLeftIcon className="size-4" /> Back to log in
          </Link>
        </div>
      </div>
    </div>
  );
}
