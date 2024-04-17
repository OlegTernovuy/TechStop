import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FC, useState } from "react";

interface IOption {
  id: string;
  name: string;
  label: string;
  price: number;
  idx?: string;
}

interface IMaterialCheckBox {
  options: IOption[];
}

const MaterialCheckBox: FC<IMaterialCheckBox> = ({ options }) => {
  const [checked, setChecked] = useState<boolean[]>(options.map(() => false));

  const handleChecked = (index: number) => {
    const newItems = [...checked];
    newItems[index] = !newItems[index];
    setChecked(newItems);
  };

  return (
    <>
      <FormGroup>
        <ul className="md:pb-8 pb-4">
          {options.map(({ id, label, price }, index) => (
            <li
              key={id}
              className="flex items-center text-TechStopBlue text-base font-normal"
            >
              {" "}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked[index]}
                    onChange={() => handleChecked(index)}
                  />
                }
                label={label}
              />
              <span className="ml-auto font-medium text-[14px] md:text-xl">
                {price}₴
              </span>
            </li>
          ))}
        </ul>
      </FormGroup>
    </>
  );
};

export default MaterialCheckBox;
