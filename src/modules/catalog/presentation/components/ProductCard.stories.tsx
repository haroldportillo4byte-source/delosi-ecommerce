import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { getCatalogSnapshotProducts } from "../../infrastructure/data/catalog-fallback";
import { ProductCard } from "./ProductCard";

const [sampleProduct, cheapProduct] = [1, 2].map(
  (id) => getCatalogSnapshotProducts().find((p) => p.id === id)!,
);

const meta: Meta<typeof ProductCard> = {
  title: "Catalog/ProductCard",
  component: ProductCard,
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: { product: sampleProduct },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(sampleProduct.title)).toBeInTheDocument();
    await expect(canvas.getByText(/Envío Gratis/i)).toBeInTheDocument();
    await expect(canvas.getByRole("link")).toHaveAttribute("href", `/products/${sampleProduct.id}`);
  },
};

export const PromoBadges: Story = {
  args: { product: cheapProduct },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(new RegExp(cheapProduct.title.trim(), "i"))).toBeInTheDocument();
    await expect(canvas.getByText(/Hasta 30% Off/i)).toBeInTheDocument();
    await expect(canvas.getByRole("link")).toHaveAttribute("href", `/products/${cheapProduct.id}`);
  },
};
