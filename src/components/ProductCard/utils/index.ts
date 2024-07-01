import toast from "react-hot-toast";
import { IRating } from "@/types";

export const handleChangeValue = async (
  newValue: number,
  _id: string,
  handler: (_id: string, newValue: number) => Promise<void>
): Promise<void> => {
  if (!newValue) {
    toast.error("Something went wrong");
    return;
  }
  await handler(_id, Number(newValue));

  toast.success("Дякуємо за оцінку 🤝");
};

export const calculateAverageRating = (rating: IRating): number => {
  const totalVotes = Object.values(rating).reduce(
    (sum, votes) => sum + votes,
    0
  );

  const totalScore = Object.entries(rating).reduce(
    (sum, [score, votes]) => sum + parseInt(score) * votes,
    0
  );

  return totalVotes ? totalScore / totalVotes : 0;
};
