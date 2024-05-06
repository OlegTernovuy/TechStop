import { nanoid } from "nanoid";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IFeedback {
  id?: string;
  feedback: string;
  benefits?: string;
  disadvantages?: string;
  name?: string;
  email?: string;
}

interface IFeedbackStore {
  feedback: IFeedback[];
  addNewFeedback: (data: IFeedback) => void;
}

export const useFeedbackStore = create(
  persist<IFeedbackStore>(
    (set, get) => ({
      feedback: [],
      addNewFeedback: (data) => {
        const { feedback } = data;

        const newFeedback: IFeedback = {
          id: nanoid(),
          feedback,
        };

        set({ feedback: [...get().feedback, newFeedback] });
      },
    }),
    { name: "FEEDBACK" }
  )
);
