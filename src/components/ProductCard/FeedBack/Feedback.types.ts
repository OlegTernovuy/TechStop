import { FieldErrors } from "react-hook-form";

export enum Rating {
  excellent = "5",
  veryGood = "4",
  good = "3",
  notToBad = "2",
  bad = "1",
}

export interface IFormFeedback {
  id?: string;
  comments?: string;
  value: string;
  benefits: string;
  disadvantages: string;
  name: string;
  email: string;
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
    benefits: string;
    disadvantages: string;
    comments?: string;
    name: string;
    email: string;
  }>;
}
