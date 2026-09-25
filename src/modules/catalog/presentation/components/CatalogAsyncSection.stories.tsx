import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor, within } from "storybook/test";
import { AsyncServerPagePreview } from "../../../../../.storybook/AsyncServerPagePreview";
import { CatalogAsyncSection } from "./CatalogAsyncSection";
import type { ProductQuery } from "../../domain/value-objects/product-query";

type StoryArgs = {
  query: ProductQuery;
};

const meta = {
  title: "Catalog/CatalogAsyncSection",
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true },
    docs: {
      description: {
        component:
          "En Storybook/Vitest el repositorio de catálogo usa datos de fallback (`.storybook/mocks/catalog.container.ts`). En producción consume Fake Store API.",
      },
    },
  },
  render: ({ query }: StoryArgs) => (
    <AsyncServerPagePreview
      key={JSON.stringify(query)}
      load={CatalogAsyncSection}
      pageProps={{ query }}
    />
  ),
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    query: { sort: "relevance" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(async () => {
      await expect(
        canvas.getByRole("heading", { name: /Productos en catálogo/i }),
      ).toBeInTheDocument();
      await expect(
        canvas.getByRole("heading", { name: /Explora por categoría/i }),
      ).toBeInTheDocument();
    });
  },
};

export const WithCategory: Story = {
  args: {
    query: { sort: "relevance", category: "electronics" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(async () => {
      await expect(canvas.getByRole("heading", { name: /Productos en catálogo/i })).toBeInTheDocument();
    });
    await expect(canvas.getByRole("link", { name: /electronics/i })).toBeInTheDocument();
  },
};
