"use client";

import { ProductImage } from "@/shared/ui/atoms/ProductImage";
import { Minus, Plus, X } from "lucide-react";
import { getCartSubtotal, getCartTotalItems } from "../../application/cart-totals";
import { formatCartQuantityControlLabel } from "@/shared/a11y/labels";
import {
  closeCartSidebar,
  decrementCartItem,
  incrementCartItem,
} from "../../infrastructure/store/cart.slice";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { formatPrice } from "@/shared/utils/formatPrice";
import { Button } from "@/shared/ui/atoms/Button";

export function CartSidebar() {
  const dispatch = useAppDispatch();
  const { items, isSidebarOpen } = useAppSelector((state) => state.cart);
  const totalItems = getCartTotalItems(items);
  const subtotal = getCartSubtotal(items);

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity ${
          isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => dispatch(closeCartSidebar())}
        aria-hidden={!isSidebarOpen}
      />
      <aside
        className={`fixed top-0 right-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-xl transition-transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role={isSidebarOpen ? "dialog" : undefined}
        aria-modal={isSidebarOpen ? true : undefined}
        aria-label="Carrito de compras"
        inert={!isSidebarOpen ? true : undefined}
      >
        <div className="flex items-center justify-between border-b border-stone-200 px-4 py-4">
          <h2 className="text-lg font-bold text-stone-900">Tu carrito ({totalItems})</h2>
          <button
            type="button"
            onClick={() => dispatch(closeCartSidebar())}
            className="rounded-full p-2 hover:bg-stone-100"
            aria-label="Cerrar carrito"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <p className="text-sm text-stone-500">Aún no agregaste productos.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                    <ProductImage
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="64px"
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium text-stone-900">{item.title}</p>
                    <p className="text-xs text-stone-500">{formatPrice(item.price)} c/u</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => dispatch(decrementCartItem(item.productId))}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 text-stone-700 hover:bg-stone-50"
                        aria-label={formatCartQuantityControlLabel("remove", item.title)}
                      >
                        <Minus className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <span className="min-w-6 text-center text-sm font-semibold text-stone-900">
                        <span className="sr-only">Cantidad: </span>
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => dispatch(incrementCartItem(item.productId))}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 text-stone-700 hover:bg-stone-50"
                        aria-label={formatCartQuantityControlLabel("add", item.title)}
                      >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-stone-200 px-4 py-4">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-stone-600">Subtotal</span>
            <span className="font-bold text-stone-900">{formatPrice(subtotal)}</span>
          </div>
          <Button className="w-full" disabled={items.length === 0}>
            Ir a pagar
          </Button>
        </div>
      </aside>
    </>
  );
}
