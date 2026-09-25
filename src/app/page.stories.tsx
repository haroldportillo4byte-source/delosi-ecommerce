import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import HomePage from "./page";

const meta = {
  title: "App/HomePage",
  parameters: {
    docs: {
      description: {
        component: "La ruta `/` redirige automáticamente a `/products` en la aplicación Next.js.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const RedirectNotice: Story = {
  render: () => (
    <div className="mx-auto max-w-lg rounded-xl bg-white p-6 text-sm text-stone-700 shadow-sm ring-1 ring-stone-200">
      <p className="font-semibold text-stone-900">Home (`/`)</p>
      <p className="mt-2">
        Este page component ejecuta <code>redirect(&quot;/products&quot;)</code> en el servidor.
      </p>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(/Home \(`\/`\)/)).toBeInTheDocument();
    await expect(canvas.getByText(/redirect\("\/products"\)/)).toBeInTheDocument();
  },
};

export const RedirectsToProducts: Story = {
  render: () => (
    <p className="mx-auto max-w-lg p-6 text-sm text-stone-600">
      La interacción valida que <code>HomePage</code> invoca <code>redirect(&quot;/products&quot;)</code>.
    </p>
  ),
  play: async () => {
    await expect(() => HomePage()).toThrow(/NEXT_REDIRECT/);
  },
};
