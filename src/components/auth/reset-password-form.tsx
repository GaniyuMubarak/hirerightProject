// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// import AuthServices from "@/services/auth-services";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { EyeIcon, EyeOffIcon } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router";
// import { toast } from "sonner";
// import { z } from "zod";

// const OTP_EXPIRY_SECONDS = 10 * 60;

// const FormSchema = z
//   .object({
//     otp: z.string().min(1, { message: "OTP is required" }),
//     password: z
//       .string()
//       .min(8, { message: "Password must be at least 8 characters" }),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// interface ResetPasswordFormProps extends React.ComponentPropsWithoutRef<"div"> {
//   email: string;
// }

// export function ResetPasswordForm({
//   email,
//   className,
//   ...props
// }: ResetPasswordFormProps) {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [secondsLeft, setSecondsLeft] = useState(OTP_EXPIRY_SECONDS);
//   const [isResending, setIsResending] = useState(false);
//   const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   function startTimer() {
//     if (intervalRef.current) clearInterval(intervalRef.current);
//     intervalRef.current = setInterval(() => {
//       setSecondsLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(intervalRef.current!);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   }

//   useEffect(() => {
//     startTimer();
//     return () => clearInterval(intervalRef.current!);
//   }, []);

//   function formatTime(seconds: number) {
//     const m = Math.floor(seconds / 60)
//       .toString()
//       .padStart(2, "0");
//     const s = (seconds % 60).toString().padStart(2, "0");
//     return `${m}:${s}`;
//   }

//   async function handleResend() {
//     setIsResending(true);
//     try {
//       const result = await AuthServices.requestPasswordReset(email);
//       toast.success(result.message ?? "A new OTP has been sent to your email.");
//       form.resetField("otp");
//       setSecondsLeft(OTP_EXPIRY_SECONDS);
//       startTimer();
//     } catch (error: any) {
//       const message =
//         error?.response?.data?.message ??
//         error?.message ??
//         "Failed to resend OTP. Please try again.";
//       toast.error(message);
//     } finally {
//       setIsResending(false);
//     }
//   }

//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: { otp: "", password: "", confirmPassword: "" },
//   });

//   async function onSubmit(data: z.infer<typeof FormSchema>) {
//     if (secondsLeft === 0) {
//       toast.error("OTP has expired. Please request a new one.");
//       return;
//     }
//     try {
//       const result = await AuthServices.resetPassword({
//         email,
//         otp: data.otp,
//         password: data.password,
//         password_confirmation: data.confirmPassword,
//       } as any);
//       toast.success(result.message ?? "Password reset successfully!");
//       navigate("/sign-in");
//     } catch (error: any) {
//       const message =
//         error?.response?.data?.message ??
//         error?.message ??
//         "Something went wrong. Please try again.";
//       toast.error(message);
//     }
//   }

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//           <div className="flex flex-col gap-8">
//             {/* OTP */}
//             <FormField
//               control={form.control}
//               name="otp"
//               render={({ field }) => (
//                 <FormItem>
//                   <div className="flex items-center justify-between">
//                     <FormLabel>Reset code</FormLabel>
//                     {secondsLeft > 0 ? (
//                       <span className="text-xs text-muted-foreground tabular-nums">
//                         Expires in{" "}
//                         <span
//                           className={cn(
//                             "font-medium",
//                             secondsLeft <= 60 && "text-destructive",
//                           )}>
//                           {formatTime(secondsLeft)}
//                         </span>
//                       </span>
//                     ) : (
//                       <button
//                         type="button"
//                         onClick={handleResend}
//                         disabled={isResending}
//                         className="text-xs font-medium text-primary hover:underline disabled:opacity-50">
//                         {isResending ? "Sending..." : "Resend code"}
//                       </button>
//                     )}
//                   </div>
//                   <FormControl>
//                     <Input
//                       placeholder="Enter the code from your email"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* New password */}
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>New password</FormLabel>
//                   <FormControl>
//                     <div className="relative">
//                       <Input
//                         type={showPassword ? "text" : "password"}
//                         placeholder="Enter new password"
//                         {...field}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword((prev) => !prev)}
//                         className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
//                         {showPassword ? (
//                           <EyeOffIcon className="size-4" />
//                         ) : (
//                           <EyeIcon className="size-4" />
//                         )}
//                       </button>
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Confirm password */}
//             <FormField
//               control={form.control}
//               name="confirmPassword"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Confirm password</FormLabel>
//                   <FormControl>
//                     <div className="relative">
//                       <Input
//                         type={showConfirm ? "text" : "password"}
//                         placeholder="Confirm new password"
//                         {...field}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowConfirm((prev) => !prev)}
//                         className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
//                         {showConfirm ? (
//                           <EyeOffIcon className="size-4" />
//                         ) : (
//                           <EyeIcon className="size-4" />
//                         )}
//                       </button>
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button
//               type="submit"
//               className="w-fit px-12 mx-auto"
//               disabled={form.formState.isSubmitting || secondsLeft === 0}>
//               {form.formState.isSubmitting
//                 ? "Resetting..."
//                 : "Set new password"}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import AuthServices from "@/services/auth-services";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const OTP_EXPIRY_SECONDS = 10 * 60; // 10 minutes

