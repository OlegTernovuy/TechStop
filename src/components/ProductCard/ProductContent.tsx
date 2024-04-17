"use client";

import { FC, useState, SyntheticEvent, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Rating } from "@mui/material";
import MaterialCheckBox from "./MaterialCheckBox";

import ButtonLabels from "./ButtonLabels";

import novaPost from "/public/product-card-icons/Nova_Poshta_2014_logo 1.svg";
import ukrPost from "/public/product-card-icons/Ukrposhta-ua 1.svg";
import arrow from "/public/product-card-icons/ArrowUpwardFilled.svg";
import feedBack from "/public/product-card-icons/CommentOutlined.svg";
// import TestFavorites from "./TestFavorites";

const checkboxLabels = [
  { id: "warranty", name: "warranty", label: "Гарантія 24/7", price: 500 },
  {
    id: "repairService",
    name: "repairService",
    label: "Сервіс “Ремонт після всього”",
    price: 700,
  },
  {
    id: "insurance",
    name: "insurance",
    label: "Страховка від стихійних лих",
    price: 1000,
  },
  {
    id: "nonWarrantyService",
    name: "nonWarrantyService",
    label: "Сервіс для негарантійних випадків",
    price: 1200,
  },
];

const ProductContent: FC = () => {
  const [value, setValue] = useState<number | null>(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY !== 0) {
        setShowButton(true);
      }
      setShowButton(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleChangeValue = (e: SyntheticEvent, newValue: number | null) => {
    setValue(newValue);
  };

  return (
    <div className="md:max-w-[992px] max-w-[390px] relative">
      <h2 className="mb-4 md:mb-8 text-TechStopBlue font-normal text-2xl lg:text-5xl break-words">
        Геймпад Microsoft Xbox Series X | S Wireless Controller Velocity Green
        (QAU-00091)
      </h2>
      <p className="mb-9 text-SuccessLightGreen font-normal text-xl">
        В наявності
      </p>
      <ul className="flex gap-10 md:pb-8 pb-6 border-b-[1px] lg:items-center flex-wrap">
        <li>
          <Rating
            name="product-rating"
            onChange={handleChangeValue}
            value={value}
            defaultValue={2.5}
            precision={0.5}
          />
        </li>
        <li>
          <Link href="#">
            <ul className="flex gap-3">
              <li>
                {" "}
                <Image
                  src={feedBack}
                  alt="feedBack_icon"
                  width={20}
                  height={20}
                />
              </li>
              <li>
                {" "}
                <p className="uppercase text-TechStopBronze font-medium text-base">
                  Відгуки
                </p>
              </li>
            </ul>
          </Link>
        </li>
      </ul>

      <ButtonLabels />

      <h3 className="mb-11 text-TechStopBlue text-xl md:text-[34px] font-normal">
        Додаткові послуги
      </h3>

      <form className="flex flex-col gap-6 border-b-[1px]">
        <MaterialCheckBox options={checkboxLabels} />
      </form>

      <ul className="flex md:gap-16 md:items-center md:mt-10">
        <h3 className="text-TechStopBlue text-2xl font-normal">Доставка</h3>
        <li>
          <Image src={novaPost} alt="nova_post_logo" width={140} height={50} />
        </li>
        <li>
          {" "}
          <Image src={ukrPost} alt="ukr_post_logo" width={140} height={50} />
        </li>

        <button
          onClick={handleClick}
          type="button"
          className={`rounded-full bg-TechStopBronze w-14 h-14 flex justify-center items-center bottom-[300px] left-[1788px] right-[76px] fixed ${
            showButton ? "block" : "hidden"
          }`}
        >
          <Image src={arrow} alt="arrow_icon" width={16} height={16} />
        </button>
      </ul>
      {/* For testing toggle product to favorites */}
      {/* <TestFavorites /> */}
    </div>
  );
};

export default ProductContent;
