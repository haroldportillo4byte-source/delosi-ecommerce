import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { CatalogAsyncSection } from "../../../../../.storybook/mocks/CatalogAsyncSection";

const meta: Meta<typeof CatalogAsyncSection> = {
  title: "Catalog/CatalogAsyncSection",
  component: CatalogAsyncSection,
  parameters: {
    nextjs: { appDirectory: true },
    docs: {
      description: {
        component:
          "En Storybook se usa un stub (ver `.storybook/mocks`). En Next.js el componente es async y carga datos reales.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CatalogAsyncSection>;

export const Default: Story = {
  args: {
    query: { sort: "relevance" },
  },
  render: (args) => <CatalogAsyncSection {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(/Vista previa de Storybook: sección de catálogo simulada/i),
    ).toBeInTheDocument();
  },
};

export const WithCategory: Story = {
  args: {
    query: { sort: "relevance", category: "electronics" },
  },
  render: (args) => <CatalogAsyncSection {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/sección de catálogo simulada/i)).toBeInTheDocument();
  },
};
