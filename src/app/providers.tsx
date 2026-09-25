"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { loadCartFromStorage } from "@/modules/cart/infrastructure/persistence/cart-storage";
import { hydrateCartItems } from "@/modules/cart/infrastructure/store/cart.slice";
import { makeStore, type AppStore } from "@/shared/store";

export function Providers({ children }: { children: React.ReactNode }) {
  const [store] = useState<AppStore>(() => makeStore());

  useEffect(() => {
    const persisted = loadCartFromStorage();
    if (persisted?.items.length) {
      store.dispatch(hydrateCartItems(persisted.items));
    }
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
