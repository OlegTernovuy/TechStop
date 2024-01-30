"use client";
import Image from "next/image";
import React from "react";
import ButtonCatalog from "./ButtonCatalog";

function BasketHoverBlock() {
  const createOrder = () => {
    console.log("create order function test");
  };
  return (
    <div className=" z-50 bg-transparent w-[573px] group-hover:block hidden  absolute  max-h-[700px] right-0 ">
      <div className=" pl-8 pt-8 bg-white shadow-sm mt-[38px] pb-8">
        <h2 className="mb-4 text-2xl text-left">Кошик</h2>
        <div className="max-h-[200px] overflow-y-auto mr-1">
          <div className=" flex gap-4 pr-11 mb-4">
            <Image
              src="/productBasketTest.svg"
              alt="test icon"
              width={63}
              height={96}
            />
            <div className=" flex flex-col">
              <div className="flex w-full items-baseline justify-between">
                <h2 className="w-[80%]">
                  Дуже довга назва товару з якимись цифрами HTG-7658
                </h2>
                <Image src="/basket.svg" alt="basket" width={20} height={20} />
              </div>
              <div className="w-full text-end">
                <p className=" text-[10px] text-[rgba(38, 38, 38, 0.50)] line-through">
                  28 999
                </p>
                <p className="text-base text-[#FE0202]">19 999</p>
              </div>
            </div>
          </div>
          <div className=" flex gap-4 pr-11 mb-4">
            <Image
              src="/productBasketTest.svg"
              alt="test icon"
              width={63}
              height={96}
            />
            <div className=" flex flex-col">
              <div className="flex w-full items-baseline justify-between">
                <h2 className="w-[80%]">
                  Дуже довга назва товару з якимись цифрами HTG-7658{" "}
                </h2>
                <Image src="/basket.svg" alt="basket" width={20} height={20} />
              </div>
              <div className="w-full text-end">
                <p className=" text-[10px] text-[rgba(38, 38, 38, 0.50)] line-through">
                  28 999
                </p>
                <p className="text-base text-[#FE0202]">19 999</p>
              </div>
            </div>
          </div>
          <div className=" flex gap-4 pr-11 mb-4">
            <Image
              src="/productBasketTest.svg"
              alt="test icon"
              width={63}
              height={96}
            />
            <div className=" flex flex-col">
              <div className="flex w-full items-baseline justify-between">
                <h2 className="w-[80%]">
                  Дуже довга назва товару з якимись цифрами HTG-7658{" "}
                </h2>
                <Image src="/basket.svg" alt="basket" width={20} height={20} />
              </div>
              <div className="w-full text-end">
                <p className=" text-[10px] text-[rgba(38, 38, 38, 0.50)] line-through">
                  28 999
                </p>
                <p className="text-base text-[#FE0202]">19 999</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-end pr-11">
          <ButtonCatalog
            stylesButton="w-[244px] mt-[32px] bg-deWiseMain text-deWiseBlack"
            title="Оформити замовлення"
            icon={false}
            onClick={createOrder}
          />
        </div>
      </div>
    </div>
  );
}

export default BasketHoverBlock;
