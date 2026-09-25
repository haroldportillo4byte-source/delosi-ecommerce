import type { Product } from "@/modules/catalog/domain/entities/product";

export const sampleProduct: Product = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack",
  price: 109.95,
  description: "Your perfect pack for everyday use and walks in the forest.",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: { rate: 3.9, count: 120 },
};

export const cheapProduct: Product = {
  ...sampleProduct,
  id: 2,
  title: "Budget Gadget",
  price: 25,
  category: "electronics",
};
