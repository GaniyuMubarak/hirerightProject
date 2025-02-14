import * as z from "zod";

export const loginSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean().optional(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export type SignupSchemaType = z.infer<typeof signupSchema>;

export const resetPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

export const newPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export type NewPasswordSchemaType = z.infer<typeof newPasswordSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

export const emailVerificationSchema = z.object({
  otp: z.string().min(6),
});

export type EmailVerificationSchemaType = z.infer<
  typeof emailVerificationSchema
>;
