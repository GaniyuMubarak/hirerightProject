// /**
//  * src/lib/types/auth.ts
//  *
//  * Shared auth types. Import from here — never use Record<string, any>
//  * for user objects. When the backend team changes the user shape,
//  * TypeScript will catch it at compile time.
//  */

// export interface AuthUser {
//   id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   app_role: "candidate" | "employer" | "admin";
//   email_verified_at?: string | null;
//   profile_image_url?: string | null;
//   created_at?: string;
//   updated_at?: string;
// }

// export interface AuthResponse {
//   token: string;
//   refreshToken?: string;
//   user: AuthUser;
//   message?: string;
// }
