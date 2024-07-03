import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { Review, IFeedback } from "@/types";

import axios from "axios";
import toast from "react-hot-toast";

import { env } from "../../next.config";

const { NEXT_PUBLIC_BASE_URL } = env;

interface IFeedbackStore {
  reviews: IFeedback[];
  isLoading?: boolean;
  isError?: null | Error;
  getAll: () => Promise<void>;
  getAllFeedbacks: (productId: string) => Promise<void>;
  addNewFeedback: (newReview: Review) => Promise<void>;
  deleteFeedback: (id: string) => Promise<void>;
}

export const useFeedbackStore = create<IFeedbackStore>()(
  persist(
    devtools((set, get) => ({
      reviews: [],
      isError: null,
      isLoading: false,
      getAllFeedbacks: async (productId) => {
        try {
          set({ isLoading: true, isError: null }, false, "getAllFeedbacks");

          const res = await axios.get(
            `${NEXT_PUBLIC_BASE_URL}/reviews?productId=${productId}`
          );
          if (res.status !== 200) {
            throw new Error("Something went wrong");
          }

          const { data } = res.data;

          set(
            { isLoading: false, reviews: data, isError: null },
            false,
            "getAllFeedbacks"
          );
        } catch (error) {
          set(
            { isLoading: false, isError: error as Error },
            false,
            "getAllFeedbacks"
          );
          toast.error((error as Error).message);
        }
      },
      getAll: async () => {
        try {
          set({ isLoading: true, isError: null }, false, "getAll");

          const res = await axios.get(`${NEXT_PUBLIC_BASE_URL}/reviews`);
          if (res.status !== 200) {
            throw new Error("Something went wrong");
          }

          const { data } = res.data;

          set(
            { isLoading: false, reviews: data, isError: null },
            false,
            "getAll"
          );
        } catch (error) {
          set(
            { isLoading: false, isError: error as Error },
            false,
            "getAllFeedbacks"
          );
          toast.error((error as Error).message);
        }
      },
      addNewFeedback: async (newReview) => {
        const { isError, reviews } = get();
        set({ isLoading: true, isError: null }, false, "addNewFeedback");
        try {
          const resp = await axios.post(
            `${NEXT_PUBLIC_BASE_URL}/reviews`,
            newReview
          );

          if (resp.status !== 201 || isError) {
            throw new Error(isError?.message);
          }

          const { data } = resp.data;

          set(
            {
              isLoading: false,
              reviews: [...reviews, data],
              isError: null,
            },
            false,
            "addNewFeedback"
          );
        } catch (error) {
          set(
            { isLoading: false, isError: error as Error },
            false,
            "addNewFeedback"
          );
          console.log((error as Error).message);
        }
      },

      deleteFeedback: async (id) => {
        const { reviews } = get();
        set({ isLoading: true, isError: null }, false, "deleteFeedback");
        try {
          const resp = await axios.delete(
            `${NEXT_PUBLIC_BASE_URL}/reviews/${id}`
          );

          if (resp.status !== 200) {
            throw new Error();
          }

          const filteredFeedbacks = reviews.filter(
            (feedback) => feedback._id !== id
          );

          set(
            { isLoading: false, reviews: filteredFeedbacks, isError: null },
            false,
            "deleteFeedback"
          );
        } catch (error) {
          console.log((error as Error).message);

          set(
            { isLoading: false, isError: error as Error },
            false,
            "deleteFeedback"
          );
        }
      },
    })),
    { name: "Feedback", version: 1 }
  )
);
