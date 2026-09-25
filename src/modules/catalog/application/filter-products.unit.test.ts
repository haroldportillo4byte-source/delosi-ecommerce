import { describe, expect, it } from "vitest";
import { getCatalogSnapshotProducts } from "../infrastructure/data/catalog-fallback";
import { filterProducts } from "./filter-products";

describe("filterProducts", () => {
  const snapshot = getCatalogSnapshotProducts();
  const productA = snapshot.find((p) => p.id === 1)!;
  const productB = snapshot.find((p) => p.id === 2)!;
  const electronics = snapshot.find((p) => p.id === 9)!;
  const catalog = [productA, electronics];

  it("filters by category case-insensitively", () => {
    const result = filterProducts(catalog, { category: "Electronics" });
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe(electronics.id);
  });

  it("filters by search term in title or description", () => {
    const result = filterProducts([productA, productB], { q: "backpack" });
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe(productA.id);
  });

  it("sorts by price ascending", () => {
    const result = filterProducts([productA, productB], { sort: "price-asc" });
    expect(result.map((p) => p.id)).toEqual([productB.id, productA.id]);
  });

  it("sorts by price descending", () => {
    const result = filterProducts([productA, productB], { sort: "price-desc" });
    expect(result.map((p) => p.id)).toEqual([productA.id, productB.id]);
  });

  it("filters by minimum rating", () => {
    const rated = [{ ...productB, rating: { rate: 4.2, count: 10 } }, productA];
    const result = filterProducts(rated, { minRating: 4 });
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe(productB.id);
  });
});
