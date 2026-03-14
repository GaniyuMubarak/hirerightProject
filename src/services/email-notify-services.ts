import requests from "@/services/https-services";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SendResult = { success: true } | { success: false; error: string };

export interface OTPPayload {
  email: string;
  type?: "email";
}

export interface ApplicationStatusPayload {
  applicationId: number;
  status: "shortlisted" | "rejected" | "hired" | "under_review";
}

// ─── Notification Senders ─────────────────────────────────────────────────────

/**
 * Sends / resends OTP verification email
 * POST /auth/resend-otp
 */
export async function sendOTPEmail(payload: OTPPayload): Promise<SendResult> {
  try {
    await requests.post("/auth/resend-otp", {
      type: payload.type ?? "email",
      email: payload.email,
    });
    return { success: true };
  } catch (error: any) {
    const message =
      error?.response?.data?.message ?? "Failed to send OTP email";
    console.error("[email-notify] sendOTPEmail failed:", message);
    return { success: false, error: message };
  }
}

/**
 * Updates application status — backend notifies the candidate
 * PUT /employers/applications/:id/status
 * Auth token is attached automatically by the axios interceptor
 */
export async function sendApplicationStatusUpdate(
  payload: ApplicationStatusPayload,
): Promise<SendResult> {
  try {
    await requests.put(
      `/employers/applications/${payload.applicationId}/status`,
      {
        status: payload.status,
      },
    );
    return { success: true };
  } catch (error: any) {
    const message =
      error?.response?.data?.message ?? "Failed to update application status";
    console.error(
      "[email-notify] sendApplicationStatusUpdate failed:",
      message,
    );
    return { success: false, error: message };
  }
}
