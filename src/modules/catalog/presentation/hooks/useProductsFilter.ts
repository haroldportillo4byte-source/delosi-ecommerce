"use client";

import { useCallback, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ProductSort } from "../../domain/value-objects/product-query";

export function useProductsFilter() {
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

  return {
    currentSort,
    currentQuery,
    currentMinRating,
    currentPriceRange,
    isPending,
    updateParams,
  };
}
