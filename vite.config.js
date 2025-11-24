import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // list the module names from the Vercel log here
      // only externalize modules that MUST NOT be bundled (server-only)
      external: [
        // examples — replace/add the exact module name(s) from the Vercel build log:
        "firebase-admin",
        "fs",
        "path",
        "os"
      ]
    }
  }
});
