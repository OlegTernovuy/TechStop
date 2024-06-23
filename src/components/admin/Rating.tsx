import { IRating } from "@/types";
import React, { FC } from "react";

interface IRatingProps {
  rating: IRating;
}

const Rating: FC<IRatingProps> = ({ rating }) => {
  return (
    <>
      {rating &&
        Object?.entries(rating).map(([key, value]) => (
          <div key={key}>
            <strong>{key}</strong>: {value}
          </div>
        ))}
    </>
  );
};

export default Rating;
