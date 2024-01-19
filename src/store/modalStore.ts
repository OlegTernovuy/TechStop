import { create } from 'zustand'

export const useCatalogModalStore = create((set) => ({
  showCatalog: false,
  setShowCatalog: () => set((state: any) => ({ showCatalog: state.showCatalog = !state.showCatalog })),
}))

export const useShoppingCardModalStore = create((set) => ({
  showShoppingCard: false,
  setShowShoppingCard: () => set((state: any) => ({ showShoppingCard: state.showShoppingCard = !state.showShoppingCard })),
}))