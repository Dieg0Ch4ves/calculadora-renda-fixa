import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/calculadora-renda-fixa/",
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: "./src/setupTest.ts",
  },
});
