import { ProductGridSkeleton } from "@/modules/catalog/presentation/components/ProductGridSkeleton";

export default function ProductsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
      <div className="mb-6 h-10 w-64 animate-pulse rounded-lg bg-stone-200" />
      <ProductGridSkeleton />
    </div>
  );
}
