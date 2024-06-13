import axios from "axios";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const BASE_URL = "https://team-project-server-41ev.onrender.com/api";

interface IRatingStore {
  isLoading?: boolean;
  isError?: null | Error;
  value: number;
  rateProduct: (id: string, ratingValue: number) => Promise<void>;
}

export const useRatingStore = create<IRatingStore>()(
  persist(
    devtools((set, get) => ({
      value: 0,

      rateProduct: async (id, ratingValue) => {
        const { isError } = get();

        try {
          set({ isLoading: true, isError: null }, false, "Rate-product");

          const resp = await axios.patch(`${BASE_URL}/products/${id}/rate`, {
            value: ratingValue,
          });

          if (resp.status !== 200 || isError) {
            throw new Error("Something went wrong");
          }

          const {
            data: { rating },
          } = resp.data;

          set(
            { isLoading: false, isError: null, value: rating },
            false,
            "Rate-product"
          );
        } catch (error) {
          set(
            { isLoading: false, isError: error as Error },
            false,
            "Rate-product"
          );
          console.log((error as Error).message);
        }
      },
    })),
    { name: "Product-rating", version: 1 }
  )
);
