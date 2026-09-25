"use client";

import { useId, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { ProductSort } from "../../domain/value-objects/product-query";
import { useProductsFilter } from "../hooks/useProductsFilter";
import { Input } from "@/shared/ui/Input";

const SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: "relevance", label: "Relevancia" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
];

const RATING_OPTIONS = [
  { value: "", label: "Todas las calificaciones" },
  { value: "4", label: "4+ estrellas" },
  { value: "4.5", label: "4.5+ estrellas" },
] as const;

const PRICE_RANGE_OPTIONS = [
  { value: "", label: "Todos los precios" },
  { value: "0-50", label: "Hasta $50" },
  { value: "50-100", label: "$50 – $100" },
  { value: "100+", label: "Más de $100" },
] as const;

export function FilterBadges() {
  const panelId = useId();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const {
    currentSort,
    currentQuery,
    currentMinRating,
    currentPriceRange,
    isPending,
    updateParams,
  } = useProductsFilter();

  const hasActiveFilters =
    Boolean(currentMinRating || currentPriceRange) || currentSort !== "relevance";

  return (
    <div className="space-y-3">
      <div className="flex items-stretch gap-2">
        <button
          type="button"
          aria-expanded={filtersOpen}
          aria-controls={panelId}
          aria-label={filtersOpen ? "Ocultar filtros del catálogo" : "Mostrar filtros del catálogo"}
          onClick={() => setFiltersOpen((open) => !open)}
          className={`relative flex shrink-0 items-center justify-center rounded-full border bg-white p-2.5 shadow-sm transition hover:bg-stone-50 ${
            filtersOpen || hasActiveFilters
              ? "border-[#ff441f] text-[#ff441f]"
              : "border-stone-200 text-stone-700"
          }`}
        >
          <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
          {hasActiveFilters && !filtersOpen ? (
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#ff441f]" />
          ) : null}
        </button>

        <Input
          type="search"
          defaultValue={currentQuery}
          placeholder="Buscar por nombre o descripción..."
          aria-label="Buscar por nombre o descripción en el catálogo"
          className="min-w-0 flex-1"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              updateParams({ q: event.currentTarget.value });
            }
          }}
        />
      </div>

      <div
        id={panelId}
        hidden={!filtersOpen}
        className="overflow-hidden rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <label htmlFor="catalog-min-rating" className="flex flex-col gap-1 text-sm text-stone-600">
            <span>Calificación</span>
            <select
              id="catalog-min-rating"
              value={currentMinRating}
              disabled={isPending}
              aria-label="Filtrar por calificación mínima"
              onChange={(event) => updateParams({ minRating: event.target.value || null })}
              className="rounded-lg border border-stone-200 bg-white px-2 py-2 text-sm text-stone-800"
            >
              {RATING_OPTIONS.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="catalog-price-range" className="flex flex-col gap-1 text-sm text-stone-600">
            <span>Precio</span>
            <select
              id="catalog-price-range"
              value={currentPriceRange}
              disabled={isPending}
              aria-label="Filtrar por rango de precio"
              onChange={(event) => updateParams({ price: event.target.value || null })}
              className="rounded-lg border border-stone-200 bg-white px-2 py-2 text-sm text-stone-800"
            >
              {PRICE_RANGE_OPTIONS.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="catalog-sort" className="flex flex-col gap-1 text-sm text-stone-600">
            <span>Ordenar por</span>
            <select
              id="catalog-sort"
              value={currentSort}
              disabled={isPending}
              aria-label="Ordenar productos del catálogo"
              onChange={(event) => updateParams({ sort: event.target.value })}
              className="rounded-lg border border-stone-200 bg-white px-2 py-2 text-sm text-stone-800"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
