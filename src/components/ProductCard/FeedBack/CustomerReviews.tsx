import { FC } from "react";
import { Rating } from "@mui/material";
import { useFeedbackStore } from "@/store/useFeedbackStore";

const CustomerReviews: FC = () => {
  const { feedback } = useFeedbackStore();

  return (
    <>
      <ul>
        {feedback.map(
          ({ id, value, benefits, comments, disadvantages, name, date }) => (
            <li
              key={id}
              className="relative border border-TechStopBlue40 rounded p-4 mb-8"
            >
              <h4 className="text-TechStopBlue text-xl font-bold"> {name}</h4>
              <Rating
                name="half-feedback-rating-read"
                value={Number(value)}
                precision={0.5}
                readOnly
              />
              <ul>
                <li className="flex items-baseline">
                  {" "}
                  <p className="text-TechStopBlue mt-1 mr-1 text-xl font-bold">
                    Переваги:{" "}
                  </p>
                  <p className="text-TechStopBlue font-normal text-lg ml-1">
                    {benefits}
                  </p>
                </li>

                <li className="flex items-baseline">
                  {" "}
                  <p className="text-TechStopBlue mt-1 mr-1 text-xl font-bold">
                    Недоліки:{" "}
                  </p>
                  <p className="text-TechStopBlue font-normal text-lg ml-1">
                    {disadvantages}
                  </p>
                </li>

                <li className="flex items-baseline">
                  {" "}
                  <p className="text-TechStopBlue mt-1 mr-1 text-xl font-bold">
                    Коментарі:{" "}
                  </p>
                  <p className="text-TechStopBlue font-normal text-lg ml-1">
                    {comments}
                  </p>
                </li>
              </ul>
              <p className="hidden md:block text-TechStopBlue absolute right-4 top-4">
                {date}
              </p>
            </li>
          )
        )}
      </ul>
    </>
  );
};

export default CustomerReviews;
