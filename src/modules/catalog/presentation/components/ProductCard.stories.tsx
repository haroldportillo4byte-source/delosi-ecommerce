import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { cheapProduct, sampleProduct } from "@/test/fixtures/product";
import { ProductCard } from "./ProductCard";

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
    await expect(canvas.getByText(cheapProduct.title)).toBeInTheDocument();
    await expect(canvas.getByText(/Hasta 30% Off/i)).toBeInTheDocument();
    await expect(canvas.getByRole("link")).toHaveAttribute("href", `/products/${cheapProduct.id}`);
  },
};
