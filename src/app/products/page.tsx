import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogAsyncSection } from "@/modules/catalog/presentation/components/CatalogAsyncSection";
import { FilterBadges } from "@/modules/catalog/presentation/components/FilterBadges";
import { ProductGridSkeleton } from "@/modules/catalog/presentation/components/ProductGridSkeleton";
import { parseProductQuery } from "@/modules/catalog/domain/value-objects/product-query";
import { buildCatalogMetadata } from "@/shared/seo/metadata-builders";
import { Breadcrumbs } from "@/shared/ui/molecules/Breadcrumbs";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = parseProductQuery(params);
  return buildCatalogMetadata(query);
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = parseProductQuery(params);

  const breadcrumbItems = [
    { name: "Inicio", href: "/products" },
    { name: "Catálogo de productos", href: "/products" },
    ...(query.category ? [{ name: query.category }] : []),
    ...(query.q ? [{ name: `Búsqueda: ${query.q}` }] : []),
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-6">
      <Breadcrumbs items={breadcrumbItems} />
      <header>
        <h1 className="text-3xl font-black tracking-tight text-[#ff441f] md:text-4xl">
          Catálogo de productos
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-stone-600">
          Explora nuestros productos.
        </p>
      </header>

      <section aria-label="Filtros del catálogo">
        <Suspense fallback={<div className="h-16 animate-pulse rounded-xl bg-stone-200" aria-hidden="true" />}>
          <FilterBadges />
        </Suspense>
      </section>


      <Suspense fallback={<ProductGridSkeleton />}>
        <CatalogAsyncSection query={query} />
      </Suspense>
    </div>
  );
}
