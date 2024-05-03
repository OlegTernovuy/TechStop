'use client'

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FC, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { AddServices, Product } from "@/types";

const checkboxOptions = [
  {
    servicesId: 1,
    servicesDesc: "warranty",
    servicesTitle: "Гарантія 24/7",
    servicesPrice: 500,
  },
  {
    servicesId: 2,
    servicesDesc: "repairService",
    servicesTitle: "Сервіс “Ремонт після всього”",
    servicesPrice: 700,
  },
  {
    servicesId: 3,
    servicesDesc: "insurance",
    servicesTitle: "Страховка від стихійних лих",
    servicesPrice: 1000,
  },
  {
    servicesId: 4,
    servicesDesc: "nonWarrantyService",
    servicesTitle: "Сервіс для негарантійних випадків",
    servicesPrice: 1200,
  },
];

interface IOption {
  servicesId?: number;
  servicesTitle: string;
  servicesDesc: string;
  servicesPrice: number;
}

interface IMaterialCheckBox {
  product: {
    data: Product;
  };
}

const MaterialCheckBox: FC<IMaterialCheckBox> = ({ product }) => {
  const { id: productId } = product.data;

  const [checked, setChecked] = useState<boolean[]>(
    checkboxOptions.map(() => false)
  );

  const { addAdditionalServices, checkAddService } = useCartStore();

  // const handelAddService = (service: AddServices) => {
  //   addAdditionalServices(service, productId);
  // };
    const [addService, setAddService] = useState<IOption[]>([])

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
          {checkboxOptions.map((service, index) => (
            <li
              key={service.servicesId}

              className="flex items-center text-TechStopBlue text-base font-normal"
            >
              {" "}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked[index]}
                    onChange={() => handleChecked(option, index)}
                  />
                  //   <Checkbox
                  //   checked={Boolean(
                  //     checkAddService(service.servicesId, productId)
                  //   )}
                  //   onChange={() => handelAddService(service)}
                  // />
                }

                label={service.servicesTitle}
              />
              <span className="ml-auto font-medium text-[14px] md:text-xl">
                {service.servicesPrice}₴

              </span>
            </li>
          ))}
        </ul>
      </FormGroup>
    </>
  );
};

export default MaterialCheckBox;
