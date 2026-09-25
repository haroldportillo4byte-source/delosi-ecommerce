import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { FilterBadges } from "./FilterBadges";

const meta: Meta<typeof FilterBadges> = {
  title: "Catalog/FilterBadges",
  component: FilterBadges,
  parameters: {
    nextjs: { appDirectory: true },
  },
};

export default meta;
type Story = StoryObj<typeof FilterBadges>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: /Mostrar filtros del catálogo/i }));

    const sortSelect = canvas.getByLabelText("Ordenar productos del catálogo");
    const ratingSelect = canvas.getByLabelText("Filtrar por calificación mínima");
    const priceSelect = canvas.getByLabelText("Filtrar por rango de precio");

    await expect(sortSelect).toHaveValue("relevance");
    await expect(ratingSelect).toHaveValue("");
    await expect(priceSelect).toHaveValue("");

    await userEvent.selectOptions(sortSelect, "price-asc");
    await userEvent.selectOptions(ratingSelect, "4.5");
    await userEvent.selectOptions(priceSelect, "0-50");

    const search = canvas.getByPlaceholderText("Buscar por nombre o descripción...");
    await userEvent.type(search, "laptop{Enter}");
  },
};
