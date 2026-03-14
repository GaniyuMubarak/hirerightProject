import * as Sentry from "@sentry/react";

export function initSentry() {
  if (!import.meta.env.PROD) return;

  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    tracesSampleRate: 0.1,
    beforeSend(event) {
      if (event.request?.headers) {
        delete event.request.headers["Authorization"];
      }
      return event;
    },
    ignoreErrors: [
      "ResizeObserver loop limit exceeded",
      "Non-Error promise rejection captured",
      "message channel closed",
    ],
  });
}
