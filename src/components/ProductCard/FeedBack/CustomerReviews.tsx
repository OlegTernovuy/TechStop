import { FC } from "react";
import { Rating } from "@mui/material";

const feedback = [
  { id: 1, user: "Василь", benefits: "Всьо люкс", disadvantages: "Вроді нема" },
  {
    id: 2,
    user: "Олена Ворожка",
    benefits:
      "Дуже хороший геймпад, чоловік дуже тішився, покликав друзів, вже тиждень граються",
    disadvantages: "Чоловіка звільнили з роботи",
  },
  { id: 3, user: "Рома", benefits: "Всьо люкс", disadvantages: "Вроді нема" },
];

const CustomerReviews: FC = () => {
  return (
    <>
      <ul>
        {feedback.map(({ id, user, benefits, disadvantages }) => (
          <li
            key={id}
            className="border border-TechStopBlue40 rounded p-4 mb-8"
          >
            <h4 className="text-TechStopBlue text-xl font-bold"> {user}</h4>
            <Rating
              name="half-feedback-rating-read"
              value={(Math.random() * 10) / 2}
              precision={0.5}
            />
            <p className="text-TechStopBlue mt-4 text-xl font-bold">
              Переваги:{" "}
              <span className="font-normal text-lg ml-1">{benefits}</span>
            </p>
            <p className="text-TechStopBlue mt-1 text-xl font-bold">
              Недоліки:{" "}
              <span className="font-normal text-lg ml-1">{disadvantages}</span>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CustomerReviews;
