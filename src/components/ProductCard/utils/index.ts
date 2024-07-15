import toast from "react-hot-toast";
import { IRating } from "@/types";

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
