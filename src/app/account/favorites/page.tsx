"use client";

import SingleProduct from "@/components/SingleProduct";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { useStore } from "@/store/useStore";
import Link from "next/link";
import React from "react";

const Favorites = () => {
  const favorites = useStore(useFavoritesStore, (state) => state.favorites);
  return (
    <div>
      <h2 className="w-full hidden md:flex text-Headline5 md:text-Headline4 text-TechStopBlue mb-4 md:mb-6">
        Обране
      </h2>
      <ul className="flex flex-wrap flex-row w-full">
        {favorites &&
          favorites.map((favorite) => (
            <li
              key={favorite._id}
              className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 py-2"
            >
              <Link href={`/products/${favorite._id}/about-product`}>
                <SingleProduct product={favorite} />
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Favorites;
