import { GetProductDetailUseCase } from "@/modules/catalog/application/get-product-detail.use-case";
import { GetProductsUseCase } from "@/modules/catalog/application/get-products.use-case";
import type { Product, ProductCategory } from "@/modules/catalog/domain/entities/product";
import type { ProductRepository } from "@/modules/catalog/domain/repositories/product.repository";
import { getCatalogFallback } from "@/modules/catalog/infrastructure/data/catalog-fallback";

class StorybookProductRepository implements ProductRepository {
  getAll(): Promise<Product[]> {
    return Promise.resolve(getCatalogFallback<Product[]>("/products") ?? []);
  }

  getById(id: number): Promise<Product | null> {
    return Promise.resolve(getCatalogFallback<Product | null>(`/products/${id}`) ?? null);
  }

  getCategories(): Promise<ProductCategory[]> {
    return Promise.resolve(getCatalogFallback<ProductCategory[]>("/products/categories") ?? []);
  }
}

const productRepository = new StorybookProductRepository();

export const getProductsUseCase = new GetProductsUseCase(productRepository);
export const getProductDetailUseCase = new GetProductDetailUseCase(productRepository);

export { productRepository };
