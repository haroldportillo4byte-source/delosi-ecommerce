import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "storybook/test";
import ProductsError from "./error";

const meta: Meta<typeof ProductsError> = {
  title: "App/ProductsError",
  component: ProductsError,
  parameters: {
    nextjs: { appDirectory: true },
  },
};

export default meta;
type Story = StoryObj<typeof ProductsError>;

export const Default: Story = {
  args: {
    error: new Error("Fake Store API unavailable"),
    reset: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/No pudimos cargar el catálogo/i)).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Reintentar" }));
    await expect(args.reset).toHaveBeenCalledOnce();
  },
};
