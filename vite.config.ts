import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  //  allow server to oben in ngrok
 server: { allowedHosts: ["d7b9-156-207-233-26.ngrok-free.app"] }
});
