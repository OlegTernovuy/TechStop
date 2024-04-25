"use client";

import SingleProduct from "@/components/SingleProduct";
import { useStore } from "@/store/useStore";
import { useViewProductsStore } from "@/store/useViewProductsStore";
import Link from "next/link";

const ViewedProducts = () => {
  const ViewedProducts = useStore(
    useViewProductsStore,
    (state) => state.viewProducts
  );

  return (
    <div>
      <h2 className="w-full text-Headline5 md:text-Headline4 text-TechStopBlue mb-4 md:mb-6">
        Переглянуті товари
      </h2>
      <ul className="flex flex-wrap flex-row w-full">
        {ViewedProducts &&
          ViewedProducts.map((viewedProduct) => (
            <li
              key={viewedProduct.id}
              className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 py-2"
            >
              <Link href={`/products/${viewedProduct.id}/about-product`}>
                <SingleProduct product={viewedProduct} />
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ViewedProducts;
