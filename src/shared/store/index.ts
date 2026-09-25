import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { cartReducer } from "@/modules/cart/infrastructure/store/cart.slice";
import { saveCartToStorage } from "@/modules/cart/infrastructure/persistence/cart-storage";

const cartPersistenceMiddleware: Middleware = (storeApi) => (next) => (action) => {
  const result = next(action);
  if (typeof action === "object" && action !== null && "type" in action) {
    const type = String(action.type);
    if (type.startsWith("cart/") && !type.includes("Sidebar")) {
      saveCartToStorage(storeApi.getState().cart.items);
    }
  }
  return result;
};

export function makeStore() {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cartPersistenceMiddleware),
    devTools: process.env.NODE_ENV !== "production",
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
