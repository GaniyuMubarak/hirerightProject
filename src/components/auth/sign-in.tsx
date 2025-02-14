import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useAuthForm from "@/hooks/forms/use-auth-form";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

export function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { form, onSubmit } = useAuthForm("login");
  const [showPassword, setShowPassword] = useState(false);
  // const user = useCurrentUser();
  // if (user) {
  //   return <Navigate to={`/${user?.app_role}/dashboard`} />;
  // }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
        className="space-y-8"
      >
        <div className="flex flex-col gap-2 text-left">
          <h1 className="text-3xl font-medium text-[#020C10]">Sign In</h1>
          <p className="text-balance text-base text-[#475467] ">
            Welcome to Hire Right! Please enter your details.
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
                  <div className="relative">
                    <Input
                      placeholder="********"
                      {...field}
                      type={showPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
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

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            Sign in
            {form.formState.isSubmitting && (
              <Loader size={14} className="ml-2 animate-spin" />
            )}
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
