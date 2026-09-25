export type CartItem = {
  productId: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

export type CartItemsState = {
  items: CartItem[];
  isSidebarOpen: boolean;
};
