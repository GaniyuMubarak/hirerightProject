import { useState } from "react";
import { toast } from "sonner";
import requests from "@/services/https-services";
import { getApiErrorMessage } from "@/lib/api-error";

interface SubscribePayload {
  email: string;
  name?: string;
}

export function useNewsletter() {
  const [isLoading, setIsLoading] = useState(false);

  async function subscribe(payload: SubscribePayload): Promise<boolean> {
    setIsLoading(true);

    try {
      await requests.post("/newsletter/subscribe", {
        email: payload.email,
        name: payload.name ?? payload.email.split("@")[0],
      });

      toast.success("You're subscribed!", {
        description: "Check your inbox for a confirmation email.",
      });

      return true;
    } catch (error: any) {
      const status = error?.response?.status;
      const message =
        status === 409
          ? "This email is already subscribed."
          : status === 422
            ? "Please enter a valid email address."
            :
            // (error?.response?.data?.message ??
            //   "Something went wrong. Please try again.");
            getApiErrorMessage(error, "Something went wrong. Please try again.");

      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  return { subscribe, isLoading };
}
