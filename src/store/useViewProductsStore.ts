import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types";

interface ViewProductsState {
  viewProducts: Product[];
  addItemToViewProducts: (item: Product) => void;
  removeItemFromViewProducts: (productId: number) => void;
}

export const useViewProductsStore = create(
  persist<ViewProductsState>(
    (set, get) => ({
      viewProducts: [],

      addItemToViewProducts: (item) => {
        const itemExists = get().viewProducts.find(
          (cartItem) => cartItem.id === item.id
        );
        if (itemExists) {
          set({ viewProducts: [...get().viewProducts] });
        } else {
          set({ viewProducts: [...get().viewProducts, { ...item }] });
        }
      },
      removeItemFromViewProducts: (productId) => {
        const itemExists = get().viewProducts.find(
          (item) => item.id === productId
        );

        if (itemExists) {
          const updateCartItems = get().viewProducts.filter(
            (item) => item.id !== productId
          );
          set({ viewProducts: updateCartItems });
        }
      },
    }),
    {
      name: "ViewProducts",
    }
  )
);
