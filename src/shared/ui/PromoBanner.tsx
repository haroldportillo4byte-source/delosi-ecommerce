"use client";

import { useState } from "react";
import { Bike, X } from "lucide-react";

export function PromoBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-[#0c1d4a] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-sm md:px-6">
        <div className="flex items-center gap-2">
          <Bike className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
          <p>¿Nuevo en Delosi? Disfruta de envíos gratis en tu primera compra.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full bg-[#00d763] px-3 py-1 text-xs font-semibold text-[#0c1d4a]"
          >
            Registrarme
          </button>
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="rounded p-1 hover:bg-white/10"
            aria-label="Cerrar banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
