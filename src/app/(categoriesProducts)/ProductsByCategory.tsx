"use client";

import SingleProduct from "@/components/SingleProduct";
import { prodData } from "@/constants";
import { useFilterStore } from "@/store/useFiltersStore";
import { Product } from "@/types";
import Link from "next/link";
import { useState } from "react";
import NoSsr from "../utils/NoSsr";

interface IIdParams {
  products: Product[] | undefined;
}

const ProductsByCategory = ({ products }: IIdParams) => {
  const { sortFilter, priceFilter } = useFilterStore();

  let filteredAndSortedProducts: Product[] = [];

  if (products) {
    filteredAndSortedProducts = products.filter((product) => {
      const matchesMinPrice =
        priceFilter.priceFrom === undefined || product.price >= priceFilter.priceFrom;
      const matchesMaxPrice =
        priceFilter.priceTo === undefined || product.price <= priceFilter.priceTo;
      return matchesMinPrice && matchesMaxPrice;
    });
  }

  // Сортування
  if (sortFilter === "дешеві") {
    filteredAndSortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortFilter === "дорогі") {
    filteredAndSortedProducts.sort((a, b) => b.price - a.price);
  }
  
  return (
    <div className="w-full">
      {filteredAndSortedProducts === undefined || filteredAndSortedProducts?.length === 0 ? null : (
        <div className="md:pt-6 md:pl-2 lg:pt-5 lg:pl-1">
          <div className="justify-center">
            <NoSsr>
              <ul className="flex flex-wrap flex-row w-full ">
                {filteredAndSortedProducts != undefined ? (
                  filteredAndSortedProducts?.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="w-1/2 md:w-1/4 xl:w-1/5 px-2 py-2 xl:px-3 xl:py-3"
                      >
                        <Link href={`/products/${item._id}/about-product`}>
                          <SingleProduct product={item} />
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <div>Not found</div>
                )}
              </ul>
            </NoSsr>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsByCategory;
