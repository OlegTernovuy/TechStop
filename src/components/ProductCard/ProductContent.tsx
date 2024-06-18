"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Rating } from "@mui/material";
import MaterialCheckBox from "./MaterialCheckBox";
import { AddServices, IData } from "@/types";

import { useRatingStore } from "@/store/useRatingStore";
import { useFeedbackStore } from "@/store/useFeedbackStore";

import ButtonLabels from "./ButtonLabels";
import CustomToast from "../Global/Toaster/CustomToast";

import novaPost from "/public/product-card-icons/Nova_Poshta_2014_logo 1.svg";
import ukrPost from "/public/product-card-icons/Ukrposhta-ua 1.svg";
import feedBack from "/public/product-card-icons/CommentOutlined.svg";

import { handleChangeValue } from "./utils";
import { checkboxLabels } from "@/constants/productCard";

const ProductContent: FC<IData> = ({ product }) => {
  const { title, inStock, _id } = product?.data;
  const { value, rateProduct } = useRatingStore();
  const { reviews, getAllFeedbacks } = useFeedbackStore();

  const [addService, setAddService] = useState<AddServices[]>([]);
  const [hasReviewed, setHasReviewed] = useState<boolean>(false);

  useEffect(() => {
    getAllFeedbacks(_id);
  }, [getAllFeedbacks, _id]);

  const handleRatingChange = async (newValue: number) => {
    await handleChangeValue(
      newValue,
      _id,
      async () => await rateProduct(_id, newValue)
    );
    setHasReviewed(true);
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
        {inStock ? " В наявності" : "Немає в наявності"}
      </p>
      <ul className="flex gap-10 md:pb-8 pb-6 border-b-[1px] lg:items-center flex-wrap">
        <li>
          <Rating
            name="product-rating"
            onChange={(e, newValue) =>
              handleRatingChange(Math.floor(newValue ?? 0))
            }
            value={Number(value.toFixed(2)) ?? 0}
            defaultValue={2.5}
            readOnly={hasReviewed}
            precision={0.5}
          />
        </li>
        <li className="ml-auto md:ml-0">
          <Link
            href={`/products/${_id}/feedback`}
            className="uppercase text-TechStopBronze font-medium text-base flex gap-3 hover:scale-110 transition ease-out duration-300"
          >
            <Image src={feedBack} alt="feedBack_icon" width={20} height={20} />
            <span>
              Відгуки
              <span className="ml-1"> ({reviews.length})</span>
            </span>
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
        <h3 className="text-TechStopBlue text-xl md:text-[34px] font-normal md:mr-[38px] mb-6">
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

      <CustomToast />
    </div>
  );
};

export default ProductContent;

// const handleChangeValue = async (newValue: number | null) => {
//   if (!newValue || isError) {
//     toast.error("Something went wrong");
//     return;
//   }
//   await rateProduct(_id, Number(newValue));
//   setHasReviewed(true);
//   toast.success("Дякуємо за оцінку 🤝");
// };
