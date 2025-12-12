// import * as z from "zod";

// export const loginSchema = z.object({
//   first_name: z.string().optional(),
//   last_name: z.string().optional(),
//   email: z
//     .string({ message: "Email is required" })
//     .email({ message: "Invalid email address" }),
//   password: z
//     .string({ message: "Password is required" })
//     .min(8, { message: "Password must be at least 8 characters" }),
//   rememberMe: z.boolean().optional(),
// });

// export type LoginSchemaType = z.infer<typeof loginSchema>;

// // export const signupSchema = z.object({
// //   email: z.string().email({
// //     message: "Email is required",
// //   }),
// //   password: z.string().min(6, {
// //     message: "Minimum 6 characters required",
// //   }),
// //   name: z.string().min(1, {
// //     message: "Name is required",
// //   }),
// // });


// // export type SignupSchemaType = z.infer<typeof signupSchema>;

// export const resetPasswordSchema = z.object({
//   email: z.string().email({
//     message: "Email is required",
//   }),
// });

// export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

// export const newPasswordSchema = z.object({
//   password: z.string().min(6, {
//     message: "Minimum of 6 characters required",
//   }),
// });

// export type NewPasswordSchemaType = z.infer<typeof newPasswordSchema>;

// export const forgotPasswordSchema = z.object({
//   email: z.string().email({
//     message: "Email is required",
//   }),
// });

// export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

// export const emailVerificationSchema = z.object({
//   otp: z.string().min(6),
// });

// export type EmailVerificationSchemaType = z.infer<
//   typeof emailVerificationSchema
//   >;


// export const signupSchema = z
//   .object({
//     first_name: z.string().min(1, {
//       message: "First name is required",
//     }),
//     last_name: z.string().min(1, {
//       message: "Last name is required",
//     }),
//     email: z.string().email({
//       message: "Email is required",
//     }),
//     password: z.string().min(6, {
//       message: "Minimum 6 characters required",
//     }),
//     password_confirmation: z.string().min(6, {
//       message: "Password confirmation is required",
//     }),
//     app_role: z.enum(["candidate", "employer"], {
//       message: "Please select a role",
//     }),
//   })
//   .refine((data) => data.password === data.password_confirmation, {
//     message: "Passwords do not match",
//     path: ["password_confirmation"],
//   });

// export type SignupSchemaType = z.infer<typeof signupSchema>;






import * as z from "zod";

// Login Schema
export const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

// Signup/Register Schema with enhanced password validation
export const signupSchema = z
  .object({
    first_name: z.string().min(2, {
      message: "First name must be at least 2 characters",
    }),
    last_name: z.string().min(2, {
      message: "Last name must be at least 2 characters",
    }),
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      }),
    password_confirmation: z.string().min(1, {
      message: "Password confirmation is required",
    }),
    app_role: z.enum(["candidate", "employer"], {
      required_error: "Please select a role",
    }),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type SignupSchemaType = z.infer<typeof signupSchema>;

// Alias for consistency
export const registerSchema = signupSchema;
export type RegisterSchemaType = SignupSchemaType;

// Email Verification Schema
export const emailVerificationSchema = z.object({
  otp: z.string().min(6, { message: "OTP must be 6 characters" }).max(6),
});

export type EmailVerificationSchemaType = z.infer<
  typeof emailVerificationSchema
>;

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

// Alias for consistency
export const forgetPasswordSchema = forgotPasswordSchema;
export type ForgetPasswordSchemaType = ForgotPasswordSchemaType;

// Reset Password Schema
export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, { message: "Reset token is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

// New Password Schema (for simple password input without confirmation)
export const newPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    }),
});

export type NewPasswordSchemaType = z.infer<typeof newPasswordSchema>;

// Change Password Schema (for authenticated users)
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: "Current password is required",
    }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;