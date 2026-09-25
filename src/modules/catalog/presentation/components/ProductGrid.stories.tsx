import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { sampleProduct } from "@/test/fixtures/product";
import { ProductGrid } from "./ProductGrid";

const meta: Meta<typeof ProductGrid> = {
  title: "Catalog/ProductGrid",
  component: ProductGrid,
};

export default meta;
type Story = StoryObj<typeof ProductGrid>;

export const WithProducts: Story = {
  args: {
    products: [sampleProduct, { ...sampleProduct, id: 2, title: "Otro" }],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(sampleProduct.title)).toBeInTheDocument();
    await expect(canvas.getByText("Otro")).toBeInTheDocument();
  },
};

export const Empty: Story = {
  args: { products: [] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { level: 2, name: /No encontramos productos/i }),
    ).toBeInTheDocument();
  },
};
