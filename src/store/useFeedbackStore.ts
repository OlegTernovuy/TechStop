import { nanoid } from "nanoid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { format } from "date-fns";
import { uk } from "date-fns/locale";

interface IFeedback {
  id?: string;
  value: string;
  benefits: string;
  disadvantages: string;
  comments?: string;
  name: string;
  email: string;
  date?: string;
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
        const { value, benefits, disadvantages, comments, name, email, date } =
          data;

        const currentDate: Date = new Date();

        const formattedDate2 = format(currentDate, "d MMMM yyyy року", {
          locale: uk,
        });

        const newFeedback: IFeedback = {
          id: nanoid(),
          value,
          benefits,
          disadvantages,
          comments,
          name,
          email,
          date: formattedDate2,
        };
        console.log(newFeedback);
        set({ feedback: [...get().feedback, newFeedback] });
      },
    }),
    { name: "FEEDBACK" }
  )
);
