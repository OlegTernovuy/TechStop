import { FC } from "react";
import { useFieldArray, Control } from "react-hook-form";
import CustomInput from "@/components/ProductCard/FeedBack/CustomInput";

interface IFieldArrayProps {
  control: Control<any>;
  name: string;
  labelPrefix: string;
}

const FieldArray: FC<IFieldArrayProps> = ({ control, name, labelPrefix }) => {
  const { fields, append } = useFieldArray({
    control,
    name,
  });

  return (
    <>
      {fields &&
        fields?.map((field, index) => (
          <CustomInput
            key={field.id}
            label={`${labelPrefix} ${index + 1}`}
            name={`${name}.${index}`}
          />
        ))}
      <button
        type="button"
        onClick={() => append("")}
        className="text-white border px-4 py-2 bg-blue-500 hover:bg-blue-700"
      >
        Add {labelPrefix}
      </button>
    </>
  );
};

export default FieldArray;
