import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";
import { Provider } from "react-redux";
import { addToCart, openCartSidebar } from "../../infrastructure/store/cart.slice";
import { CartSidebar } from "./CartSidebar";
import { HeaderCartCounter } from "./HeaderCartCounter";
import { makeStore, type AppStore } from "@/shared/store";

function withStore(store: AppStore, ui: ReactNode) {
  return <Provider store={store}>{ui}</Provider>;
}

const meta: Meta<typeof CartSidebar> = {
  title: "Cart/CartSidebar",
  component: CartSidebar,
};

export default meta;
type Story = StoryObj<typeof CartSidebar>;

export const EmptyOpen: Story = {
  render: () => {
    const store = makeStore();
    store.dispatch(openCartSidebar());
    return withStore(store, <CartSidebar />);
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Aún no agregaste productos/i)).toBeInTheDocument();
  },
};

export const WithItemsOpen: Story = {
  render: () => {
    const store = makeStore();
    store.dispatch(
      addToCart({ id: 9, title: "Item demo", price: 20, image: "https://example.com/9.png" }),
    );
    store.dispatch(openCartSidebar());
    return withStore(store, <CartSidebar />);
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Item demo")).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: /Quitar uno de Item demo/i }));
    await expect(canvas.queryByText("Item demo")).not.toBeInTheDocument();
  },
};

export const AdjustQuantity: Story = {
  render: () => {
    const store = makeStore();
    store.dispatch(
      addToCart({ id: 9, title: "Item demo", price: 20, image: "https://example.com/9.png" }),
    );
    store.dispatch(openCartSidebar());
    return withStore(
      store,
      <>
        <HeaderCartCounter />
        <CartSidebar />
      </>,
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Agregar uno de Item demo/i }));
    await expect(canvas.getByRole("button", { name: /Carrito con 2 productos/i })).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: /Quitar uno de Item demo/i }));
    await expect(canvas.getByRole("button", { name: /Carrito con 1 productos/i })).toBeInTheDocument();
  },
};

export const ClosesFromControls: Story = {
  render: () => {
    const store = makeStore();
    store.dispatch(
      addToCart({ id: 9, title: "Item demo", price: 20, image: "https://example.com/9.png" }),
    );
    store.dispatch(openCartSidebar());
    return withStore(
      store,
      <>
        <HeaderCartCounter />
        <CartSidebar />
      </>,
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Cerrar carrito" }));
    await userEvent.click(canvas.getByRole("button", { name: /Carrito con 1 productos/i }));
    const overlay = canvasElement.querySelector(".fixed.inset-0");
    await expect(overlay).toBeTruthy();
    await userEvent.click(overlay!);
  },
};
