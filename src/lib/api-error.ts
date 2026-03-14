const SAFE_STATUSES = [400, 409, 422];

const STATUS_MESSAGES: Record<number, string> = {
  401: "Your session has expired. Please sign in again.",
  403: "You don't have permission to perform this action.",
  404: "The requested resource was not found.",
  429: "Too many requests. Please wait a moment and try again.",
  503: "Service temporarily unavailable. Please try again later.",
};

const GENERIC_FALLBACK = "Something went wrong. Please try again.";

export function getApiErrorMessage(
  err: any,
  fallback: string = GENERIC_FALLBACK,
): string {
  const status: number | undefined = err?.response?.status;
  const backendMessage: string | undefined = err?.response?.data?.message;

  if (err?.code === "ERR_NETWORK") {
    return "Network error. Please check your connection.";
  }
  if (err?.code === "ECONNABORTED") {
    return "Request timed out. Please try again.";
  }

  if (!status) return fallback;

  if (SAFE_STATUSES.includes(status) && backendMessage) {
    return backendMessage;
  }

  if (STATUS_MESSAGES[status]) {
    return STATUS_MESSAGES[status];
  }

  return fallback;
}

export function getFieldErrors(err: any): Record<string, string> {
  const status = err?.response?.status;
  const errors = err?.response?.data?.errors;

  if (status !== 422 || !errors || typeof errors !== "object") return {};

  return Object.entries(errors).reduce(
    (acc, [field, messages]) => {
      acc[field] = Array.isArray(messages) ? messages[0] : String(messages);
      return acc;
    },
    {} as Record<string, string>,
  );
}
