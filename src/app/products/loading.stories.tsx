import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";
import ProductsLoading from "./loading";

const meta: Meta<typeof ProductsLoading> = {
  title: "App/ProductsLoading",
  component: ProductsLoading,
};

export default meta;
type Story = StoryObj<typeof ProductsLoading>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll(".animate-pulse").length).toBeGreaterThan(0);
  },
};
