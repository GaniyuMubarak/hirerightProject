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
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

// ─── Rate limit config ────────────────────────────────────────────────────────
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

interface LockoutEntry {
  attempts: number;
  lockedUntil: number | null;
}

// Module-level — persists across renders, resets on full page refresh.
// Backend must enforce this too; this is a UX guard only.
const loginAttemptMap = new Map<string, LockoutEntry>();

function getLockoutEntry(email: string): LockoutEntry {
  const key = email.toLowerCase().trim();
  if (!loginAttemptMap.has(key)) {
    loginAttemptMap.set(key, { attempts: 0, lockedUntil: null });
  }
  return loginAttemptMap.get(key)!;
}

function recordFailedAttempt(email: string): LockoutEntry {
  const key = email.toLowerCase().trim();
  const entry = getLockoutEntry(email);
  entry.attempts += 1;
  if (entry.attempts >= MAX_ATTEMPTS) {
    entry.lockedUntil = Date.now() + LOCKOUT_MS;
  }
  loginAttemptMap.set(key, entry);
  return entry;
}

function clearAttempts(email: string) {
  loginAttemptMap.delete(email.toLowerCase().trim());
}

function isLockedOut(email: string): { locked: boolean; secondsLeft: number } {
  const entry = getLockoutEntry(email);
  if (!entry.lockedUntil) return { locked: false, secondsLeft: 0 };
  const now = Date.now();
  if (now >= entry.lockedUntil) {
    clearAttempts(email);
    return { locked: false, secondsLeft: 0 };
  }
  return {
    locked: true,
    secondsLeft: Math.ceil((entry.lockedUntil - now) / 1000),
  };
}
// ─────────────────────────────────────────────────────────────────────────────

export function SignInForm({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { form, onSubmit } = useAuthForm("login");
  const [showPassword, setShowPassword] = useState(false);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Tick the lockout countdown
  function startLockoutTimer(email: string) {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const { locked, secondsLeft } = isLockedOut(email);
      setLockoutSeconds(secondsLeft);
      if (!locked) clearInterval(timerRef.current!);
    }, 1000);
  }

  useEffect(() => () => clearInterval(timerRef.current!), []);

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  // async function handleSubmit(data: any) {
  //   const { locked, secondsLeft } = isLockedOut(data.email);
  //   if (locked) {
  //     setLockoutSeconds(secondsLeft);
  //     toast.error(
  //       `Too many failed attempts. Try again in ${formatTime(secondsLeft)}.`,
  //     );
  //     return;
  //   }

  //   try {
  //     await onSubmit(data);
  //     // Clear attempts on successful login
  //     clearAttempts(data.email);
  //   }
  //   catch (error: any) {
  //     const entry = recordFailedAttempt(data.email);
  //     const remaining = MAX_ATTEMPTS - entry.attempts;

  //     if (entry.lockedUntil) {
  //       const { secondsLeft } = isLockedOut(data.email);
  //       setLockoutSeconds(secondsLeft);
  //       startLockoutTimer(data.email);
  //       toast.error(
  //         `Account temporarily locked. Try again in ${formatTime(secondsLeft)}.`,
  //       );
  //     } else {
  //       toast.error(
  //         `Invalid credentials. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining before lockout.`,
  //       );
  //     }
  //   }
  // }
  async function handleSubmit(data: any) {
    const { locked, secondsLeft } = isLockedOut(data.email);
    if (locked) {
      setLockoutSeconds(secondsLeft);
      toast.error(
        `Too many failed attempts. Try again in ${formatTime(secondsLeft)}.`,
      );
      return;
    }

    try {
      await onSubmit(data);
      clearAttempts(data.email);
    } catch (error: any) {
      const status = error?.response?.status;

      if (status === 404) {
        toast.error("No account found with that email address.");
        return;
      }

      const entry = recordFailedAttempt(data.email);
      const remaining = MAX_ATTEMPTS - entry.attempts;

      if (entry.lockedUntil) {
        const { secondsLeft } = isLockedOut(data.email);
        setLockoutSeconds(secondsLeft);
        startLockoutTimer(data.email);
        toast.error(
          `Account temporarily locked. Try again in ${formatTime(secondsLeft)}.`,
        );
      } else {
        toast.error(
          `Invalid credentials. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining before lockout.`,
        );
      }
    }
  }

  const isLocked = lockoutSeconds > 0;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        {...props}
        className="space-y-8">
        <div className="flex flex-col gap-2 text-left">
          <h1 className="text-3xl font-medium text-[#020C10]">Sign In</h1>
          <p className="text-balance text-base text-[#475467]">
            Welcome to Hire Right! Please enter your details.
          </p>
        </div>

        <div className="mt-8 pb-4 space-y-5">
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
                      className="absolute right-3 top-1/2 -translate-y-1/2">
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
              className="text-[#EE7B36] text-sm font-medium">
              Forgot password?
            </Link>
          </div>

          {/* Lockout warning */}
          {isLocked && (
            <p className="text-sm text-destructive text-center">
              Too many failed attempts. Try again in{" "}
              <span className="font-semibold tabular-nums">
                {formatTime(lockoutSeconds)}
              </span>
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting || isLocked}>
            {isLocked ? (
              `Locked · ${formatTime(lockoutSeconds)}`
            ) : form.formState.isSubmitting ? (
              <>
                Signing in <Loader size={14} className="ml-2 animate-spin" />
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </div>

        <div className="text-center text-sm text-[#475467]">
          Don't have an account?{" "}
          <Link to="/account-type" className="font-semibold text-[#68BBE3]">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}