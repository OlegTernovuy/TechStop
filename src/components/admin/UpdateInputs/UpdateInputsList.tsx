import React, { FC } from "react";
import UpdateInputsListItem from "./UpdateInputsListItem";
import { IUpdateInputsErrors } from "../types";
import { updateInputsList } from "../constants";
import CustomInput from "@/components/ProductCard/FeedBack/CustomInput";

const UpdateInputsList: FC<IUpdateInputsErrors> = ({ errors }) => {
  const { title } = errors;

  return (
    <ul className="flex flex-col gap-3 min-w-full">
      <li>
        {" "}
        <CustomInput name="title" label="Title" />
        {title && <p className="text-red-500 ">{title?.message}</p>}
      </li>
      {updateInputsList.map((item) => (
        <li key={item.id}>
          <UpdateInputsListItem item={item} />
        </li>
      ))}
    </ul>
  );
};

export default UpdateInputsList;
