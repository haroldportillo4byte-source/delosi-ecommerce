import type { ProductRepository } from "../domain/repositories/product.repository";
import type { ProductQuery } from "../domain/value-objects/product-query";
import { filterProducts } from "./filter-products";

export class GetProductsUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(query: ProductQuery) {
    const products = await this.repository.getAll();
    const filtered = filterProducts(products, query);
    return { products: filtered, total: filtered.length };
  }
}
