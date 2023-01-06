import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import type { InlineConfig } from "vitest";
import type { UserConfig } from "vite";

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/test/config/setupTest.ts"],
  },
} as VitestConfigExport);
