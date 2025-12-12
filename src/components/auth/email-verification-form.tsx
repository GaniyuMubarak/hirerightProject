// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
//   FormDescription,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import useEmailVerificationForm from "@/hooks/forms/use-email-verification-form";
// import { useCurrentUser } from "@/hooks/use-current-user";
// import { cn } from "@/lib/utils";
// import { Loader, Mail } from "lucide-react";
// import { useState } from "react";

// export function EmailVerificationForm({
//   className,
//   ...props
// }: React.ComponentPropsWithoutRef<"div">) {
//   const { form, onSubmit, resendCode, loading } = useEmailVerificationForm();
//   const user = useCurrentUser();
//   const [resending, setResending] = useState(false);

//   const handleResend = async () => {
//     setResending(true);
//     await resendCode();
//     setResending(false);
//   };

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       {/* Header with icon and email display */}
//       {/* <div className="flex flex-col items-center text-center mb-2">
//         <div className="w-16 h-16 bg-[#68BBE3]/10 rounded-full flex items-center justify-center mb-4">
//           <Mail className="w-8 h-8 text-[#68BBE3]" />
//         </div>
//         <h1 className="text-3xl font-medium text-[#020C10] mb-2">
//           Verify your email
//         </h1>
//         {user?.email && (
//           <p className="text-sm text-[#475467]">
//             We've sent a 6-digit code to{" "}
//             <span className="font-semibold">{user.email}</span>
//           </p>
//         )}
//       </div> */}

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//           <div className="flex flex-col gap-6">
//             <FormField
//               control={form.control}
//               name="otp"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Verification Code</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Enter 6-digit code"
//                       {...field}
//                       maxLength={6}
//                       className="text-center text-lg tracking-widest"
//                       autoComplete="one-time-code"
//                       inputMode="numeric"
//                       pattern="[0-9]*"
//                     />
//                   </FormControl>
//                   <FormDescription>
//                     Enter the 6-digit code sent to your email
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button
//               type="submit"
//               className="w-fit px-12 mx-auto"
//               disabled={loading || form.watch("otp").length !== 6}>
//               {loading ? (
//                 <>
//                   Verifying
//                   <Loader size={14} className="ml-2 animate-spin" />
//                 </>
//               ) : (
//                 "Verify email"
//               )}
//             </Button>
//           </div>
//         </form>
//       </Form>

//       <div className="text-center text-sm text-[#475467] h-auto">
//         Didn't receive the email?{" "}
//         <Button
//           variant="link"
//           onClick={handleResend}
//           disabled={resending}
//           className="font-semibold text-[#EE7B36] px-0 text-sm hover:text-[#d66a2e]">
//           {resending ? (
//             <>
//               Sending
//               <Loader size={12} className="ml-1 animate-spin" />
//             </>
//           ) : (
//             "Click to resend"
//           )}
//         </Button>
//       </div>
//     </div>
//   );
// }






import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useEmailVerificationForm from "@/hooks/forms/use-email-verification-form";
import { cn } from "@/lib/utils";
import { Loader, Mail } from "lucide-react";
import { useState, useEffect } from "react";

export function EmailVerificationForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { form, onSubmit, resendCode, loading, email } =
    useEmailVerificationForm();
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Handle resend with countdown timer
  const handleResend = async () => {
    if (countdown > 0 || !email) return;

    setResending(true);
    try {
      await resendCode();
      // Start 30-second countdown
      setCountdown(30);
    } finally {
      setResending(false);
    }
  };

  // Countdown timer effect
  useEffect(() => {
    if (countdown === 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // Auto-submit when OTP is 6 digits
  useEffect(() => {
    const otp = form.watch("otp");
    if (otp.length === 6 && !loading) {
      form.handleSubmit(onSubmit)();
    }
  }, [form.watch("otp"), loading]);

  // Format OTP input with spaces (XXX XXX)
  const formatOtp = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)}`;
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Header with email display */}
      {/* <div className="text-center mb-2">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Check your email
        </h1>
        <p className="text-gray-600">We sent a verification code to</p>
        {email && (
          <p className="text-sm font-medium text-gray-900 mt-1">{email}</p>
        )}
      </div> */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Enter verification code
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        value={formatOtp(field.value)}
                        onChange={(e) => {
                          const value = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 6);
                          field.onChange(value);
                        }}
                        maxLength={7} // 6 digits + space
                        className="text-center text-2xl font-bold tracking-widest h-12"
                        autoComplete="one-time-code"
                        inputMode="numeric"
                        placeholder="• • • • • •"
                        disabled={loading}
                      />
                      <div className="flex justify-center gap-2 mt-2">
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-full ${
                              field.value.length > i
                                ? "bg-blue-600"
                                : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription className="text-center">
                    Type the 6-digit code we sent to your email
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-11"
              disabled={loading || form.watch("otp").length !== 6}
              size="lg">
              {loading ? (
                <>
                  <Loader size={16} className="mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <div className="text-center space-y-4">
        <div className="text-sm text-gray-600">
          {countdown > 0 ? (
            <p className="text-gray-500">
              Resend code in <span className="font-semibold">{countdown}s</span>
            </p>
          ) : (
            <p>
              Didn't receive the code?{" "}
              <Button
                variant="link"
                onClick={handleResend}
                disabled={resending || !email || countdown > 0}
                className="font-semibold text-orange-500 hover:text-orange-600 px-0 text-sm">
                {resending ? (
                  <>
                    <Loader size={12} className="mr-1 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Resend code"
                )}
              </Button>
            </p>
          )}
        </div>

        {!email && (
          <p className="text-sm text-amber-600 bg-amber-50 p-2 rounded">
            Note: Make sure to check your spam folder if you don't see the email
          </p>
        )}
      </div>
    </div>
  );
}