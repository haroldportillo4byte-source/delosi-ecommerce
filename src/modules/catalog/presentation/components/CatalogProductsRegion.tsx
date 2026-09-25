"use client";

import type { ReactNode } from "react";
import { useCatalogFilterPending } from "../context/catalog-filter-context";
import { CatalogSectionSkeleton } from "./CatalogSectionSkeleton";

type Props = {
  children: ReactNode;
};

export function CatalogProductsRegion({ children }: Props) {
  const isPending = useCatalogFilterPending();

  if (isPending) {
    return <CatalogSectionSkeleton />;
  }

  return children;
}
