import App from "@/App.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";
import "@/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <App />
  </StrictMode>
);



// Previous version with Sentry integration. Kept for reference but currently disabled to avoid potential issues during development. Sentry can be re-enabled once the app is stable and ready for production monitoring.
// import App from "@/App.tsx";
// import { Toaster } from "@/components/ui/sonner.tsx";
// import "@/index.css";
// import { initSentry } from "@/lib/sentry";
// import * as Sentry from "@sentry/react";
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";

// // ✅ Must be called before React renders
// initSentry();

// const SentryApp = Sentry.withErrorBoundary(App, {
//   fallback: (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="text-center max-w-md mx-auto p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-2">
//           Something went wrong
//         </h3>
//         <p className="text-gray-600 mb-6">
//           An unexpected error occurred. Please refresh the page.
//         </p>
//         <button
//           onClick={() => window.location.reload()}
//           className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600">
//           Refresh Page
//         </button>
//       </div>
//     </div>
//   ),
// });

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <Toaster />
//     <SentryApp />
//   </StrictMode>,
// );