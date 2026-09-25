import Link from "next/link";
import { ProductImage } from "@/shared/ui/ProductImage";
import { Star } from "lucide-react";

import type { Product } from "../../domain/entities/product";
import { formatProductRatingLabel } from "@/shared/a11y/labels";
import { formatPrice } from "@/shared/utils/formatPrice";

type Props = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: Props) {
  const hasPromo = product.price < 50;
  const hasFreeShipping = product.price >= 30;

  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200 transition hover:-translate-y-0.5 hover:shadow-md">
      <Link
        href={`/products/${product.id}`}
        className="block"
        aria-label={`Ver ${product.title}, ${formatPrice(product.price)}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
          <ProductImage
            src={product.image}
            alt={product.title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-contain p-4 transition duration-300 group-hover:scale-105"
          />

          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {hasPromo && (
              <span className="rounded-md bg-[#2f80ed] px-2 py-0.5 text-[10px] font-semibold text-white">
                Hasta 30% Off
              </span>
            )}

            {hasFreeShipping && (
              <span className="rounded-md bg-white/95 px-2 py-0.5 text-[10px] font-medium text-[#2f80ed] shadow">
                Envío Gratis*
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2 p-4">
          <p className="line-clamp-2 text-sm font-semibold text-stone-900">
            {product.title}
          </p>

          <div className="flex items-center justify-between gap-2">
            <p className="text-base font-bold text-[#ff441f]">
              {formatPrice(product.price)}
            </p>

            <p className="flex items-center gap-1 text-xs text-stone-600">
              <span className="sr-only">
                {formatProductRatingLabel(product.rating.rate, product.rating.count)}
              </span>
              <Star
                aria-hidden="true"
                className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
              />
              <span aria-hidden="true">{product.rating.rate.toFixed(1)}</span>
            </p>
          </div>

          <p className="text-xs capitalize text-stone-500">
            {product.category}
          </p>
        </div>
      </Link>
    </article>
  );
}