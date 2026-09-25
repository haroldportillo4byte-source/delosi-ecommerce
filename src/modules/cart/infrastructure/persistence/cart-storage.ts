import type { CartItem } from "../../domain/entities/cart-item";

const STORAGE_KEY = "delosi-cart-v1";

type PersistedCart = {
  items: CartItem[];
};

export function loadCartFromStorage(): PersistedCart | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as PersistedCart;
    if (!Array.isArray(parsed.items)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveCartToStorage(items: CartItem[]): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items }));
}
