import type { Product } from "../domain/entities/product";
import type { PriceRange, ProductQuery } from "../domain/value-objects/product-query";

function matchesPriceRange(price: number, range: PriceRange): boolean {
  switch (range) {
    case "0-50":
      return price <= 50;
    case "50-100":
      return price > 50 && price <= 100;
    case "100+":
      return price > 100;
  }
}

export function filterProducts(products: Product[], query: ProductQuery): Product[] {
  let result = [...products];

  if (query.category) {
    result = result.filter(
      (product) => product.category.toLowerCase() === query.category!.toLowerCase(),
    );
  }

  if (query.q) {
    const term = query.q.toLowerCase();
    result = result.filter(
      (product) =>
        product.title.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term),
    );
  }

  if (query.minRating !== undefined) {
    result = result.filter((product) => product.rating.rate >= query.minRating!);
  }

  if (query.priceRange) {
    result = result.filter((product) => matchesPriceRange(product.price, query.priceRange!));
  }

  switch (query.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }

  return result;
}
