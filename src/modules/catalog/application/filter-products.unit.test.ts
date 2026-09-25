import { describe, expect, it } from "vitest";
import { sampleProduct, cheapProduct } from "@/test/fixtures/product";
import { filterProducts } from "./filter-products";

describe("filterProducts", () => {
  const catalog = [sampleProduct, cheapProduct];

  it("filters by category case-insensitively", () => {
    const result = filterProducts(catalog, { category: "Electronics" });
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe(cheapProduct.id);
  });

  it("filters by search term in title or description", () => {
    const result = filterProducts(catalog, { q: "backpack" });
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe(sampleProduct.id);
  });

  it("sorts by price ascending", () => {
    const result = filterProducts(catalog, { sort: "price-asc" });
    expect(result.map((p) => p.id)).toEqual([cheapProduct.id, sampleProduct.id]);
  });

  it("sorts by price descending", () => {
    const result = filterProducts(catalog, { sort: "price-desc" });
    expect(result.map((p) => p.id)).toEqual([sampleProduct.id, cheapProduct.id]);
  });

  it("filters by minimum rating", () => {
    const rated = [{ ...cheapProduct, rating: { rate: 4.2, count: 10 } }, sampleProduct];
    const result = filterProducts(rated, { minRating: 4 });
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe(cheapProduct.id);
  });
});
