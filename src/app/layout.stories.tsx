import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

import RootLayout from "@/app/layout";
import { Providers } from "@/app/providers";
import { CartSidebar } from "@/modules/cart/presentation/components/CartSidebar";
import { PromoBanner } from "@/shared/ui/PromoBanner";
import { SiteFooter } from "@/shared/ui/SiteFooter";
import { SiteNavbar } from "@/shared/ui/SiteNavbar";

const meta = {
  title: "Layout/AppShell",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <Providers>
        <Story />
      </Providers>
    ),
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const RootLayoutStory: Story = {
  render: () => (
    <RootLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <h1 className="text-3xl font-bold">Contenido de página</h1>
        <p className="mt-2 text-stone-600">Render del layout raíz de Next.js.</p>
      </div>
    </RootLayout>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const doc = canvasElement.ownerDocument;

    expect(doc.documentElement).toHaveAttribute("lang", "es");
    await expect(
      canvas.getByRole("heading", { name: "Contenido de página" }),
    ).toBeInTheDocument();
    await expect(canvas.getByRole("link", { name: "Delosi" })).toBeInTheDocument();
  },
};

export const Default: Story = {
  render: () => (
    <div className="flex min-h-screen flex-col bg-[#f5f3ef] text-stone-900">
      <CartSidebar />

      <PromoBanner />

      <SiteNavbar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
          <h1 className="text-3xl font-bold">Contenido de ejemplo</h1>

          <p className="mt-2 text-stone-600">
            Esta área representa el contenido de una página.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("heading", { name: "Contenido de ejemplo" }),
    ).toBeInTheDocument();
    await expect(canvas.getByRole("link", { name: "Delosi" })).toBeInTheDocument();
    await expect(canvas.getByRole("button", { name: /carrito/i })).toBeInTheDocument();
  },
};