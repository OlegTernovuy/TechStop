import Image from "next/image";
import React from "react";
import ThreeDotsSymbolMobile from "../../components/(ShoppingCart)/ThreeDotsSymbolMobile";

function ProductOrderCard() {
  return (
    <div className="flex w-full justify-between mb-8">
      <div className="flex gap-6 w-[70%]">
        <Image
          src="/productBasketTest.svg"
          alt="basket"
          width={112}
          height={171}
        />
        <div className="flex flex-col justify-between md:justify-normal ">
          <h2 className="text-[12px] lg:text-[24px]">
            Дуже довга назва товару з якимись цифрами HTG-7658
          </h2>
          <p className="text-[12px] lg:text-[24px]"> 1 шт.</p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between w-[30%]">
        <div className="flex gap-2 mt-1">
          <Image
            src="/editIcon.svg"
            alt="edit icon"
            className="lg:w-[24px] lg:h-[24px] hidden md:block"
            width={10}
            height={10}
          />
          <span className="text-deWiseMain uppercase text-[10px] lg:text-[15px] hidden md:block">
            редагувати
          </span>
          <div className=" block md:hidden">
            <ThreeDotsSymbolMobile />
          </div>
        </div>
        <div className="flex flex-col justify-end items-end">
          <p className="text-[10px] lg:text-[20px] line-through text-[#262626]">
            28 999
          </p>
          <p className="text-[16px] lg:text-[34px] text-[#FE0202]">19 999</p>
        </div>
      </div>
    </div>
  );
}

export default ProductOrderCard;
