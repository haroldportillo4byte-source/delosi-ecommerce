import type { Product, ProductCategory } from "../../domain/entities/product";
import type { ProductRepository } from "../../domain/repositories/product.repository";
import { fakeStoreFetch } from "../http/fakestore-api.client";

export class ApiProductRepository implements ProductRepository {
  getAll(): Promise<Product[]> {
    return fakeStoreFetch<Product[]>("/products");
  }

  async getById(id: number): Promise<Product | null> {
    try {
      return await fakeStoreFetch<Product>(`/products/${id}`);
    } catch {
      return null;
    }
  }

  getCategories(): Promise<ProductCategory[]> {
    return fakeStoreFetch<ProductCategory[]>("/products/categories");
  }
}
