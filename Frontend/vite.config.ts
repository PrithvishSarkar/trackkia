import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import path from "path";

// Recreate __dirname functionality for ES Modules
const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Example: Setting up a path alias '@' pointing to your 'src' directory
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
