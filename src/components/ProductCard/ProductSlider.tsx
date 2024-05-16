import React, { FC, useState } from "react";
import Image from "next/image";
import { Transition } from "@headlessui/react";

// import defaultImg from "/public/product-card-images/product.png";
import { IData } from "@/types";

import rightArrow from "/public/product-card-icons/ChevronRightFilled.svg";
import leftArrow from "/public/icon_left.svg";

import first from "/public/product-card-icons/test_svg_1.svg";
import second from "/public/product-card-icons/test_svg_2.svg";
import third from "/public/product-card-icons/test_svg.svg";
// import fourth from "/public/product-card-images/fourth.jpg";

const gallery = [
  {
    id: 1,
    href: first,
  },
  {
    id: 2,
    href: second,
  },
  {
    id: 3,
    href: third,
  },
];

const ProductSlider: FC<IData> = ({ product }) => {
  // const { poster, title } = product?.data;

  const [current, setCurrent] = useState<number>(0);

  const totalSlides = gallery.length - 1;

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
      <div className="relative">
        <ul className="top-0 left-[104px] bg-TechStopWhite h-full border shadow-sm">
          {gallery.map(({ id, href }, idx) => (
            <li key={id} className={`${idx === current ? "block" : "hidden"} `}>
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
                  className=" max-h-[249px]  lg:max-w-[720px] lg:max-h-[500px] my-[125px] lg:my-[250px]"
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
              <Image
                src={leftArrow}
                alt="left_arrow_icon"
                width={32}
                height={32}
              />
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
        </ul>
      </div>

      <ul className="hidden md:flex gap-4 items-center mt-4">
        {gallery.map(({ id, href }, idx) => (
          <li
            key={id}
            className="bg-TechStopWhite border shadow-sm  transition hover:scale-110 focus:scale-110"
          >
            <button type="button" onClick={() => changeSlide(idx)}>
              <Image
                src={href}
                width={120}
                height={100}
                alt="mini"
                className="my-8 max-w-[120px] h-[100px]"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductSlider;
