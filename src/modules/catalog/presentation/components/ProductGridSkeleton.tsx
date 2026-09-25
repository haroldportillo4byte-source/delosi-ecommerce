export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-2xl bg-white ring-1 ring-stone-200"
        >
          <div className="aspect-[4/3] bg-stone-200" />
          <div className="space-y-2 p-4">
            <div className="h-4 rounded bg-stone-200" />
            <div className="h-4 w-2/3 rounded bg-stone-200" />
            <div className="h-3 w-1/3 rounded bg-stone-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
