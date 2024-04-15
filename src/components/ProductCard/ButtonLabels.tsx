import { FC } from "react";

import diagram from "/public/product-card-icons/loan.svg";
import basket from "/public/product-card-icons/basket.svg";
import heart from "/public/product-card-icons/heart.svg";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";

const obj = {
  id: 1,
  inStock: true,
  poster: "/shoppingCardItemTest.svg",
  price: 19990,
  oldPrice: 28990,
  title: "Дуже довга назва товару з якимись цифрами HTG-7658",
  quantity: 1,
  addServices: [],
};

const ButtonLabels: FC = () => {
  const { toggleProductCardToFavorites } = useCartStore();
  const { id } = obj;

  return (
    <div className="md:flex items-center border-b-[1px] md:py-10 pt-3 pb-[32px] flex-wrap md:flex-nowrap relative">
      <div className="md:mr-20">
        {" "}
        <p className="line-through text-TechStopBlue font-medium text-xl mb-1">
          28 999 ₴
        </p>
        <p className="text-TechStopRed font-normal text-3xl text-nowrap">
          12 999 ₴
        </p>
      </div>

      <ul className="md:flex items-center flex-wrap md:flex-nowrap md:gap-6">
        <li>
          {" "}
          <button
            type="button"
            className="flex justify-center items-center mb-4 md:mb-0 mt-8 md:mt-0 px-6 py-2 w-full md:w-[249px] h-[52px] text-base uppercase font-medium bg-TechStopBlue text-TechStopWhite rounded shadow-sm"
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
            className="flex justify-center items-center px-6 py-2 w-full md:w-[249px] h-[52px] text-base font-medium uppercase bg-TechStopBronze text-TechStopWhite rounded shadow-sm"
          >
            <span className="mr-2">
              {" "}
              <Image src={diagram} alt="basket" width={20} height={20} />
            </span>
            купити частинами
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => toggleProductCardToFavorites(id)}
            className="md:flex justify-center items-center text-TechStopBlue uppercase md:w-[122px] h-[52px] w-full absolute top-0 left-0 md:static "
          >
            <span className="mr-2">
              {" "}
              <Image src={heart} alt="basket" width={20} height={20} />
            </span>
            в обране
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ButtonLabels;

// const buttonLabels = [
//   {
//     id: 1,
//     label: "купити",
//     icon: basket,
//     color: "#022750",
//     bgColor: "bg-blue-900",
//   },
//   { id: 2, label: "купити частинами", icon: diagram, color: "", bgColor: "" },
//   { id: 3, label: "В обране", icon: heart, color: "", bgColor: "" },
// ];

{
  /* {buttonLabels.map(({ id, label, icon, color, bgColor }) => (
          <li key={id}>
            <Button
              color={color}
              bgColor={bgColor}
              type="button"
              onClick={() => console.log("click")}
            >
              <p className="flex gap-2">
                {" "}
                <Image src={icon} alt="basket" width={20} height={20} />{" "}
                <span>{label}</span>
              </p>
            </Button>
          </li>
         
        ))} */
}
