"use client";

import { FC } from "react";
import ProductContent from "./ProductContent";
import ProductSlider from "./ProductSlider";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { IData } from "@/types";
import BtnToTop from "./BtnToTop";

const ProductCard: FC<IData> = ({ product }) => {
  return (
    <section className="py-8">
      <MaxWidthWrapper>
        <ul className="md:flex gap-x-8 mt-8  md:flex-nowrap justify-center  ">
          <li>
            <ProductSlider product={product} />
          </li>
          <li>
            <ProductContent product={product} />
          </li>
          <BtnToTop />
        </ul>
      </MaxWidthWrapper>
    </section>
  );
};

export default ProductCard;
