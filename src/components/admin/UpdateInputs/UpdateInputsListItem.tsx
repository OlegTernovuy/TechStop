import CustomInput from "@/components/ProductCard/FeedBack/CustomInput";
import React, { FC } from "react";

export interface IUpdateInputsListItemProps {
  item: {
    id: number;
    name: string;
    label: string;
  };
}

const UpdateInputsListItem: FC<IUpdateInputsListItemProps> = ({ item }) => {
  const { name, label } = item;

  return <CustomInput name={name} label={label} />;
};

export default UpdateInputsListItem;
