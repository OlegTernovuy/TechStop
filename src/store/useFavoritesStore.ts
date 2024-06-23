import { Product } from "@/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { toast } from "react-hot-toast";
import { TOAST_MESSAGES } from "@/constants/toastMessages";

interface IFavoritesStore {
  favorites: Product[];
  toggleProductCardToFavorites: (product: Product) => void;
  isFavoriteProduct: (_id: string) => boolean;
}

export const useFavoritesStore = create<IFavoritesStore>()(
  persist(
    devtools((set, get) => ({
      favorites: [],
      toggleProductCardToFavorites: (product: Product) => {
        const { favorites } = get();
        const { title } = product;
        const { ADD_SUCCESS_TO_FAVORITES, DELETE_SUCCESS_FROM_FAVORITES } =
          TOAST_MESSAGES(title);

        const isFavorites = favorites.some((item) => item._id === product._id);

        if (isFavorites) {
          set(
            {
              favorites: favorites.filter((item) => item._id !== product._id),
            },
            false,
            "toggleProductCardToFavorites"
          );

          toast.success(DELETE_SUCCESS_FROM_FAVORITES);
        } else {
          set(
            { favorites: [...favorites, product] },
            false,
            "toggleProductCardToFavorites"
          );

          toast.success(ADD_SUCCESS_TO_FAVORITES);
        }
      },
      isFavoriteProduct: (_id: string) => {
        const { favorites } = get();

        return favorites.some((product) => product._id === _id);
      },
    })),
    { name: "Favorite-products", version: 1 }
  )
);
