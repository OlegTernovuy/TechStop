// "use client";

import React, { FC, useMemo } from "react";
import Link from "next/link";
import SingleProduct from "@/components/SingleProduct";
import { Product } from "@/types";
import { calculateAverageRating } from "../utils";

interface IRecommendationProps {
  products: Product[] | undefined;
}

const RecommendationListItem: FC<IRecommendationProps> = ({ products }) => {
  const topProducts = useMemo(
    () =>
      products &&
      products
        .map((product) => ({
          ...product,
          averageRating: calculateAverageRating(product.rating),
        }))
        .sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, 6),
    [products]
  );

  return (
    <>
      {topProducts ? (
        topProducts?.map((item, index) => (
          <li key={index} className="w-full md:w-1/4 xl:w-1/6 ">
            <Link href={`/products/${item._id}/about-product`}>
              <SingleProduct product={item} />
            </Link>
          </li>
        ))
      ) : (
        <div>Not Found</div>
      )}
    </>
  );
};

export default RecommendationListItem;
