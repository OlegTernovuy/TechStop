import { ISmallSliderProps } from "@/types";
import React, { FC } from "react";
import Image from "next/image";

const SmallSlider: FC<ISmallSliderProps> = ({ images, changeSlide }) => {
  return (
    <>
      {images &&
        images?.map(({ imageId, url }, idx) => (
          <li
            key={imageId}
            className="bg-TechStopWhite border shadow-sm  transition hover:scale-110 focus:scale-110"
          >
            <button type="button" onClick={() => changeSlide(idx)}>
              <Image
                src={url}
                width={120}
                height={100}
                alt="mini"
                className="my-8 w-[120px] h-[100px]"
              />
            </button>
          </li>
        ))}
    </>
  );
};

export default SmallSlider;
