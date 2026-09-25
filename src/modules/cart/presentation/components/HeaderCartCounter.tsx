"use client";

import { ShoppingCart } from "lucide-react";
import { getCartTotalItems } from "../../application/cart-totals";
import { openCartSidebar } from "../../infrastructure/store/cart.slice";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";

export function HeaderCartCounter() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const totalItems = getCartTotalItems(items);

  return (
    <button
      type="button"
      onClick={() => dispatch(openCartSidebar())}
      className="relative flex items-center rounded-full p-2 text-stone-700 hover:bg-white"
      aria-label={`Carrito con ${totalItems} productos`}
    >
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 ? (
        <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff441f] px-1 text-xs font-bold text-white">
          {totalItems}
        </span>
      ) : null}
    </button>
  );
}
