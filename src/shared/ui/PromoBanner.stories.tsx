import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";
import { PromoBanner } from "./PromoBanner";

const meta: Meta<typeof PromoBanner> = {
  title: "Shared/PromoBanner",
  component: PromoBanner,
};

export default meta;
type Story = StoryObj<typeof PromoBanner>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/envíos gratis/i)).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Cerrar banner" }));
    await expect(canvas.queryByText(/envíos gratis/i)).not.toBeInTheDocument();
  },
};
