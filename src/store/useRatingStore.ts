import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const BASE_URL = "https://team-project-server-41ev.onrender.com/api";

interface IRatingStore {
  value: {
    data: {
      rating: number;
      message?: string;
      status?: number;
    };
  };
  leaveRating: (_id: string, ratingValue: number) => Promise<void>;
}

export const useRatingStore = create(
  persist<IRatingStore>(
    (set, get) => ({
      value: {
        data: {
          rating: 0,
        },
      },
      leaveRating: async (_id, ratingValue) => {
        try {
          const resp = await axios.patch(`${BASE_URL}/products/${_id}/rate`, {
            value: ratingValue,
          });
          const data = resp.data;

          set({ value: data });
        } catch (error) {
          console.log((error as Error).message);
        }
      },
    }),
    { name: "PRODUCT-RATING" }
  )
);
