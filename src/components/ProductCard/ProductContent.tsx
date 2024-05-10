"use client";

import { FC, useState, SyntheticEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Rating } from "@mui/material";
import MaterialCheckBox from "./MaterialCheckBox";
import { AddServices, IData } from "@/types";

import ButtonLabels from "./ButtonLabels";

import novaPost from "/public/product-card-icons/Nova_Poshta_2014_logo 1.svg";
import ukrPost from "/public/product-card-icons/Ukrposhta-ua 1.svg";
import feedBack from "/public/product-card-icons/CommentOutlined.svg";

const checkboxLabels = [
  {
    servicesId: 1,
    servicesTitle: "warranty",
    servicesDesc: "Гарантія 24/7",
    servicesPrice: 500,
  },
  {
    servicesId: 2,
    servicesTitle: "repairService",
    servicesDesc: "Сервіс “Ремонт після всього”",
    servicesPrice: 700,
  },
  {
    servicesId: 3,
    servicesTitle: "insurance",
    servicesDesc: "Страховка від стихійних лих",
    servicesPrice: 1000,
  },
  {
    servicesId: 4,
    servicesTitle: "nonWarrantyService",
    servicesDesc: "Сервіс для негарантійних випадків",
    servicesPrice: 1200,
  },
];

const ProductContent: FC<IData> = ({ product }) => {
  const { title, inStock, price, id } = product.data;

  const [value, setValue] = useState<number | null>(0);

  const [addService, setAddService] = useState<AddServices[]>([]);

  const handleChangeValue = (e: SyntheticEvent, newValue: number | null) => {
    setValue(newValue);
  };

  return (
    <div className="md:max-w-[992px] relative">
      <h2 className="mb-4 md:mb-8 text-TechStopBlue font-normal text-2xl md:text-3xl lg:text-5xl break-words md:mt-0 mt-4">
        {title}
      </h2>
      <p
        className={`mb-9  font-normal text-xl ${
          inStock ? "text-SuccessLightGreen" : "text-deWiseRed"
        }`}
      >
        {inStock ? " В наявності" : "Не має в наявності"}
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
        <li className="ml-auto md:ml-0">
          <Link
            href={`/products/${id}/feedback`}
            className="uppercase text-TechStopBronze font-medium text-base flex gap-3 hover:scale-110 transition ease-out duration-300"
          >
            <Image src={feedBack} alt="feedBack_icon" width={20} height={20} />
            <span> Відгуки (0)</span>
          </Link>
        </li>
      </ul>

      <ButtonLabels product={product} addService={addService} />

      <h3 className="mb-11 text-TechStopBlue text-xl md:text-[34px] font-normal">
        Додаткові послуги
      </h3>

      <form className="flex flex-col gap-6 border-b-[1px]">
        <MaterialCheckBox options={checkboxLabels} addService={addService} />
      </form>

      <div className="md:flex items-center flex-wrap md:mt-10 mt-2">
        <h3 className="text-TechStopBlue text-2xl font-normal md:mr-[38px] mb-6">
          Доставка
        </h3>
        <ul className="flex flex-wrap gap-[38px] md:gap-16  md:items-center ">
          <li>
            <Image
              src={novaPost}
              alt="nova_post_logo"
              width={140}
              height={50}
            />
          </li>
          <li>
            {" "}
            <Image src={ukrPost} alt="ukr_post_logo" width={140} height={50} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductContent;
