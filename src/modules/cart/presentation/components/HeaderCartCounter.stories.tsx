import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Provider } from "react-redux";
import { addToCart } from "../../infrastructure/store/cart.slice";
import { CartSidebar } from "./CartSidebar";
import { HeaderCartCounter } from "./HeaderCartCounter";
import { makeStore } from "@/shared/store";

const meta: Meta<typeof HeaderCartCounter> = {
  title: "Cart/HeaderCartCounter",
  component: HeaderCartCounter,
};

export default meta;
type Story = StoryObj<typeof HeaderCartCounter>;

export const Default: Story = {
  render: () => {
    const store = makeStore();
    store.dispatch(
      addToCart({ id: 1, title: "Demo", price: 10, image: "https://example.com/x.png" }),
    );
    return (
      <Provider store={store}>
        <HeaderCartCounter />
        <CartSidebar />
      </Provider>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const cartButton = canvas.getByRole("button", { name: /Carrito con 1 productos/i });
    await expect(cartButton).toBeInTheDocument();
    await userEvent.click(cartButton);
    await waitFor(async () => {
      await expect(canvas.getByRole("heading", { name: /Tu carrito \(1\)/i })).toBeInTheDocument();
    });
  },
};
