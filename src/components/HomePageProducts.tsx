"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import SingleProduct from "./SingleProduct";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";

interface ProdProps {
  ShowAllItems?: boolean;
  title: string;
  products: Product[] | undefined;
}

const HomePageProducts = ({ ShowAllItems, title, products }: ProdProps) => {

  const [columnsToShow, setColumnsToShow] = useState(5);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });
  const isMediumScreen = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1280px)",
  });

  useEffect(() => {
    isSmallScreen
      ? setColumnsToShow(2)
      : isMediumScreen
      ? setColumnsToShow(4)
      : setColumnsToShow(5);
  }, [isSmallScreen, isMediumScreen]);

  const showAllColumn = () => {
    setColumnsToShow(8);
  };

  return (
    <div className="text-TechStopBlue w-full">
      <div className="flex justify-between lg:justify-normal pl-2 xl:pl-3 gap-4 items-center">
        <h2 className="text-Headline6 md:text-Headline5 lg:text-Headline4">
          {title}
        </h2>
        {ShowAllItems == true ||
          (ShowAllItems == null && (
            <button
              onClick={showAllColumn}
              className="text-TechStopBronze text-base md:text-xl flex items-center"
            >
              <span className="flex md:hidden">Всі</span>
              <span className="hidden md:flex">Дивитись всі</span>
              <span className="md:pl-2">
                <Image
                  src="/NavigateNextOutlined.svg"
                  alt="NavigateNextOutlined"
                  width={24}
                  height={24}
                />
              </span>
            </button>
          ))}
      </div>
      <div className="justify-center mt-2">
        <ul className="flex flex-wrap flex-row w-full ">
          {products != undefined ? (
            products?.map((item, index) => {
              return index < columnsToShow ? (
                <li
                  key={index}
                  className="w-1/2 md:w-1/4 xl:w-1/5 px-2 py-2 xl:px-3 xl:py-3"
                >
                  <Link href={`/products/${item.id}/about-product`}>
                    <SingleProduct product={item} />
                  </Link>
                </li>
              ) : null;
            })
          ) : (
            <div>Not found</div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HomePageProducts;
