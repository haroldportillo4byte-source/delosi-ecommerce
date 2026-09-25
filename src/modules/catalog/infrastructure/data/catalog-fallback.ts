import type { Product, ProductCategory } from "../../domain/entities/product";
import snapshot from "./catalog-fallback.json";

const products = snapshot.products as Product[];
const categories = snapshot.categories as ProductCategory[];

/** Productos del snapshot local (tests, Storybook, resiliencia API). */
export function getCatalogSnapshotProducts(): readonly Product[] {
  return products;
}

export function getCatalogFallback<T>(path: string): T | null {
  if (path === "/products") {
    return products as T;
  }

  if (path === "/products/categories") {
    return categories as T;
  }

  const productMatch = /^\/products\/(\d+)$/.exec(path);
  if (productMatch) {
    const id = Number(productMatch[1]);
    const product = products.find((item) => item.id === id) ?? null;
    return product as T | null;
  }

  return null;
}
