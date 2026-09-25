import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { SiteFooter } from "./SiteFooter";

const meta: Meta<typeof SiteFooter> = {
  title: "Shared/SiteFooter",
  component: SiteFooter,
};

export default meta;
type Story = StoryObj<typeof SiteFooter>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(new RegExp(String(new Date().getFullYear()))),
    ).toBeInTheDocument();
  },
};
