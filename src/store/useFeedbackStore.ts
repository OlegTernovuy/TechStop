import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Review, IFeedback } from "@/types";

import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "https://team-project-server-41ev.onrender.com/api";

interface IFeedbackStore {
  reviews: IFeedback[];
  getAllFeedbacks: () => Promise<void>;
  addNewFeedback: (newReview: Review) => Promise<void>;
  deleteFeedback: (id: string) => Promise<void>;
}

export const useFeedbackStore = create(
  persist<IFeedbackStore>(
    (set, get) => ({
      reviews: [],
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
      addNewFeedback: async (newReview) => {
        try {
          const resp = await axios.post(`${BASE_URL}/reviews`, newReview);
          const reviewData = resp.data;

          set({ reviews: [...get().reviews, reviewData.data] });
        } catch (error) {
          console.log((error as Error).message);
        }
      },

      deleteFeedback: async (id) => {
        const { reviews } = get();
        try {
          const resp = await axios.delete(`${BASE_URL}/reviews/${id}`);

          if (resp.status !== 200) {
            return;
          }
          toast.success(resp?.data?.message);

          const filteredFeedbacks = reviews.filter(
            (feedback) => feedback._id !== id
          );

          set({ reviews: filteredFeedbacks });
        } catch (error) {
          console.log((error as Error).message);
        }
      },
    }),

    { name: "FEEDBACK" }
  )
);
