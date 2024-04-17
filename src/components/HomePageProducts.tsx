"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import SingleProduct from "./SingleProduct";
import Image from "next/image";

interface ProdProps {
  ShowAllItems?: boolean;
  title: string;
}

const HomePageProducts = ({ ShowAllItems, title }: ProdProps) => {
  // const products: String[] = [
  //   "Item 1",
  //   "Item 2",
  //   "Item 3",
  //   "Item 4",
  //   "Item 5",
  //   "Item 6",
  //   "Item 7",
  //   "Item 8",
  // ];
  const products = [
    {
      id: 1,
      inStock: true,
      poster: "/shoppingCardItemTest.svg",
      price: 19990,
      oldPrice: 28990,
      title: "Дуже довга назва товару з якимись цифрами HTG-7658",
    },
    {
      id: 2,
      inStock: true,
      poster: "/shoppingCardItemTest.svg",
      price: 29990,
      oldPrice: 38990,
      title: "Дуже довга назва товару з якимись цифрами HTG-7658",
    },
  ];

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
    <div className="lg:pl-4 pt-4 md:pt-5 lg:pt-6 text-TechStopBlue">
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
          {products.length > 0 ? (
            products?.map((item, index) => {
              return index < columnsToShow ? (
                <li
                  key={index}
                  className="w-1/2 md:w-1/4 xl:w-1/5 px-2 py-2 xl:px-3 xl:py-3"
                >
                  <SingleProduct product={item} />
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
