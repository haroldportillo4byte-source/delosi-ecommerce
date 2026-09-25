import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { CatalogSearchInput } from "./CatalogSearchInput";

const meta: Meta<typeof CatalogSearchInput> = {
  title: "Catalog/CatalogSearchInput",
  component: CatalogSearchInput,
  parameters: {
    nextjs: { appDirectory: true },
  },
};

export default meta;
type Story = StoryObj<typeof CatalogSearchInput>;

export const Default: Story = {
  args: {
    className: "max-w-xl",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Buscar productos...");
    await userEvent.type(input, "phone{Enter}");
    await expect(input).toHaveValue("phone");
  },
};
