import { Suspense } from "react";
import type { Preview } from "@storybook/nextjs-vite";
import { CatalogFilterProvider } from "../src/modules/catalog/presentation/context/catalog-filter-context";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <Suspense fallback={null}>
        <CatalogFilterProvider>
          <Story />
        </CatalogFilterProvider>
      </Suspense>
    ),
  ],
};

export default preview;
