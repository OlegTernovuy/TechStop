"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Button from "../ui/Button";
import { useStore } from "@/store/useStore";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import formatPrice from "@/app/utils/formatPrice";
import { DiscountPercentage } from "@/constants";
import defaultProductIcon from "../../../public/defaultProductIcon.svg";

function BasketHoverBlock() {
  const cartItems = useStore(useCartStore, (state) => state.cartItems);
  const { removeItemFromCart } = useCartStore();

  return (
    <div
      className={`${
        cartItems?.length ? "w-[573px]" : "w-[284px]"
      } z-50 bg-transparent-200 lg:group-hover:block hidden absolute max-h-[700px] right-0`}
    >
      <div className=" pl-8 pt-8 bg-white text-TechStopBlue shadow-lg mt-[38px] pb-8">
        {cartItems?.length ? (
          <h2 className="mb-4 text-Headline5 text-left">Кошик</h2>
        ) : (
          ""
        )}
        <ul className="max-h-[320px] scrollShoppingCart overflow-y-auto mr-1">
          {cartItems?.length ? (
            cartItems.map((product) => {
              return (
                <li
                  className="flex justify-between gap-4 pr-11 mb-4"
                  key={product._id}
                >
                  <Image
                    src={product.poster ?? defaultProductIcon}
                    alt="test icon"
                    width={63}
                    height={96}
                    className="object-scale-down"
                  />
                  <div className=" flex flex-col w-full">
                    <div className="flex w-full items-baseline justify-between">
                      <h2 className="w-[80%] text-body1">{product.title}</h2>
                      <button onClick={() => removeItemFromCart(product._id)}>
                        <Image
                          src="/basket.svg"
                          alt="basket"
                          width={32}
                          height={30}
                        />
                      </button>
                    </div>
                    <div className="w-full text-end pr-10">
                      <p className=" text-sm text-TechStopBlue60 line-through">
                        {formatPrice(product.price * DiscountPercentage) + " ₴"}
                      </p>
                      <p className="text-subtitle1 text-TechStopRed">
                        {formatPrice(product.price) + " ₴"}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <div className="flex justify-center text-Headline5">
              Кошик порожній
            </div>
          )}
        </ul>
        {cartItems?.length ? (
          <div className="flex items-end justify-end pr-11">
            <Link href="/orderCart">
              <Button
                stylesButton="mt-[32px] px-6 bg-TechStopBlue text-TechStopWhite"
                title="Оформити замовлення"
              />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default BasketHoverBlock;
