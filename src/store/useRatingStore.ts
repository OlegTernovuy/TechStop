import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IRatingStore {
  // rating: ;
  leaveRating: () => void;
}

export const useRatingStore = create(
  persist(
    (set, get) => ({
      rating: [],
      leaveRating: () => {},
    }),
    { name: "product-rating" }
  )
);
