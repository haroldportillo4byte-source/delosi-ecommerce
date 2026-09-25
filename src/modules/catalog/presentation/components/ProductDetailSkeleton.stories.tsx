import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";
import { ProductDetailSkeleton } from "./ProductDetailSkeleton";

const meta: Meta<typeof ProductDetailSkeleton> = {
  title: "Catalog/ProductDetailSkeleton",
  component: ProductDetailSkeleton,
};

export default meta;
type Story = StoryObj<typeof ProductDetailSkeleton>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll(".animate-pulse").length).toBeGreaterThanOrEqual(3);
  },
};
