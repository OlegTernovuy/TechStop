import { FC } from "react";
import { Rating } from "@mui/material";
import { useFeedbackStore } from "@/store/useFeedbackStore";

const feedbackCollection = [
  { id: 1, user: "Василь", benefits: "Всьо люкс", disadvantages: "Вроді нема" },
  {
    id: 2,
    user: "Олена Ворожка",
    benefits:
      "Дуже хороший геймпад, чоловік дуже тішився, покликав друзів, вже тиждень граються",
    disadvantages: "Чоловіка звільнили з роботи",
  },
  { id: 3, user: "Рома", benefits: "Всьо люкс", disadvantages: "Вроді нема" },
  { id: 4, user: "Рома", benefits: "Всьо люкс", disadvantages: "Вроді нема" },
];

const CustomerReviews: FC = () => {
  const { feedback } = useFeedbackStore();

  return (
    <>
      <ul>
        {feedback.map(({ feedback, id }) => (
          <li
            key={id}
            className="relative border border-TechStopBlue40 rounded p-4 mb-8"
          >
            <h4 className="text-TechStopBlue text-xl font-bold">
              {" "}
              {feedbackCollection[0].user}
            </h4>
            <Rating
              name="half-feedback-rating-read"
              value={(Math.random() * 10) / 2}
              precision={0.5}
              readOnly
            />
            <ul className="flex items-baseline">
              {" "}
              <li>
                <p className="text-TechStopBlue mt-4 mr-1 text-xl font-bold">
                  Переваги:{" "}
                  {/* <span className="font-normal text-lg ml-1">
                {feedback.feedback}
              </span> */}
                </p>
              </li>{" "}
              <li>
                {" "}
                <p className="text-TechStopBlue font-normal text-lg ml-1">
                  {/* {benefits} */}
                </p>
              </li>{" "}
              <p className="text-TechStopBlue font-normal text-lg ml-1">
                {feedback}
              </p>
            </ul>
            <ul className="flex items-baseline">
              <li>
                {" "}
                <p className="text-TechStopBlue mt-1 mr-1 text-xl font-bold">
                  Недоліки:{" "}
                </p>
              </li>
              <li>
                {" "}
                <p className="text-TechStopBlue font-normal text-lg ml-1">
                  {/* {disadvantages} */}
                </p>
              </li>
            </ul>
            <p className="hidden md:block text-TechStopBlue absolute right-4 top-4">
              4 квітня 2024 року
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CustomerReviews;
