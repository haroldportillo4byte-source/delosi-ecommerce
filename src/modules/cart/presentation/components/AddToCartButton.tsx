"use client";

import { ShoppingCart } from "lucide-react";
import { addToCart } from "../../infrastructure/store/cart.slice";
import { useAppDispatch } from "@/shared/store/hooks";
import type { Product } from "@/modules/catalog/domain/entities/product";
import { Button } from "@/shared/ui/Button";

type Props = {
  product: Pick<Product, "id" | "title" | "price" | "image">;
};

export function AddToCartButton({ product }: Props) {
  const dispatch = useAppDispatch();

  return (
    <Button
      className="w-full md:w-auto"
      aria-label={`Agregar ${product.title} al carrito`}
      onClick={() =>
        dispatch(
          addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
          }),
        )
      }
    >
      <ShoppingCart className="h-4 w-4" aria-hidden="true" />
      Agregar al carrito
    </Button>
  );
}
