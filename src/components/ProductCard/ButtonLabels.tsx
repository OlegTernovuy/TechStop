// "use client";

import { FC } from "react";
import { useCartStore } from "@/store/useCartStore";
import { IDataWithServices } from "@/types";
import { useFavoritesStore } from "@/store/useFavoritesStore";

import CustomToast from "../Global/Toaster/CustomToast";
import toast from "react-hot-toast";
import diagram from "/public/product-card-icons/diagram_White.svg";
import basket from "/public/product-card-icons/basket.svg";
import Image from "next/image";

import ToggleButton from "./ToggleButton";
import { TOAST_MESSAGES } from "@/constants/toastMessages";

const ButtonLabels: FC<IDataWithServices> = ({ product, addService }) => {
  const { price, _id, title } = product.data;
  const { addItemToCart } = useCartStore();
  const { toggleProductCardToFavorites } = useFavoritesStore();
  const { addArrayOfAdditionalServices } = useCartStore();

  const { ADD_SUCCESS } = TOAST_MESSAGES(title);

  const handleAddItem = () => {
    addItemToCart(product.data);
    addArrayOfAdditionalServices(addService, _id);
    toast.success(ADD_SUCCESS);
  };

  return (
    <div className="md:flex items-center border-b-[1px] md:py-10 pt-3 pb-[32px] flex-wrap md:flex-nowrap relative">
      <div className="md:mr-20">
        {" "}
        <p className="line-through text-TechStopBlue font-medium text-nowrap text-xl mb-1">
          28 999 ₴
        </p>
        <p className="text-TechStopRed font-normal text-3xl text-nowrap">
          {price} ₴
        </p>
      </div>

      <ul className="md:flex items-center flex-wrap md:gap-6">
        <li>
          {" "}
          <button
            type="button"
            onClick={handleAddItem}
            className="flex justify-center items-center mb-4 md:mb-0 mt-8 md:mt-0 px-6 py-2 w-full md:w-[249px] h-[52px] text-base uppercase font-medium bg-TechStopBlue text-TechStopWhite rounded shadow-sm hover:bg-TechStopBlue60 focus:bg-TechStopBlue60 transition ease-out duration-300"
          >
            <span className="mr-2">
              {" "}
              <Image src={basket} alt="basket" width={20} height={20} />
            </span>
            <span>купити</span>
          </button>
        </li>
        <li>
          <button
            type="button"
            className="flex justify-center items-center px-6 py-2 w-full md:w-[249px] h-[52px] text-base font-medium uppercase bg-TechStopBronze text-TechStopWhite rounded shadow-sm hover:bg-TechStopBronze20 focus:bg-TechStopBronze20 transition ease-out duration-300"
          >
            <span className="mr-2">
              {" "}
              <Image src={diagram} alt="basket" width={20} height={20} />
            </span>
            купити частинами
          </button>
        </li>
        <li className="absolute top-5  right-0 md:static">
          <button
            type="button"
            onClick={() => toggleProductCardToFavorites(product.data)}
            className=" md:flex justify-center items-center text-TechStopBlue uppercase md:w-[122px] h-[52px] w-full  hover:scale-110 transition ease-out duration-300"
          >
            <ToggleButton _id={_id} text="В обране" />
          </button>
        </li>
      </ul>
      <CustomToast />
    </div>
  );
};

export default ButtonLabels;
