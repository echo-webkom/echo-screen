import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), cloudflare()],
  define: {
    "import.meta.env.VITE_COMMIT_SHA": JSON.stringify(
      process.env.WORKERS_CI_COMMIT_SHA || "development"
    )
  }
});
