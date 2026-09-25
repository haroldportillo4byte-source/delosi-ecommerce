import type { MetadataRoute } from "next";
import { productRepository } from "@/modules/catalog/infrastructure/di/catalog.container";
import { createSitemapEntry } from "@/shared/seo/sitemap-builders";

export const dynamic = "force-dynamic";

function catalogOnlySitemap(): MetadataRoute.Sitemap {
  return [
    createSitemapEntry("/", { priority: 1, changeFrequency: "daily" }),
    createSitemapEntry("/products", {
      priority: 1,
      changeFrequency: "daily",
    }),
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const catalog = createSitemapEntry("/products", {
    priority: 1,
    changeFrequency: "daily",
  });

  try {
    const [products, categories] = await Promise.all([
      productRepository.getAll(),
      productRepository.getCategories(),
    ]);

    const categoryPages = categories.map((category) =>
      createSitemapEntry(`/products?category=${encodeURIComponent(category)}`, {
        priority: 0.8,
        changeFrequency: "daily",
      }),
    );

    const productPages = products.map((product) =>
      createSitemapEntry(`/products/${product.id}`, {
        priority: 0.7,
        changeFrequency: "weekly",
      }),
    );

    return [
      createSitemapEntry("/", { priority: 1, changeFrequency: "daily" }),
      catalog,
      ...categoryPages,
      ...productPages,
    ];
  } catch {
    // Fake Store API a veces responde 403 desde IPs de CI/CD (p. ej. Vercel build).
    return catalogOnlySitemap();
  }
}
