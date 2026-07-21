import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  //  allow server to oben in ngrok
  server: { allowedHosts: ["d7b9-156-207-233-26.ngrok-free.app"] },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@tsparticles")) return "particles";
            if (id.includes("framer-motion")) return "motion";
            if (
              id.includes("react-router") ||
              id.includes("/react/") ||
              id.includes("/react-dom/") ||
              id.includes("scheduler")
            )
              return "react";
          }
        },
      },
    },
  },
});
