import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const BASE_URL = "https://team-project-server-41ev.onrender.com/api";

interface IRatingStore {
  isLoading?: boolean;
  isError?: null | Error;
  value: {
    data: {
      rating: number;
      message?: string;
      status?: number;
    };
  };
  rateProduct: (id: string, ratingValue: number) => Promise<void>;
}

export const useRatingStore = create<IRatingStore>()(
  persist(
    devtools((set, get) => ({
      value: {
        data: {
          rating: 0,
        },
      },
      rateProduct: async (id, ratingValue) => {
        const { isError } = get();
        try {
          set({ isLoading: true, isError: null }, false, "Product-rating");
          const resp = await axios.patch(`${BASE_URL}/products/${id}/rate`, {
            value: ratingValue,
          });

          if (resp.status !== 200 || isError) {
            throw new Error("Something went wrong");
          }

          const data = resp.data;

          set({ value: data });
        } catch (error) {
          console.log((error as Error).message);
          set(
            { isLoading: false, isError: error as Error },
            false,
            "Product-rating"
          );
          toast.error("Something went wrong");
        }
      },
    })),
    { name: "Product-rating", version: 1 }
  )
);
