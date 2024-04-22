import { Product } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-hot-toast";

interface IFavoritesStore {
  favorites: Product[];
  toggleProductCardToFavorites: (product: Product) => void;
}

export const useFavoritesStore = create(
  persist<IFavoritesStore>(
    (set, get) => ({
      favorites: [],
      toggleProductCardToFavorites: (product: Product) => {
        const { favorites } = get();
        const { title } = product;

        const isFavorites = favorites.some((item) => item.id === product.id);

        if (isFavorites) {
          set((state) => ({
            favorites: state.favorites.filter((item) => item.id !== product.id),
          }));

          toast.success(`Product ${title} was deleted from favorites `);
        } else {
          set((state) => ({
            favorites: [...state.favorites, product],
          }));

          toast.success(`Product ${title} was added to favorites 🤌`);
        }
      },
    }),
    { name: "Favorites-product" }
  )
);
