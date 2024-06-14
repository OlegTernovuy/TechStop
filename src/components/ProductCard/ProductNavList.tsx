"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { join } from "path";
import Image from "next/image";
import { Product } from "@/types";
import { useFeedbackStore } from "@/store/useFeedbackStore";

import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import NavList from "./NavList";

import { productNavList } from "@/constants/productCard";

interface IProductNavListProps {
  params?: {
    data: Product;
  };
}

const ProductNavList: FC<IProductNavListProps> = ({ params }) => {
  if (!params) {
    return <div>Loading...</div>;
  }

  const { _id: paramsId, title, categories } = params?.data;

  const urlCategory = encodeURIComponent(
    categories[0].replace(/\s+/g, "-").toLowerCase()
  );

  const urlNavList = [
    { name: "Головна", path: "/" },
    { name: categories[0], path: `/categories/${urlCategory}` },
    { name: title, path: `/products/${paramsId}/about-product` },
  ];

  return (
    <>
      <nav>
        <div>
          <MobileNav />
          <DesktopNav urlNavList={urlNavList} />
        </div>

        <ul className="flex gap-x-8 border-b-[1px] w-full border-b-TechStopBlue40 mt-6 pb-2 overflow-auto md:overflow-hidden">
          <NavList productNavList={productNavList} paramsId={paramsId} />
        </ul>
      </nav>
    </>
  );
};

export default ProductNavList;
