import { ISmallSliderProps } from "@/types";
import React, { FC } from "react";
import DefaultSmallSlider from "./DefaultSmallSlider";
import SmallSlider from "./SmallSlider";

const SmallSliderImages: FC<ISmallSliderProps> = ({ changeSlide, images }) => {
  return (
    <>
      {images && images.length !== 0 ? (
        <SmallSlider images={images} changeSlide={changeSlide} />
      ) : (
        <DefaultSmallSlider changeSlide={changeSlide} />
      )}
    </>
  );
};

export default SmallSliderImages;
