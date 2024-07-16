import { gallery } from "@/constants/productCard";
import { ISmallSliderProps } from "@/types";
import Image from "next/image";
import { FC } from "react";

const DefaultSmallSlider: FC<ISmallSliderProps> = ({ changeSlide }) => {
  return (
    <>
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
              className="my-8 w-[120px] h-[100px]"
            />
          </button>
        </li>
      ))}
    </>
  );
};

export default DefaultSmallSlider;
