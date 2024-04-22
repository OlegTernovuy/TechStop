"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";
import { join } from "path";
import Image from "next/image";
import { Product } from "@/types";

const productNavList = [
  { id: 1, title: "усе про товар", path: "about-product" },
  { id: 2, title: "Характеристики", path: "characteristics" },
  { id: 3, title: "Залишити відгук", path: "feedback" },
];

interface IProductNavListProps {
  params?: {
    data: Product;
  };
}

const ProductNavList: FC<IProductNavListProps> = ({ params }) => {
  const currentPath = usePathname();

  if (!params) {
    return <div>Loading...</div>;
  }

  const { id: paramsId } = params?.data;

  return (
    <>
      <nav>
        <div>
          <div className="py-6 border-b-[1px] w-full border-b-TechStopBlue40 md:hidden">
            {" "}
            <Link href="/" className="flex items-center ml-6">
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
            <Link
              href="/"
              className="text-TechStopBlue60 hover:text-TechStopBronze transition ease-out duration-300"
            >
              <span>Головна</span> {currentPath} /Тендер на висадку сакур -
              Совок вишневий біля хати
            </Link>
          </div>
        </div>
        <ul className="flex gap-x-8 border-b-[1px] w-full border-b-TechStopBlue40 mt-6 pb-2 overflow-x-scroll md:overflow-x-auto  ">
          {productNavList.map(({ id, title, path }) => {
            const joinedPath = join("/products", String(paramsId), path);
            const isActive = currentPath === joinedPath;

            return (
              <li key={id}>
                <Link
                  href={path}
                  className={`uppercase text-TechStopBlue60 text-base truncate relative pb-3 transition bg-transparent ease-out duration-700 hover:text-TechStopBronze focus:text-TechStopBronze ${
                    isActive ? "text-TechStopBronze " : ""
                  }`}
                >
                  {title}
                  <span
                    className={`absolute left-0 bottom-0 w-full h-1 border-2 transition bg-transparent ease-out duration-700 ${
                      isActive ? "border-TechStopBronze" : "border-none"
                    }`}
                  ></span>
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
