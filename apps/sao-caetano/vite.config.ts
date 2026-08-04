import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  publicDir: fileURLToPath(new URL("../../packages/landing-page/public", import.meta.url)),
  css: {
    postcss: fileURLToPath(new URL("../../postcss.config.mjs", import.meta.url)),
  },
});
