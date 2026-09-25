"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useTransition,
  type ReactNode,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ProductSort } from "../../domain/value-objects/product-query";

export type CatalogFilterContextValue = {
  currentSort: ProductSort;
  currentQuery: string;
  currentMinRating: string;
  currentPriceRange: string;
  isPending: boolean;
  updateParams: (updates: Record<string, string | null>) => void;
};

const CatalogFilterContext = createContext<CatalogFilterContextValue | null>(null);

function useCatalogFilterNavigation(): CatalogFilterContextValue {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSort = (searchParams.get("sort") as ProductSort) || "relevance";
  const currentQuery = searchParams.get("q") ?? "";
  const currentMinRating = searchParams.get("minRating") ?? "";
  const currentPriceRange = searchParams.get("price") ?? "";

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [pathname, router, searchParams],
  );

  return useMemo(
    () => ({
      currentSort,
      currentQuery,
      currentMinRating,
      currentPriceRange,
      isPending,
      updateParams,
    }),
    [
      currentSort,
      currentQuery,
      currentMinRating,
      currentPriceRange,
      isPending,
      updateParams,
    ],
  );
}

export function CatalogFilterProvider({ children }: { children: ReactNode }) {
  const value = useCatalogFilterNavigation();
  return (
    <CatalogFilterContext.Provider value={value}>{children}</CatalogFilterContext.Provider>
  );
}

export function useCatalogFilter() {
  const context = useContext(CatalogFilterContext);
  if (!context) {
    throw new Error("useCatalogFilter debe usarse dentro de CatalogFilterProvider");
  }
  return context;
}

export function useCatalogFilterPending() {
  return useContext(CatalogFilterContext)?.isPending ?? false;
}

export function useProductsFilter() {
  return useCatalogFilterNavigation();
}
