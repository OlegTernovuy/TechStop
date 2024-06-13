"use client";

import { FC, useState, useEffect } from "react";
import Image from "next/image";
import arrowUp from "/public/product-card-icons/ArrowUpwardFilled.svg";

const BtnToTop: FC = () => {
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY !== 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <button
        onClick={handleClick}
        type="button"
        className={`rounded-full bg-TechStopBronze w-14 h-14 flex justify-center items-center bottom-[60px] right-4 md:bottom-[300px] md:right-[76px] fixed ${
          showButton
            ? "block opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        } hover:bg-yellow-500 focus:bg-yellow-500 transition ease-out duration-300`}
      >
        <Image src={arrowUp} alt="arrow_icon" width={16} height={16} />
      </button>
    </>
  );
};

export default BtnToTop;
