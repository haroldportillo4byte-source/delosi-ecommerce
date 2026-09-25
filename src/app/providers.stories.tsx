import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { HeaderCartCounter } from "@/modules/cart/presentation/components/HeaderCartCounter";
import { Providers } from "./providers";

const CART_STORAGE_KEY = "delosi-cart-v1";

const meta: Meta<typeof Providers> = {
  title: "App/Providers",
  component: Providers,
};

export default meta;
type Story = StoryObj<typeof Providers>;

export const Default: Story = {
  render: (args) => (
    <Providers {...args}>
      <p className="rounded-lg bg-white p-4 text-sm text-stone-700">
        Contenido envuelto por Redux Provider.
      </p>
    </Providers>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(/Contenido envuelto por Redux Provider/i)).toBeInTheDocument();
  },
};

export const HydratesCartFromStorage: Story = {
  loaders: [
    () => {
      window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify({
          items: [
            {
              productId: 1,
              title: "Producto guardado",
              price: 10,
              image: "https://example.com/img.png",
              quantity: 2,
            },
          ],
        }),
      );
      return {};
    },
  ],
  render: () => (
    <Providers>
      <HeaderCartCounter />
    </Providers>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("button", { name: /Carrito con 2 productos/i }),
    ).toBeInTheDocument();
  },
};
