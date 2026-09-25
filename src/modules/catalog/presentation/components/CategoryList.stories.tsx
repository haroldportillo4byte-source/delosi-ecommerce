import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { CategoryList } from "./CategoryList";

const meta: Meta<typeof CategoryList> = {
  title: "Catalog/CategoryList",
  component: CategoryList,
};

export default meta;
type Story = StoryObj<typeof CategoryList>;

export const Default: Story = {
  args: {
    categories: ["electronics", "jewelery", "men's clothing", "women's clothing"],
    activeCategory: "electronics",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("link", { name: /Todos/i })).toHaveAttribute("href", "/products");
    await expect(canvas.getByRole("link", { name: /electronics/i })).toHaveAttribute(
      "href",
      "/products?category=electronics",
    );
  },
};
