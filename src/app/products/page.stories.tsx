import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { AsyncServerPagePreview } from "../../../.storybook/AsyncServerPagePreview";
import ProductsPage from "./page";

type ProductsPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

const meta = {
  title: "App/ProductsPage",
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true },
    docs: {
      description: {
        component:
          "Server Component de Next.js (`async`). Storybook lo ejecuta con un wrapper que hace `await` del JSX.",
      },
    },
  },
  render: ({ searchParams }: ProductsPageProps) => (
    <AsyncServerPagePreview
      key={JSON.stringify(searchParams)}
      load={ProductsPage}
      pageProps={{ searchParams: Promise.resolve(searchParams) }}
    />
  ),
} satisfies Meta<ProductsPageProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    searchParams: {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: /Catálogo de productos/i }),
    ).toBeInTheDocument();
  },
};

export const WithCategory: Story = {
  args: {
    searchParams: { category: "electronics" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/electronics/i)).toBeInTheDocument();
    await expect(
      canvas.getByRole("heading", { name: /Catálogo de productos/i }),
    ).toBeInTheDocument();
  },
};
