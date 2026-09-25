"use client";

import { Search } from "lucide-react";
import { Input } from "@/shared/ui/atoms/Input";
import { useProductsFilter } from "../hooks/useProductsFilter";

type Props = {
  className?: string;
  placeholder?: string;
};

export function CatalogSearchInput({
  className = "",
  placeholder = "Buscar productos...",
}: Props) {
  const { currentQuery, isPending, updateParams } = useProductsFilter();

  return (
    <div className={`relative ${className}`}>
      <Search className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-stone-400" />
      <Input
        type="search"
        key={currentQuery}
        defaultValue={currentQuery}
        placeholder={placeholder}
        disabled={isPending}
        className="pr-10"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            updateParams({ q: event.currentTarget.value });
          }
        }}
      />
    </div>
  );
}
