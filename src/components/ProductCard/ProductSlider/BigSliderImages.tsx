import { FC } from "react";
import { SliderProps } from "@/types";
import BigSlider from "./BigSlider";
import DefaultBigSlider from "./DefaultBigSlider";

const BigSliderImages: FC<SliderProps> = ({
  current,
  prevSlide,
  nextSlide,
  images,
}) => {
  return (
    <>
      {images && images?.length !== 0 ? (
        <BigSlider
          images={images}
          current={current}
          prevSlide={prevSlide}
          nextSlide={nextSlide}
        />
      ) : (
        <DefaultBigSlider
          current={current}
          prevSlide={prevSlide}
          nextSlide={nextSlide}
        />
      )}
    </>
  );
};

export default BigSliderImages;
