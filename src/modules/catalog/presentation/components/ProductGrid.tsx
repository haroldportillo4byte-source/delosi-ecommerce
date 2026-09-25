import { PackageOpen } from "lucide-react";
import Link from "next/link";
import type { Product } from "../../domain/entities/product";
import { ProductCard } from "./ProductCard";

type Props = {
  products: Product[];
};

export function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
        <PackageOpen className="mb-3 h-10 w-10 text-stone-400" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-stone-800">No encontramos productos</h2>
        <p className="mt-1 max-w-md text-sm text-stone-500">
          Prueba con otra búsqueda o limpia los filtros de categoría.
        </p>
        <Link
          href="/products"
          className="mt-4 rounded-full bg-[#ff441f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e63a1a]"
        >
          Ver todos los productos
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 4} />
      ))}
    </div>
  );
}
