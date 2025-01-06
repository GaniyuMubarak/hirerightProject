import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

const FormSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean().optional(),
});

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Signup data>>", data);
    navigate("/onboarding");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
        className="space-y-8"
      >
        <div className="flex flex-col gap-2 text-left">
          <h1 className="text-3xl font-medium text-[#020C10]">Sign in</h1>
          <p className="text-balance text-base text-[#475467] ">
            Welcome back! Please enter your details.
          </p>
        </div>
        <div className=" mt-8 pb-4 space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@gmail.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" {...field} type="password" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    Remember for 30 days
                  </FormLabel>
                </FormItem>
              )}
            />

            <Link
              to="/forgot-password"
              className="text-[#EE7B36] text-sm font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </div>

        <div className="text-center text-sm text-[#475467]">
          Don’t have an account?{" "}
          <Link to="/account-type" className="font-semibold text-[#68BBE3]">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
