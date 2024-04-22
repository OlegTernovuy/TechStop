"use client";

import { FC } from "react";
import ProductContent from "./ProductContent";
import ProductSlider from "./ProductSlider";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { IData } from "@/types";

const ProductCard: FC<IData> = ({ product }) => {
  return (
    <section className="py-8">
      <MaxWidthWrapper>
        <ul className="flex gap-x-8 mt-8 flex-wrap md:flex-nowrap justify-center">
          <li>
            <ProductSlider product={product} />
          </li>
          <li>
            <ProductContent product={product} />
          </li>
        </ul>
      </MaxWidthWrapper>
    </section>
  );
};

export default ProductCard;
