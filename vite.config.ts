import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  
  base: '/GS180745_Sagar_Borana/',
  plugins: [react(), tailwindcss()],
});
