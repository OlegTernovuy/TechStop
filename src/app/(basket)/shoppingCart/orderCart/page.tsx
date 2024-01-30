"use client";
import Image from "next/image";
import React, { useState } from "react";
import ButtonCatalog from "../../../../../components/ButtonCatalog";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import ProductOrderCard from "../../ProductOrderCard";
import ContactInfoOrder from "../../ContactInfoOrder";
import MaxWidthWrapper from "../../../../../components/MaxWidthWrapper";

function OrderCart() {
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  return (
    <MaxWidthWrapper>
      <div className=" w-full flex items-center justify-between mt-8 mb-6">
        <h2 className="text-[34px] hidden md:block">Оформити замовлення</h2>
        <h2 className=" block text-[24px] md:hidden">Оформлення</h2>
        <button
          onClick={router.back}
          className=" text-[15px] text-deWiseMain flex"
        >
          <Image
            src="/arowBlueIcon.svg"
            alt="arrow icon"
            width={24}
            height={24}
          />
          <span>повертутись до покупок </span>
        </button>
      </div>
      <div className="w-full flex flex-col md:flex-row  ">
        <div className=" w-full md:w-[70%] md:pr-6 ">
          <ProductOrderCard />
          <div className=" text-[16px] font-bold flex items-center justify-between md:hidden">
            <p>Всього</p>
            <p>19 999</p>
          </div>
          <ContactInfoOrder />
          <div className=" w-full mb-4 md:mb-[122px]">
            <TextField
              id="outlined-required"
              label="Коментар до замовлення"
              autoFocus={false}
              defaultValue=" "
              sx={{
                "& .MuiInputBase-root": {
                  height: 80,
                },
              }}
              fullWidth
            />
          </div>
        </div>
        <div className=" w-full md:w-[30%] text-[16px] lg:text-[24px]">
          <div className=" md:pl-6  md:border-[rgba(0, 0, 0, 0.12)] md:border-l">
            <div className="w-full flex items-center justify-between">
              <p>Товар на суму</p>
              <p>28 999</p>
            </div>
            <div className="w-full flex items-center justify-between mt-6">
              <p>Вартість доставки</p>
              <p>150</p>
            </div>
            <div className="w-full flex items-center justify-between mt-[40px] md:mt-24 font-bold mb-4 md:mb-[42px]">
              <p>До сплати</p>
              <p>19 999</p>
            </div>
            <ButtonCatalog
              title="оформити замовлення"
              stylesButton={`w-[100%] h-[52px] ${
                disabled ? "bg-deWiseGrey" : "bg-deWiseMain"
              } ${disabled ? "text-deWiseGreyLight" : "text-deWiseBlack"}`}
              disabled={true}
            />
            <div className="w-[100%] border-b border-[rgba(0, 0, 0, 0.12)] mt-[31px]"></div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default OrderCart;
