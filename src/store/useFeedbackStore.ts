import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Review, IFeedback } from "@/types";

import axios from "axios";

const BASE_URL = "https://team-project-server-41ev.onrender.com/api";

interface IFeedbackStore {
  reviews: IFeedback[];
  getAllFeedbacks: () => Promise<void>;
  addNewFeedback: (newReview: Review) => Promise<void>;
}

export const useFeedbackStore = create(
  persist<IFeedbackStore>(
    (set, get) => ({
      reviews: [],
      addNewFeedback: async (newReview) => {
        try {
          const resp = await axios.post(`${BASE_URL}/reviews`, newReview);
          const reviewData = resp.data;

          set({ reviews: [...get().reviews, reviewData.data] });
        } catch (error) {
          console.log((error as Error).message);
        }
      },

      getAllFeedbacks: async () => {
        try {
          const res = await axios.get(`${BASE_URL}/reviews`);
          if (res.status !== 200) {
            throw new Error("Something went wrong");
          }

          const { data } = res.data;

          set({ reviews: data });
        } catch (error) {
          console.log((error as Error).message);
        }
      },
    }),

    { name: "FEEDBACK" }
  )
);
