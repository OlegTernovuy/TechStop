import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FC, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { AddServices, Product } from "@/types";

interface IOption {
  servicesId?: number;
  servicesTitle: string;
  servicesDesc: string;
  servicesPrice: number;
}

interface IMaterialCheckBox {
  options: AddServices[];
  addService: AddServices[];
}

const MaterialCheckBox: FC<IMaterialCheckBox> = ({ options, addService }) => {
  const [checked, setChecked] = useState<boolean[]>(options.map(() => false));
  // const [addService, setAddService] = useState<IOption[]>([])
  // console.log(addService);

  const handleChecked = (option: AddServices, index: number) => {
    const newItems = [...checked];
    newItems[index] = !newItems[index];
    setChecked(newItems);
    const serviceIndex = addService.findIndex(
      (itemService) => itemService.servicesId === option.servicesId
    );
    if (serviceIndex !== -1) {
      addService.splice(serviceIndex, 1);
    } else {
      addService.push(option);
    }
  };

  return (
    <>
      <FormGroup>
        <ul className="md:pb-8 pb-4">
          {options.map((option, index) => (
            <li
              key={option.servicesId}
              className="flex items-center text-TechStopBlue text-base font-normal"
            >
              {" "}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked[index]}
                    onChange={() => handleChecked(option, index)}
                  />
                }
                label={option.servicesDesc}
              />
              <span className="ml-auto font-medium text-[14px] md:text-xl">
                {option.servicesPrice}₴
              </span>
            </li>
          ))}
        </ul>
      </FormGroup>
    </>
  );
};

export default MaterialCheckBox;
