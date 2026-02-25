// import react from "@vitejs/plugin-react";
// import path from "path";
// import { defineConfig } from "vite";

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   server: {
//     proxy: {
//       // Update this to your new API domain
//       "/api": {
//         target: "https://hirerightapp.com", // Replace with your domain
//         changeOrigin: true,
//         secure: false,
//       },
//       "/auth": {
//         target: "https://hirerightapp.com", // Same domain for auth
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// });

// import react from "@vitejs/plugin-react";
// import path from "path";
// import { defineConfig } from "vite";

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   server: {
//     proxy: {
//       "/api": {
//         target: "https://hirerightapp.com",
//         changeOrigin: true,
//         secure: false,
//       },
//       "/auth": {
//         target: "https://hirerightapp.com",
//         changeOrigin: true,
//         secure: false,
//         bypass(req) {
//           if (req.headers.accept?.includes("text/html")) {
//             return req.url;
//           }
//         },
//       },
//     },
//   },
// });

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    historyApiFallback: true, // ✅ add this line
    proxy: {
      "/api": {
        target: "https://hirerightapp.com",
        changeOrigin: true,
        secure: false,
      },
      "/auth": {
        target: "https://hirerightapp.com",
        changeOrigin: true,
        secure: false,
        bypass(req) {
          if (req.headers.accept?.includes("text/html")) {
            return req.url;
          }
        },
      },
    },
  },
});