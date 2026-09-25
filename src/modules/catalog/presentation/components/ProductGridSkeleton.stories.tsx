import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";
import { ProductGridSkeleton } from "./ProductGridSkeleton";

const meta: Meta<typeof ProductGridSkeleton> = {
  title: "Catalog/ProductGridSkeleton",
  component: ProductGridSkeleton,
};

export default meta;
type Story = StoryObj<typeof ProductGridSkeleton>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll(".grid > .animate-pulse").length).toBe(8);
  },
};
