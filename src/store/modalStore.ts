import { create } from "zustand";
import { CatalogModalState } from "../../types";

export const useCatalogModalStore = create<CatalogModalState>((set) => ({
  showCatalog: false,
  setShowCatalog: () =>
    set((state) => ({ showCatalog: (state.showCatalog = !state.showCatalog) })),
}));