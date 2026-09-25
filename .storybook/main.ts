import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/nextjs-vite";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-vitest"],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  async viteFinal(viteConfig) {
    viteConfig.resolve ??= {};
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      "@/modules/catalog/infrastructure/di/catalog.container": path.join(
        dirname,
        "mocks/catalog.container.ts",
      ),
    };
    return viteConfig;
  },
};

export default config;
