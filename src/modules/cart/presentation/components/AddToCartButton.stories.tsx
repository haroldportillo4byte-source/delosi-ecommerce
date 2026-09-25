import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";
import { Provider } from "react-redux";
import { AddToCartButton } from "./AddToCartButton";
import { HeaderCartCounter } from "./HeaderCartCounter";
import { makeStore } from "@/shared/store";
import { getCatalogSnapshotProducts } from "@/modules/catalog/infrastructure/data/catalog-fallback";

const sampleProduct = getCatalogSnapshotProducts().find((p) => p.id === 1)!;

const meta: Meta<typeof AddToCartButton> = {
  title: "Cart/AddToCartButton",
  component: AddToCartButton,
};

export default meta;
type Story = StoryObj<typeof AddToCartButton>;

export const Default: Story = {
  render: (args) => {
    const store = makeStore();
    return (
      <Provider store={store}>
        <AddToCartButton {...args} />
        <HeaderCartCounter />
      </Provider>
    );
  },
  args: {
    product: {
      id: sampleProduct.id,
      title: sampleProduct.title,
      price: sampleProduct.price,
      image: sampleProduct.image,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Agregar.*al carrito/i }));
    await expect(
      canvas.getByRole("button", { name: /Carrito con 1 productos/i }),
    ).toBeInTheDocument();
  },
};

export const IncrementsExistingLine: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addButton = canvas.getByRole("button", { name: /Agregar.*al carrito/i });
    await userEvent.click(addButton);
    await userEvent.click(addButton);
    await expect(
      canvas.getByRole("button", { name: /Carrito con 2 productos/i }),
    ).toBeInTheDocument();
  },
};
