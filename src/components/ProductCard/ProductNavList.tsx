"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";
import { IParams } from "./ProductCard.types";
import Image from "next/image";

const productNavList = [
  { id: 1, title: "усе про товар", path: "about-product" },
  { id: 2, title: "Характеристики", path: "characteristics" },
  { id: 3, title: "Залишити відгук", path: "feedback" },
  // { id: 4, title: "Фото", path: "photo" },
  // { id: 5, title: "аксесуари", path: "accessories" },
];

const ProductNavList: FC<IParams> = ({ params }) => {
  // const { path, id } = productNavList;
  // const { id: productId } = params;
  // console.log(productId);
  // const newPath = "/" + id + "/" + path;

  const currentPath = usePathname();

  // const addNewPathToCurrentUrl = (prevPath: string, newPath: string) =>
  //   prevPath + newPath;

  return (
    <>
      <nav>
        <div className="">
          <div className="py-6 border-b-[1px] w-full border-b-TechStopBlue40 md:hidden">
            {" "}
            <Link href="/" className="flex items-center  ml-6">
              <Image
                src="/icon_left.svg"
                alt="icon_left"
                width={24}
                height={24}
                priority={true}
              />
              <span className="text-TechStopBlue text-lg uppercase font-medium tracking-[0.46px] ml-1 ">
                Геймпад Microsoft
              </span>
            </Link>
          </div>
          <div className="hidden md:block my-8">
            {" "}
            <Link href="/" className="text-TechStopBlue60 ">
              <span>Головна</span> {currentPath}
            </Link>
          </div>
        </div>
        <ul className="flex gap-x-8 border-b-[1px] w-full border-b-TechStopBlue40 mt-6 pb-2 overflow-x-scroll md:overflow-x-auto">
          {productNavList.map(({ id, title, path }) => {
            const isActive = currentPath === path;

            return (
              <li key={id}>
                <Link
                  href={path}
                  className={`${
                    isActive
                      ? "border border-orange-600 rounded bg-orange-600"
                      : ""
                  } uppercase text-TechStopBlue60 text-base truncate`}
                >
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default ProductNavList;
