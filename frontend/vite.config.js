import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  build: {
    target: "esnext",
    sourcemap: false,
    cssCodeSplit: true,
    minify: "esbuild",
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom") || id.includes("node_modules/react-router-dom")) {
            return "vendor";
          }
          if (id.includes("node_modules/framer-motion")) return "motion";
          if (id.includes("node_modules/@tanstack")) return "query";
          if (id.includes("node_modules/@radix-ui")) return "radix";
          if (id.includes("node_modules/lucide-react")) return "icons";
        },
      },
    },
  },

  esbuild: {
    drop: ["console", "debugger"],
  },
});
