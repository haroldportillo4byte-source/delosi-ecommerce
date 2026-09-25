import {
  getProductsUseCase,
  productRepository,
} from "../../infrastructure/di/catalog.container";
import type { ProductQuery } from "../../domain/value-objects/product-query";
import { CategoryList } from "./CategoryList";
import { ProductGrid } from "./ProductGrid";

type Props = {
  query: ProductQuery;
};

export async function CatalogAsyncSection({ query }: Props) {
  const [{ products, total }, categories] = await Promise.all([
    getProductsUseCase.execute(query),
    productRepository.getCategories(),
  ]);

  return (
    <div className="space-y-8">
      <CategoryList categories={categories} activeCategory={query.category} />
      <section aria-labelledby="catalog-products-heading">
        <h2 id="catalog-products-heading" className="mb-4 text-xl font-bold text-stone-900">
          Productos en catálogo{" "}
          <span className="text-base font-semibold text-stone-500">({total})</span>
        </h2>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
