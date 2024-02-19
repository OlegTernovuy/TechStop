import { create } from "zustand";
import { CatalogModalState, ShoppingCartModalState } from "../types";

export const useCatalogModalStore = create<CatalogModalState>((set) => ({
  showCatalog: false,
  setShowCatalog: () =>
    set((state) => ({ showCatalog: (state.showCatalog = !state.showCatalog) })),
}));

export const useShoppingCartModalStore = create<ShoppingCartModalState>(
  (set) => ({
    showShoppingCart: false,
    setShowShoppingCart: () =>
      set((state) => ({
        showShoppingCart: (state.showShoppingCart = !state.showShoppingCart),
      })),
  })
);
