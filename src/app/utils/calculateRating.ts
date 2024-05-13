import { IRating } from "@/types";

const calculateRating = (rating: IRating): number => {
  const sum = Object.entries(rating).reduce((acc, [key, value]) => {
    const ratingKey = parseInt(key);
    const ratingValue = value as number;
    return acc + ratingKey * ratingValue;
  }, 0);

  const count = Object.values(rating).reduce((acc, value) => acc + value, 0);

  if (count === 0) {
    return 0;
  }

  return Math.round(sum / count / 0.5) * 0.5;
};

export default calculateRating;
