import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://movie-full-stack-backend.onrender.com",
      "/uploads": "https://movie-full-stack-backend.onrender.com",
    },
  },
});
