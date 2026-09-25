import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          environment: "node",
          include: ["src/**/*.unit.test.ts"],
        },
      },
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
            storybookScript: "pnpm storybook",
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
    coverage: {
      provider: "v8",
      include: ["src/**/*.tsx"],
      exclude: ["src/**/*.stories.tsx", "src/test/**"],
      reporter: ["text", "html"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
      "@/modules/catalog/infrastructure/di/catalog.container": path.resolve(
        dirname,
        ".storybook/mocks/catalog.container.ts",
      ),
    },
  },
});
