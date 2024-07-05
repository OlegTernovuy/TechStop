import React from "react";
import { categoriesThList } from "../constants";

const CategoriesTHList = () => {
  return (
    <tr>
      {categoriesThList.map((item) => (
        <th className="w-1/6 p-3 text-lef" key={item?.id}>
          {item?.title}
        </th>
      ))}
    </tr>
  );
};

export default CategoriesTHList;
