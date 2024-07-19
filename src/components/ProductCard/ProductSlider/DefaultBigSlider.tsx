import { SliderProps } from "@/types";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import React, { FC } from "react";
import { gallery } from "@/constants/productCard";

import rightArrow from "/public/product-card-icons/ChevronRightFilled.svg";
import leftArrow from "/public/icon_left.svg";

const DefaultBigSlider: FC<SliderProps> = ({
  current,
  prevSlide,
  nextSlide,
}) => {
  return (
    <>
      {gallery.map(({ id, href }, idx) => (
        <li
          key={id}
          className={`transition-opacity duration-1000 ${
            idx === current ? "block" : "hidden"
          } `}
        >
          {" "}
          <Transition
            key={id}
            show={idx === current}
            enter="transition-opacity duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-1000"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {" "}
            <Image
              src={href}
              width={720}
              height={500}
              alt="img_product"
              className="ml-auto mr-auto  h-[249px] xl:max-w-[720px] lg:h-[500px] my-[125px] lg:my-[250px]"
            />
          </Transition>
        </li>
      ))}
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <button
          type="button"
          className="w-10 h-10 left-0 border rounded-full bg-white flex items-center justify-center transition ease-out hover:scale-110 focus:scale-110"
          onClick={prevSlide}
        >
          <Image src={leftArrow} alt="left_arrow_icon" width={32} height={32} />
        </button>
      </div>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 ">
        <button
          type="button"
          onClick={nextSlide}
          className="w-10 h-10 border rounded-full bg-white flex items-center justify-center transition ease-out hover:scale-110 focus:scale-110"
        >
          <Image src={rightArrow} alt="right" width={32} height={32} />
        </button>
      </div>
    </>
  );
};

export default DefaultBigSlider;
