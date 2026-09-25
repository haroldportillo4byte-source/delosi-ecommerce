import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Shared/Atoms/Input",
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: "Buscar productos...", "aria-label": "Buscar" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Buscar" });
    await userEvent.type(input, "phone");
    await expect(input).toHaveValue("phone");
  },
};
