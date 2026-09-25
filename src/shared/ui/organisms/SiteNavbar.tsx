"use client";

import Link from "next/link";
import { Suspense } from "react";
import { User } from "lucide-react";
import { CatalogSearchInput } from "@/modules/catalog/presentation/components/CatalogSearchInput";
import { HeaderCartCounter } from "@/modules/cart/presentation/components/HeaderCartCounter";

export function SiteNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#faf8f5]">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-6"
      >
        <Link href="/products" className="shrink-0 text-2xl font-black text-[#ff441f]">
          Delosi
        </Link>

        <Suspense fallback={<div className="mx-auto hidden h-10 max-w-xl flex-1 md:block" />}>
          <CatalogSearchInput className="mx-auto hidden w-full max-w-xl md:block" />
        </Suspense>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-stone-700 hover:bg-white md:flex"
            aria-label="Ingreso (próximamente)"
          >
            <User className="h-4 w-4" aria-hidden="true" />
            Ingreso
          </button>
          <HeaderCartCounter />
        </div>
      </nav>
    </header>
  );
}
