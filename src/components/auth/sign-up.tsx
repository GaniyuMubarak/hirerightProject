// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import useAuthForm from "@/hooks/forms/use-auth-form";
// import { Eye, EyeOff, Loader } from "lucide-react";
// import { useState } from "react";
// import { Link } from "react-router";
// import { Checkbox } from "../ui/checkbox";
// import { Input } from "../ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";

// export function SignUpForm({ className, ...props }) {
//   const { form, onSubmit } = useAuthForm("sign-up");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         {...props}
//         className="space-y-8">
//         <div className="flex flex-col gap-2 text-left">
//           <h1 className="text-3xl font-medium text-[#020C10]">Sign up</h1>
//           <p className="text-base text-[#475467]">
//             Welcome to Hire Right! Please enter your details.
//           </p>
//         </div>

//         <div className="mt-8 pb-4 space-y-5">
//           {/* First Name */}
//           <FormField
//             control={form.control}
//             name="first_name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>First Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder="John" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Last Name */}
//           <FormField
//             control={form.control}
//             name="last_name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Last Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Doe" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Email */}
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input placeholder="johndoe@gmail.com" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Password */}
//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <div className="relative">
//                     <Input
//                       placeholder="********"
//                       {...field}
//                       type={showPassword ? "text" : "password"}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2">
//                       {showPassword ? (
//                         <EyeOff className="h-4 w-4 text-gray-500" />
//                       ) : (
//                         <Eye className="h-4 w-4 text-gray-500" />
//                       )}
//                     </button>
//                   </div>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Confirm Password */}
//           <FormField
//             control={form.control}
//             name="password_confirmation"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Confirm Password</FormLabel>
//                 <FormControl>
//                   <div className="relative">
//                     <Input
//                       placeholder="********"
//                       {...field}
//                       type={showConfirm ? "text" : "password"}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowConfirm(!showConfirm)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2">
//                       {showConfirm ? (
//                         <EyeOff className="h-4 w-4 text-gray-500" />
//                       ) : (
//                         <Eye className="h-4 w-4 text-gray-500" />
//                       )}
//                     </button>
//                   </div>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Role Selector */}
//           <FormField
//             control={form.control}
//             name="app_role"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Select Role</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Choose your role" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="candidate">Candidate</SelectItem>
//                     <SelectItem value="employer">Employer</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Remember Me */}
//           <div className="flex justify-between items-center">
//             <FormField
//               control={form.control}
//               name="rememberMe"
//               render={({ field }) => (
//                 <FormItem className="flex flex-row items-center space-x-2 space-y-0">
//                   <FormControl>
//                     <Checkbox
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                     />
//                   </FormControl>
//                   <FormLabel className="text-sm font-normal">
//                     Remember for 30 days
//                   </FormLabel>
//                 </FormItem>
//               )}
//             />

//             <Link
//               to="/forgot-password"
//               className="text-[#EE7B36] text-sm font-medium">
//               Forgot password?
//             </Link>
//           </div>

//           {/* Submit */}
//           <Button
//             type="submit"
//             className="w-full"
//             disabled={form.formState.isSubmitting}>
//             Sign up
//             {form.formState.isSubmitting && (
//               <Loader size={14} className="ml-2 animate-spin" />
//             )}
//           </Button>
//         </div>

//         <div className="text-center text-sm text-[#475467]">
//           Already have an account?{" "}
//           <Link to="/sign-in" className="font-semibold text-[#68BBE3]">
//             Sign in
//           </Link>
//         </div>
//       </form>
//     </Form>
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
import useAuthForm from "@/hooks/forms/use-auth-form";
import { Eye, EyeOff, Loader, Check, X } from "lucide-react";
import { useState, useMemo } from "react";
import { Link } from "react-router";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function SignUpForm({ className, ...props }) {
  const { form, onSubmit } = useAuthForm("sign-up");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Password strength indicator
  const password = form.watch("password") || "";
  const passwordStrength = useMemo(() => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
    };
    const strength = Object.values(checks).filter(Boolean).length;
    return { checks, strength };
  }, [password]);

  return (
    <Form {...form}>
      <div
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
        className="space-y-8">
        <div className="flex flex-col gap-2 text-left">
          <h1 className="text-3xl font-medium text-[#020C10]">Sign up</h1>
          <p className="text-base text-[#475467]">
            Welcome to Hire Right! Please enter your details.
          </p>
        </div>

        <div className="mt-8 pb-4 space-y-5">
          {/* First Name */}
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
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

          {/* Password */}
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
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2">
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </FormControl>

                {/* Password Requirements */}
                {password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      {passwordStrength.checks.length ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <X className="h-3 w-3 text-gray-400" />
                      )}
                      <span
                        className={
                          passwordStrength.checks.length
                            ? "text-green-600"
                            : "text-gray-500"
                        }>
                        At least 8 characters
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      {passwordStrength.checks.uppercase ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <X className="h-3 w-3 text-gray-400" />
                      )}
                      <span
                        className={
                          passwordStrength.checks.uppercase
                            ? "text-green-600"
                            : "text-gray-500"
                        }>
                        One uppercase letter
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      {passwordStrength.checks.lowercase ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <X className="h-3 w-3 text-gray-400" />
                      )}
                      <span
                        className={
                          passwordStrength.checks.lowercase
                            ? "text-green-600"
                            : "text-gray-500"
                        }>
                        One lowercase letter
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      {passwordStrength.checks.number ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <X className="h-3 w-3 text-gray-400" />
                      )}
                      <span
                        className={
                          passwordStrength.checks.number
                            ? "text-green-600"
                            : "text-gray-500"
                        }>
                        One number
                      </span>
                    </div>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="********"
                      {...field}
                      type={showConfirm ? "text" : "password"}
                    />
                    <button
                      type="button"
                      aria-label={
                        showConfirm ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2">
                      {showConfirm ? (
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

          {/* Role Selector */}
          <FormField
            control={form.control}
            name="app_role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="candidate">Candidate</SelectItem>
                    <SelectItem value="employer">Employer</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select whether you're looking for jobs or hiring talent.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Terms & Conditions */}
          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal">
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="text-[#68BBE3] underline hover:text-[#5aa6cc]">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-[#68BBE3] underline hover:text-[#5aa6cc]">
                      Privacy Policy
                    </Link>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            className="w-full"
            disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                Creating account
                <Loader size={14} className="ml-2 animate-spin" />
              </>
            ) : (
              "Sign up"
            )}
          </Button>
        </div>

        <div className="text-center text-sm text-[#475467]">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="font-semibold text-[#68BBE3] hover:text-[#5aa6cc]">
            Sign in
          </Link>
        </div>
      </div>
    </Form>
  );
}