import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { Provider } from "react-redux";
import { SiteNavbar } from "./SiteNavbar";
import { makeStore } from "@/shared/store";

const meta: Meta<typeof SiteNavbar> = {
  title: "Shared/SiteNavbar",
  component: SiteNavbar,
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true },
  },
  decorators: [
    (Story) => (
      <Provider store={makeStore()}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SiteNavbar>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("link", { name: "Delosi" })).toHaveAttribute("href", "/products");
    await expect(canvas.getByRole("button", { name: /carrito/i })).toBeInTheDocument();
  },
};
