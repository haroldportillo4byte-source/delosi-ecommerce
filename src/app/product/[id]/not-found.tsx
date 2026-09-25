import type { Metadata } from "next";
import Link from "next/link";
import { buildProductNotFoundMetadata } from "@/shared/seo/metadata-builders";
import { Button } from "@/shared/ui/Button";

export const metadata: Metadata = buildProductNotFoundMetadata();

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="text-xl font-bold text-stone-900">Producto no encontrado</h1>
      <p className="mt-2 text-sm text-stone-600">
        El identificador no corresponde a un producto disponible en el catálogo.
      </p>
      <Link href="/products" className="mt-6 inline-block">
        <Button>Volver al catálogo</Button>
      </Link>
    </div>
  );
}
