"use client";

import React, { FC, useState } from "react";

import { IData } from "@/types";

import { gallery } from "@/constants/productCard";

import BigSliderImages from "./BigSliderImages";
import SmallSliderImages from "./SmallSliderImages";

const ProductSlider: FC<IData> = ({ product }) => {
  const { images } = product?.data;

  const [current, setCurrent] = useState<number>(0);

  const totalSlides =
    images.length !== 0 ? images.length - 1 : gallery.length - 1;

  const nextSlide = () => {
    setCurrent(current === totalSlides ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? totalSlides : current - 1);
  };

  const changeSlide = (index: number) => {
    setCurrent(index);
  };

  return (
    <div className="lg:max-w-full ">
      <div className="relative h-[500px] lg:h-[1000px]">
        <ul className="top-0 left-[104px] w-full bg-TechStopWhite h-full border shadow-sm overflow-hidden">
          <BigSliderImages
            current={current}
            prevSlide={prevSlide}
            nextSlide={nextSlide}
            images={images}
          />
        </ul>
      </div>

      <ul className="hidden md:flex gap-4 items-center mt-4">
        <SmallSliderImages changeSlide={changeSlide} images={images} />
      </ul>
    </div>
  );
};

export default ProductSlider;
