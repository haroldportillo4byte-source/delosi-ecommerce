export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-stone-500 md:flex-row md:items-center md:justify-between md:px-6">
        <p>© {new Date().getFullYear()} Delosi Store — Reto técnico e-commerce.</p>
        <p>Next.js · Clean Architecture · Fake Store API</p>
      </div>
    </footer>
  );
}
