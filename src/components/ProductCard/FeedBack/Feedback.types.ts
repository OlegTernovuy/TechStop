import { FieldErrors } from "react-hook-form";

export enum Rating {
  excellent = 5,
  veryGood = 4,
  good = 3,
  notToBad = 2,
  bad = 1,
}

export const ratingValues: Rating[] = [
  Rating.excellent,
  Rating.veryGood,
  Rating.good,
  Rating.notToBad,
  Rating.bad,
];

export interface IFormRateProps {
  errors: FieldErrors<{
    advantages: string;
    disadvantages: string;
    comment?: string;
    userName?: string;
    userEmail: string;
    productId?: string;
  }>;
}
