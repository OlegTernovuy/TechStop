import { create } from 'zustand';
import {
    CatalogModalState,
    FilterModalState,
    LoginModalState,
    ShoppingCartModalState,
} from '../types';

export const useCatalogModalStore = create<CatalogModalState>((set) => ({
    showCatalog: false,
    setShowCatalog: () =>
        set((state) => ({
            showCatalog: (state.showCatalog = !state.showCatalog),
        })),
}));

export const useCatalogModalMobileStore = create<CatalogModalState>((set) => ({
    showCatalog: false,
    setShowCatalog: () =>
        set((state) => ({
            showCatalog: (state.showCatalog = !state.showCatalog),
        })),
}));

export const useShoppingCartModalStore = create<ShoppingCartModalState>(
    (set) => ({
        showShoppingCart: false,
        setShowShoppingCart: () =>
            set((state) => ({
                showShoppingCart: (state.showShoppingCart =
                    !state.showShoppingCart),
            })),
    })
);

export const useLoginModalStore = create<LoginModalState>((set) => ({
    showLoginModal: false,
    setShowLoginModal: () =>
        set((state) => ({
            showLoginModal: (state.showLoginModal = !state.showLoginModal),
        })),
}));

export const useFilterModalStore = create<FilterModalState>((set) => ({
    showFilterModal: false,
    setShowFilterModal: () =>
        set((state) => ({
            showFilterModal: (state.showFilterModal = true),
        })),
    setHideFilterModal: () =>
        set((state) => ({
            showFilterModal: (state.showFilterModal = false),
        })),
}));
