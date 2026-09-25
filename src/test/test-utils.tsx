import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/shared/store";

type ExtendedRenderOptions = Omit<RenderOptions, "wrapper"> & {
  store?: AppStore;
};

export function renderWithProviders(ui: ReactElement, { store = makeStore(), ...options }: ExtendedRenderOptions = {}) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...options }) };
}
