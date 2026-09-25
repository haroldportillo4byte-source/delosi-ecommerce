import type { MetadataRoute } from "next";
import { productRepository } from "@/modules/catalog/infrastructure/di/catalog.container";
import { createSitemapEntry } from "@/shared/seo/sitemap-builders";

/** Regenera el sitemap como máximo cada hora (catálogo externo). */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    productRepository.getAll(),
    productRepository.getCategories(),
  ]);

  const catalog = createSitemapEntry("/products", {
    priority: 1,
    changeFrequency: "daily",
  });

  const categoryPages = categories.map((category) =>
    createSitemapEntry(`/products?category=${encodeURIComponent(category)}`, {
      priority: 0.8,
      changeFrequency: "daily",
    }),
  );

  const productPages = products.map((product) =>
    createSitemapEntry(`/product/${product.id}`, {
      priority: 0.7,
      changeFrequency: "weekly",
    }),
  );

  return [catalog, ...categoryPages, ...productPages];
}
