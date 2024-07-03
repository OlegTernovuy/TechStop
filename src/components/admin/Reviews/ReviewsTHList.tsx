import React from "react";
import { reviewsThList } from "../constants";

const ReviewsTHList = () => {
  return (
    <tr>
      {reviewsThList.map((item) => (
        <th className="w-1/6 p-3 text-lef" key={item?.id}>
          {item?.title}
        </th>
      ))}
    </tr>
  );
};

export default ReviewsTHList;
