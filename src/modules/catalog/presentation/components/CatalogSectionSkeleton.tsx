import { ProductGridSkeleton } from "./ProductGridSkeleton";

export function CatalogSectionSkeleton() {
  return (
    <div className="space-y-8" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Actualizando catálogo…</span>
      <div>
        <div className="mb-3 h-6 w-48 animate-pulse rounded bg-stone-200" />
        <div className="flex gap-4 overflow-hidden pb-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-24 w-24 shrink-0 animate-pulse rounded-2xl bg-stone-200"
            />
          ))}
        </div>
      </div>
      <div>
        <div className="mb-4 h-7 w-56 animate-pulse rounded bg-stone-200" />
        <ProductGridSkeleton />
      </div>
    </div>
  );
}
