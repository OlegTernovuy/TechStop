"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";
import { join } from "path";
import Image from "next/image";
import { Product } from "@/types";
import { useFeedbackStore } from "@/store/useFeedbackStore";

const productNavList = [
  { _id: "1", title: "усе про товар", path: "about-product" },
  { _id: "2", title: "Характеристики", path: "characteristics" },
  { _id: "3", title: "Залишити відгук", path: "feedback" },
];

interface IProductNavListProps {
  params?: {
    data: Product;
  };
}

const ProductNavList: FC<IProductNavListProps> = ({ params }) => {
  const currentPath = usePathname();

  const { reviews } = useFeedbackStore();

  if (!params) {
    return <div>Loading...</div>;
  }

  const { _id: paramsId, title, categories } = params?.data;

  const urlCategory = encodeURIComponent(
    categories[0].replace(/\s+/g, "-").toLowerCase()
  );

  const urlNavlist = [
    { name: "Головна", path: "/" },
    { name: categories[0], path: `/categories/${urlCategory}` },
    { name: title, path: `/products/${paramsId}/about-product` },
  ];

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
            {urlNavlist.map(({ name, path }, idx) => (
              <span key={idx} className="text-TechStopBlue60">
                <Link
                  className="hover:text-TechStopBronze transition ease-out duration-300"
                  href={path}
                >
                  {name}
                </Link>
                {idx < urlNavlist.length - 1 && " / "}
              </span>
            ))}
          </div>
        </div>

        <ul className="flex gap-x-8 border-b-[1px] w-full border-b-TechStopBlue40 mt-6 pb-2 overflow-auto md:overflow-hidden">
          {productNavList.map(({ _id, title, path }) => {
            const joinedPath = join("/products", paramsId.toString(), path);
            const isActive = currentPath === joinedPath;
            const isFeedback = _id === "3";
            return (
              <li key={_id}>
                <Link
                  href={path}
                  className={`uppercase text-TechStopBlue60 text-base truncate relative pb-3 transition bg-transparent ease-out duration-700 hover:text-TechStopBronze focus:text-TechStopBronze ${
                    isActive ? "text-TechStopBronze " : ""
                  }`}
                >
                  {title}
                  {isFeedback ? (
                    <span
                      className={`ml-1 uppercase ${
                        isActive ? "text-TechStopBronze" : ""
                      } font-medium text-base`}
                    >
                      ({reviews.length})
                    </span>
                  ) : (
                    ""
                  )}
                  <span
                    className={`absolute left-0 bottom-0 w-full h-1 border-2 transition bg-transparent ease-out duration-700 ${
                      isActive ? "border-TechStopBronze" : "border-none"
                    } `}
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
