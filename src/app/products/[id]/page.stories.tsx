import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor, within } from "storybook/test";
import { Providers } from "@/app/providers";
import { sampleProduct } from "@/test/fixtures/product";
import { AsyncServerPagePreview } from "../../../../.storybook/AsyncServerPagePreview";
import ProductDetailPage, { generateMetadata } from "./page";

type DetailPageProps = {
  params: { id: string };
};

const meta = {
  title: "App/ProductDetailPage",
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true },
  },
  render: ({ params }: DetailPageProps) => (
    <Providers>
      <AsyncServerPagePreview
        key={params.id}
        load={ProductDetailPage}
        pageProps={{ params: Promise.resolve(params) }}
      />
    </Providers>
  ),
} satisfies Meta<DetailPageProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    params: { id: "1" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(async () => {
      await expect(
        canvas.getByRole("heading", { name: /Fjallraven/i }),
      ).toBeInTheDocument();
    });
    await expect(canvas.getByRole("button", { name: /Agregar.*al carrito/i })).toBeInTheDocument();
  },
};

export const MetadataFromProduct: Story = {
  args: { params: { id: "1" } },
  play: async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ id: "1" }) });
    await expect(String(metadata.title)).toContain(sampleProduct.title);
  },
};

export const RejectsInvalidProductId: Story = {
  render: () => (
    <p className="p-6 text-sm text-stone-600">Validación de IDs inválidos vía `notFound()`.</p>
  ),
  play: async () => {
    await expect(
      ProductDetailPage({ params: Promise.resolve({ id: "abc" }) }),
    ).rejects.toThrow(/404/);

    const metadata = await generateMetadata({ params: Promise.resolve({ id: "abc" }) });
    await expect(String(metadata.title)).toMatch(/no encontrado/i);
  },
};

export const RejectsMissingProduct: Story = {
  render: () => (
    <p className="p-6 text-sm text-stone-600">Producto inexistente dispara `notFound()`.</p>
  ),
  play: async () => {
    await expect(
      ProductDetailPage({ params: Promise.resolve({ id: "999" }) }),
    ).rejects.toThrow(/404/);

    const metadata = await generateMetadata({ params: Promise.resolve({ id: "999" }) });
    await expect(String(metadata.title)).toMatch(/no encontrado/i);
  },
};
