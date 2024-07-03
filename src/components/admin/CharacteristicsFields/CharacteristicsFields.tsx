import React, { FC } from "react";
import CustomInput from "@/components/ProductCard/FeedBack/CustomInput";
import { Control, Controller, FieldArrayWithId } from "react-hook-form";

interface ICharacteristicsFieldsProps {
  characteristicFields: FieldArrayWithId[];
  control: Control<any>;
}

const CharacteristicsFields: FC<ICharacteristicsFieldsProps> = ({
  characteristicFields,
  control,
}) => {
  return (
    <>
      {" "}
      {characteristicFields &&
        characteristicFields?.map((field, index) => (
          <div key={field.id} className="mb-4">
            <CustomInput
              label={`Characteristic ${index + 1} Name`}
              name={`characteristics.${index}.name`}
            />
            <Controller
              name={`characteristics.${index}.description`}
              control={control}
              defaultValue={[""]}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="border resize-none text-TechStopBlue border-gray-300 p-2 w-full"
                  rows={3}
                  placeholder="Enter descriptions separated by commas"
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.split(",").map((desc) => desc.trim())
                    )
                  }
                />
              )}
            />
          </div>
        ))}
    </>
  );
};

export default CharacteristicsFields;
