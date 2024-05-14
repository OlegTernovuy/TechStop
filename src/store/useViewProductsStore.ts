import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types";

interface ViewProductsState {
  viewProducts: Product[];
  addItemToViewProducts: (item: Product) => void;
  removeItemFromViewProducts: (productId: string) => void;
}

export const useViewProductsStore = create(
  persist<ViewProductsState>(
    (set, get) => ({
      viewProducts: [],

      addItemToViewProducts: (item) => {
        const itemExists = get().viewProducts.find(
          (cartItem) => cartItem._id === item._id
        );
        if (itemExists) {
          set({ viewProducts: [...get().viewProducts] });
        } else {
          set({ viewProducts: [...get().viewProducts, { ...item }] });
        }
      },
      removeItemFromViewProducts: (productId) => {
        const itemExists = get().viewProducts.find(
          (item) => item._id === productId
        );

        if (itemExists) {
          const updateCartItems = get().viewProducts.filter(
            (item) => item._id !== productId
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
