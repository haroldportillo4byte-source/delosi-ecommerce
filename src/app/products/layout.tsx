import { Suspense, type ReactNode } from "react";
import { CatalogFilterProvider } from "@/modules/catalog/presentation/context/catalog-filter-context";

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <CatalogFilterProvider>{children}</CatalogFilterProvider>
    </Suspense>
  );
}
