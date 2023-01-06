import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/test/config/setupTest.ts"],
    include: ["src/test/*.{js,tsx,ts}"],
  },
});
