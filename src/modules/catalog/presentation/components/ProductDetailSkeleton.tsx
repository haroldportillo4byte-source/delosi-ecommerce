export function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <div className="mb-4 h-3 w-32 animate-pulse rounded bg-stone-200" />

      <article className="grid gap-8 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-stone-200 md:grid-cols-2 md:p-8">
        <div className="aspect-square animate-pulse rounded-2xl bg-stone-200" />

        <div className="flex flex-col animate-pulse">
          <div className="h-4 w-24 rounded bg-stone-200" />
          <div className="mt-2 h-8 w-full max-w-md rounded bg-stone-200 md:h-9" />
          <div className="mt-3 flex gap-3">
            <div className="h-9 w-28 rounded bg-stone-200" />
            <div className="h-5 w-36 rounded bg-stone-100" />
          </div>
          <div className="mt-6 space-y-2 flex-1">
            <div className="h-3 w-full rounded bg-stone-100" />
            <div className="h-3 w-full rounded bg-stone-100" />
            <div className="h-3 w-full rounded bg-stone-100" />
            <div className="h-3 w-4/5 rounded bg-stone-100" />
          </div>
          <div className="mt-8 h-12 w-full max-w-xs rounded-xl bg-stone-200" />
        </div>
      </article>
    </div>
  );
}
