import React, { FC } from "react";
import CustomInput from "@/components/ProductCard/FeedBack/CustomInput";
import { FieldArrayWithId } from "react-hook-form";

interface ICategoryFieldsProps {
  categoryFields: FieldArrayWithId[];
}

const CategoryFields: FC<ICategoryFieldsProps> = ({ categoryFields }) => {
  return (
    <>
      {categoryFields &&
        categoryFields?.map((field, index) => (
          <CustomInput
            key={field.id}
            label={`Category ${index + 1}`}
            name={`categories.${index}`}
          />
        ))}
    </>
  );
};

export default CategoryFields;
