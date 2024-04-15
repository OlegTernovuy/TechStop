"use client";

import { FC } from "react";
import ProductContent from "./ProductContent";
import { IProductCardProps } from "./ProductCard.types";
import ProductSlider from "./ProductSlider";
import MaxWidthWrapper from "../MaxWidthWrapper";

const ProductCard: FC = () => {
  return (
    <section className="py-8">
      <MaxWidthWrapper>
        <ul className="flex gap-x-8 mt-8 flex-wrap md:flex-nowrap justify-center">
          <li>
            <ProductSlider />
          </li>
          <li>
            <ProductContent />
          </li>
        </ul>
      </MaxWidthWrapper>
    </section>
  );
};

export default ProductCard;
