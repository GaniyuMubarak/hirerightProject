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