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
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router";
// import { toast } from "sonner";
// import { z } from "zod";

// const FormSchema = z.object({
//   email: z.string().email({ message: "Invalid email address" }),
// });

// export function ForgotPasswordForm({
//   className,
//   ...props
// }: React.ComponentPropsWithoutRef<"div">) {
//   const navigate = useNavigate();

//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       email: "",
//     },
//   });

//   async function onSubmit(data: z.infer<typeof FormSchema>) {
//     try {
//       const result = await AuthServices.requestPasswordReset(data.email);
//       toast.success(result.message ?? "OTP sent! Check your email.");
//       // Pass email to reset-password page via router state
//       navigate("/reset-password", { state: { email: data.email } });
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
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter your email" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button
//               type="submit"
//               className="w-fit px-12 mx-auto"
//               disabled={form.formState.isSubmitting}>
//               {form.formState.isSubmitting ? "Sending..." : "Reset password"}
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
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { getApiErrorMessage } from "@/lib/api-error";

const MAX_REQUESTS = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

// Module-level map — persists across renders, resets on full page refresh.
// Backend is the real enforcer; this is a UX guard only.
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

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { allowed, minutesLeft } = checkRateLimit(data.email);

    if (!allowed) {
      toast.error(
        `Too many requests. Please try again in ${minutesLeft} minute${minutesLeft === 1 ? "" : "s"}.`,
      );
      return;
    }

    try {
      const result = await AuthServices.requestPasswordReset(data.email);
      toast.success(result.message ?? "OTP sent! Check your email.");
      navigate("/reset-password", { state: { email: data.email } });
    } catch (error: any) {
      // const message =
      //   error?.response?.data?.message ??
      //   error?.message ??
      //   "Something went wrong. Please try again.";
      // toast.error(message);
      toast.error(
        getApiErrorMessage(error, "Something went wrong. Please try again."),
      );
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-fit px-12 mx-auto"
              disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Sending..." : "Reset password"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}