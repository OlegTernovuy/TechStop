import { nanoid } from "nanoid";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IFeedback {
  id: string;
  comments: string;
  benefits: string;
  disadvantages: string;
  name: string;
  email: string;
}

interface IFeedbackStore {
  baseFeedbacks: IFeedback[];
  addNewBaseFeedback: (data: IFeedback) => void;
}

export const useBaseFeedbackStore = create(
  persist<IFeedbackStore>(
    (set, get) => ({
      baseFeedbacks: [],
      addNewBaseFeedback: (data) => {
        const { comments, benefits, disadvantages, name, email } = data;

        const newFeedback: IFeedback = {
          id: nanoid(),
          comments,
          benefits,
          disadvantages,
          name,
          email,
        };
        console.log(newFeedback);

        set({ baseFeedbacks: [...get().baseFeedbacks, newFeedback] });
      },
    }),
    { name: "BASE-FEEDBACK" }
  )
);