// Shared rate limit map — same instance as forgot-password-form if bundled together,
// but works independently too since it's keyed by email.
const MAX_REQUESTS = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();

function checkRateLimit(email: string): {
  allowed: boolean;
  minutesLeft?: number;
} {
  const now = Date.now();
  const key = email.toLowerCase().trim();
  const entry = rateLimitMap.get(key);

  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    rateLimitMap.set(key, { count: 1, windowStart: now });
    return { allowed: true };
  }

  if (entry.count >= MAX_REQUESTS) {
    const msLeft = WINDOW_MS - (now - entry.windowStart);
    const minutesLeft = Math.ceil(msLeft / 1000 / 60);
    return { allowed: false, minutesLeft };
  }

  entry.count += 1;
  return { allowed: true };
}

const FormSchema = z
  .object({
    otp: z.string().min(1, { message: "OTP is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

interface ResetPasswordFormProps extends React.ComponentPropsWithoutRef<"div"> {
  email: string;
}

export function ResetPasswordForm({
  email,
  className,
  ...props
}: ResetPasswordFormProps) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(OTP_EXPIRY_SECONDS);
  const [isResending, setIsResending] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startTimer() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current!);
  }, []);

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  async function handleResend() {
    const { allowed, minutesLeft } = checkRateLimit(email);

    if (!allowed) {
      toast.error(
        `Too many requests. Please try again in ${minutesLeft} minute${minutesLeft === 1 ? "" : "s"}.`,
      );
      return;
    }

    setIsResending(true);
    try {
      const result = await AuthServices.requestPasswordReset(email);
      toast.success(result.message ?? "A new OTP has been sent to your email.");
      form.resetField("otp");
      setSecondsLeft(OTP_EXPIRY_SECONDS);
      startTimer();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Failed to resend OTP. Please try again.";
      toast.error(message);
    } finally {
      setIsResending(false);
    }
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { otp: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (secondsLeft === 0) {
      toast.error("OTP has expired. Please request a new one.");
      return;
    }
    try {
      const result = await AuthServices.resetPassword({
        email,
        otp: data.otp,
        password: data.password,
        password_confirmation: data.confirmPassword,
      } as any);
      toast.success(result.message ?? "Password reset successfully!");
      navigate("/sign-in");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Something went wrong. Please try again.";
      toast.error(message);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-8">
            {/* OTP */}
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Reset code</FormLabel>
                    {secondsLeft > 0 ? (
                      <span className="text-xs text-muted-foreground tabular-nums">
                        Expires in{" "}
                        <span
                          className={cn(
                            "font-medium",
                            secondsLeft <= 60 && "text-destructive",
                          )}>
                          {formatTime(secondsLeft)}
                        </span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResend}
                        disabled={isResending}
                        className="text-xs font-medium text-primary hover:underline disabled:opacity-50">
                        {isResending ? "Sending..." : "Resend code"}
                      </button>
                    )}
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Enter the code from your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* New password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {showPassword ? (
                          <EyeOffIcon className="size-4" />
                        ) : (
                          <EyeIcon className="size-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Confirm new password"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {showConfirm ? (
                          <EyeOffIcon className="size-4" />
                        ) : (
                          <EyeIcon className="size-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-fit px-12 mx-auto"
              disabled={form.formState.isSubmitting || secondsLeft === 0}>
              {form.formState.isSubmitting
                ? "Resetting..."
                : "Set new password"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}