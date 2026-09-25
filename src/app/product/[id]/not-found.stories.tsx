import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import ProductNotFound from "./not-found";

const meta: Meta<typeof ProductNotFound> = {
  title: "App/ProductNotFound",
  component: ProductNotFound,
  parameters: {
    nextjs: { appDirectory: true },
  },
};

export default meta;
type Story = StoryObj<typeof ProductNotFound>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { level: 1, name: /Producto no encontrado/i }),
    ).toBeInTheDocument();
    await expect(canvas.getByRole("link", { name: /Volver al catálogo/i })).toHaveAttribute(
      "href",
      "/products",
    );
  },
};
