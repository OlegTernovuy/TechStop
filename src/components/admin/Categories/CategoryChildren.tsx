import React, { FC } from "react";
import { ICategoryChildren } from "../types";

interface ICategoryChildrenProps {
  categoryChildren: ICategoryChildren[] | [];
}

const CategoryChildren: FC<ICategoryChildrenProps> = ({ categoryChildren }) => {
  return (
    <div>
      {Array.isArray(categoryChildren.length > 0)
        ? categoryChildren.map((item, idx) => <li key={idx}>{item as any}</li>)
        : "Empty"}
    </div>
  );
};

export default CategoryChildren;
