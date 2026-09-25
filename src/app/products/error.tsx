"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/shared/ui/Button";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center">
      <h2 className="text-xl font-bold text-stone-900">No pudimos cargar el catálogo</h2>
      <p className="mt-2 text-sm text-stone-600">
        La API de productos no respondió correctamente. Intenta nuevamente en unos segundos.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={reset}>Reintentar</Button>
        <Link href="/products">
          <Button variant="secondary">Volver al inicio</Button>
        </Link>
      </div>
    </div>
  );
}
