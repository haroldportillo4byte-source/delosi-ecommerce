import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CartItemsState } from "../../domain/entities/cart-item";
import type { Product } from "@/modules/catalog/domain/entities/product";

const initialState: CartItemsState = {
  items: [],
  isSidebarOpen: false,
};

type AddProductPayload = Pick<Product, "id" | "title" | "price" | "image">;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCartItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    addToCart(state, action: PayloadAction<AddProductPayload>) {
      const existing = state.items.find((item) => item.productId === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          productId: action.payload.id,
          title: action.payload.title,
          price: action.payload.price,
          image: action.payload.image,
          quantity: 1,
        });
      }
      state.isSidebarOpen = true;
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.productId !== action.payload);
    },
    incrementCartItem(state, action: PayloadAction<number>) {
      const item = state.items.find((entry) => entry.productId === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementCartItem(state, action: PayloadAction<number>) {
      const item = state.items.find((entry) => entry.productId === action.payload);
      if (!item) {
        return;
      }
      if (item.quantity <= 1) {
        state.items = state.items.filter((entry) => entry.productId !== action.payload);
      } else {
        item.quantity -= 1;
      }
    },
    clearCart(state) {
      state.items = [];
    },
    openCartSidebar(state) {
      state.isSidebarOpen = true;
    },
    closeCartSidebar(state) {
      state.isSidebarOpen = false;
    },
    toggleCartSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const {
  hydrateCartItems,
  addToCart,
  removeFromCart,
  incrementCartItem,
  decrementCartItem,
  clearCart,
  openCartSidebar,
  closeCartSidebar,
  toggleCartSidebar,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
