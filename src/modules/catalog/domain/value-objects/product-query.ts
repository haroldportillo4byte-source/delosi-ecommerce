export type ProductSort = "relevance" | "price-asc" | "price-desc";

export type PriceRange = "0-50" | "50-100" | "100+";

export type ProductQuery = {
  category?: string;
  q?: string;
  sort?: ProductSort;
  minRating?: number;
  priceRange?: PriceRange;
};

export const DEFAULT_PRODUCT_SORT: ProductSort = "relevance";

export function parseProductQuery(
  searchParams: Record<string, string | string[] | undefined>,
): ProductQuery {
  const category = firstParam(searchParams.category);
  const q = firstParam(searchParams.q)?.trim();
  const sortParam = firstParam(searchParams.sort);
  const minRatingParam = firstParam(searchParams.minRating);
  const priceRangeParam = firstParam(searchParams.price);

  const sort: ProductSort =
    sortParam === "price-asc" || sortParam === "price-desc" || sortParam === "relevance"
      ? sortParam
      : DEFAULT_PRODUCT_SORT;

  const minRating =
    minRatingParam === "4" || minRatingParam === "4.5" ? Number(minRatingParam) : undefined;

  const priceRange =
    priceRangeParam === "0-50" || priceRangeParam === "50-100" || priceRangeParam === "100+"
      ? priceRangeParam
      : undefined;

  return {
    category: category || undefined,
    q: q || undefined,
    sort,
    minRating,
    priceRange,
  };
}

function firstParam(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}
