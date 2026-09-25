import { ProductImage } from "@/shared/ui/atoms/ProductImage";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { AddToCartButton } from "@/modules/cart/presentation/components/AddToCartButton";
import { getProductDetailUseCase } from "@/modules/catalog/infrastructure/di/catalog.container";
import { formatProductRatingLabel } from "@/shared/a11y/labels";
import {
  buildProductMetadata,
  buildProductNotFoundMetadata,
} from "@/shared/seo/metadata-builders";
import {
  JsonLd,
  buildBreadcrumbListJsonLd,
  buildProductJsonLd,
} from "@/shared/seo/json-ld";
import { Breadcrumbs } from "@/shared/ui/molecules/Breadcrumbs";
import { formatPrice } from "@/shared/utils/formatPrice";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const productId = Number(id);
  if (Number.isNaN(productId)) {
    return buildProductNotFoundMetadata();
  }

  const product = await getProductDetailUseCase.execute(productId);
  if (!product) {
    return buildProductNotFoundMetadata();
  }

  return buildProductMetadata(product);
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const productId = Number(id);
  if (Number.isNaN(productId)) {
    notFound();
  }

  const product = await getProductDetailUseCase.execute(productId);
  if (!product) {
    notFound();
  }

  const breadcrumbItems = [
    { name: "Catálogo", href: "/products" },
    { name: product.category, href: `/products?category=${encodeURIComponent(product.category)}` },
    { name: product.title },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <JsonLd data={[buildProductJsonLd(product), buildBreadcrumbListJsonLd(breadcrumbItems)]} />
      <Breadcrumbs items={breadcrumbItems} className="mb-4" />

      <article className="grid gap-8 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-stone-200 md:grid-cols-2 md:p-8">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-50">
          <ProductImage
            src={product.image}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-6"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-sm capitalize text-stone-500">{product.category}</p>
          <h1 className="mt-1 text-2xl font-black text-stone-900 md:text-3xl">{product.title}</h1>

          <div className="mt-3 flex items-center gap-3">
            <p className="text-3xl font-bold text-[#ff441f]">
              <span className="sr-only">Precio: </span>
              {formatPrice(product.price)}
            </p>
            <p className="flex items-center gap-1 text-sm text-stone-600">
              <span className="sr-only">
                {formatProductRatingLabel(product.rating.rate, product.rating.count)}
              </span>
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              <span aria-hidden="true">
                {product.rating.rate.toFixed(1)} ({product.rating.count} reseñas)
              </span>
            </p>
          </div>

          <p className="mt-6 flex-1 text-sm leading-relaxed text-stone-700">{product.description}</p>

          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>
        </div>
      </article>
    </div>
  );
}
