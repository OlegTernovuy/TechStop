import { create } from "zustand";
import { CatalogModalState, ShoppingCardModalState } from "../../types";

export const useCatalogModalStore = create<CatalogModalState>((set) => ({
  showCatalog: false,
  setShowCatalog: () =>
    set((state) => ({ showCatalog: (state.showCatalog = !state.showCatalog) })),
}));

export const useShoppingCardModalStore = create<ShoppingCardModalState>(
  (set) => ({
    showShoppingCard: false,
    setShowShoppingCard: () =>
      set((state) => ({
        showShoppingCard: (state.showShoppingCard = !state.showShoppingCard),
      })),
  })
);
