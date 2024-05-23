import { Product } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-hot-toast";

interface IFavoritesStore {
  favorites: Product[];
  toggleProductCardToFavorites: (product: Product) => void;
  isFavoriteProduct: (_id: string) => boolean;
}

export const useFavoritesStore = create(
  persist<IFavoritesStore>(
    (set, get) => ({
      favorites: [],
      toggleProductCardToFavorites: (product: Product) => {
        const { favorites } = get();
        const { title } = product;

        const isFavorites = favorites.some((item) => item._id === product._id);

        if (isFavorites) {
          set((state) => ({
            favorites: state.favorites.filter(
              (item) => item._id !== product._id
            ),
          }));

          toast.success(`Товар ${title} видалено з улюблених 🚮`);
        } else {
          set((state) => ({
            favorites: [...state.favorites, product],
          }));

          toast.success(`Товар ${title} додано до улюблених ➕`);
        }
      },
      isFavoriteProduct: (_id: string) => {
        const { favorites } = get();

        return favorites.some((product) => product._id === _id);
      },
    }),
    { name: "Favorite-products" }
  )
);
