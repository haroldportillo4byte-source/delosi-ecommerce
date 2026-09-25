import type { Product, ProductCategory } from "../entities/product";

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: number): Promise<Product | null>;
  getCategories(): Promise<ProductCategory[]>;
}
