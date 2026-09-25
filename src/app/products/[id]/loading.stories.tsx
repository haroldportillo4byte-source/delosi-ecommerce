import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";
import ProductDetailLoading from "./loading";

const meta: Meta<typeof ProductDetailLoading> = {
  title: "App/ProductDetailLoading",
  component: ProductDetailLoading,
};

export default meta;
type Story = StoryObj<typeof ProductDetailLoading>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector("article")).toBeInTheDocument();
  },
};
