"use client";

import { FC, useEffect, useState } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PreviewCard from "../FeedBack/PreviewCard";
import CharacteristicsInfo from "./CharacteristicsInfo";
import ToggleButton from "../ToggleButton";
import Button from "../Button";

import { IData } from "@/types";
import { Rating } from "@mui/material";

import Link from "next/link";
import Image from "next/image";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { useCartStore } from "@/store/useCartStore";

import CustomToast from "@/components/Global/Toaster/CustomToast";
import toast from "react-hot-toast";

import feedback from "/public/product-card-icons/CommentOutlined.svg";
import { useFeedbackStore } from "@/store/useFeedbackStore";
import formatPrice from "@/app/utils/formatPrice";
import { DiscountPercentage } from "@/constants";
import calculateRating from "@/app/utils/calculateRating";

const Characteristics: FC<IData> = ({ product }) => {
  const { title, _id, price, characteristics, rating } = product.data;
  const { toggleProductCardToFavorites } = useFavoritesStore();
  const { reviews, getAllFeedbacks } = useFeedbackStore();

  const { addItemToCart } = useCartStore();

  useEffect(() => {
    getAllFeedbacks(_id);
  }, [getAllFeedbacks, _id]);

  const handleAddItem = () => {
    addItemToCart(product.data);
    toast.success(`Товар ${title} додано до кошика`);
  };

  const oldPrice = formatPrice(price * DiscountPercentage);
  const newPrice = formatPrice(price);

  return (
    <MaxWidthWrapper>
      <section className="pt-4 pb-20 md:pt-8">
        {" "}
        <h2 className="mb-4 md:mb-8 text-TechStopBlue font-normal text-2xl md:text-3xl lg:text-5xl break-words md:mt-0 mt-4">
          Характеристики {title}
        </h2>
        <div className="flex items-center mb-6 md:mb-10">
          <div>
            <Rating
              name="characteristics-rating"
              readOnly
              value={calculateRating(rating)}
              defaultValue={2.5}
              precision={0.5}
            />
          </div>
          <div className="ml-auto md:ml-[50px] ">
            <Link
              href={`/products/${_id}/feedback`}
              className="uppercase flex hover:scale-110 transition ease-out duration-300"
            >
              <Image
                src={feedback}
                width={20}
                height={20}
                alt="feedBack_icon"
              />
              <span className="text-TechStopBronze ml-[10px]">
                Відгуки ({reviews?.length})
              </span>
            </Link>
          </div>
        </div>
        <ul className="flex">
          <li className="md:max-w-[60%] mr-auto">
            <CharacteristicsInfo characteristics={characteristics} />
          </li>
          <li>
            <div className="min-h-[96%] border-l border-deWiseGreyLight hidden md:block mr-6"></div>
          </li>
          <li className="hidden md:block ">
            <PreviewCard productData={product} />
          </li>
        </ul>
        <ul className="md:hidden flex justify-between">
          <li>
            <div className="md:mr-20">
              {" "}
              <p className="line-through text-TechStopBlue font-medium text-nowrap text-sm mb-1">
                {oldPrice} &#8372;
              </p>
              <p className="text-TechStopRed font-normal text-lg text-nowrap">
                {newPrice} &#8372;
              </p>
            </div>
          </li>

          <li>
            {" "}
            <ul className="flex items-center">
              <li>
                {" "}
                <Button
                  type="button"
                  onClick={() => toggleProductCardToFavorites(product.data)}
                  className="flex justify-center items-center mr-[14px] text-TechStopBlue uppercase px-0 py-0"
                >
                  <ToggleButton _id={_id} />
                </Button>{" "}
              </li>
              <li>
                {" "}
                <Button
                  type="button"
                  onClick={handleAddItem}
                  className="flex justify-center items-center px-6 py-2 w-full h-[52px] text-base uppercase font-medium bg-TechStopBlue text-TechStopWhite"
                >
                  <span>купити</span>
                </Button>
              </li>
            </ul>
          </li>
        </ul>
        <CustomToast />
      </section>
    </MaxWidthWrapper>
  );
};

export default Characteristics;
