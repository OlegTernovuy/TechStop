"use client";
import Image from "next/image";
import React from "react";
import ButtonCatalog from "../ui/ButtonCatalog";
import { useStore } from "@/store/useStore";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import formatPrice from "@/app/utils/formatPrice";

function BasketHoverBlock() {
  const cartItems = useStore(useCartStore, (state) => state.cartItems);
  const { removeItemFromCart } = useCartStore();

  return (
    <div className="z-50 bg-transparent-200 w-[573px] lg:group-hover:block hidden absolute max-h-[700px] right-0 ">
      <div className=" pl-8 pt-8 bg-white text-TechStopBlue shadow-lg mt-[38px] pb-8">
        <h2 className="mb-4 text-Headline5 text-left">Кошик</h2>
        <div className="max-h-[320px] scrollShoppingCart overflow-y-auto mr-1">
          {cartItems?.length ? (
            cartItems.map((product) => {
              return (
                <div className="flex gap-4 pr-11 mb-4" key={product.id}>
                  <Image
                    src={product.poster}
                    alt="test icon"
                    width={63}
                    height={96}
                  />
                  <div className=" flex flex-col">
                    <div className="flex w-full items-baseline justify-between">
                      <h2 className="w-[80%] text-body1">{product.title}</h2>
                      <button onClick={() => removeItemFromCart(product.id)}>
                        <Image
                          src="/basket.svg"
                          alt="basket"
                          width={32}
                          height={30}
                        />
                      </button>
                    </div>
                    <div className="w-full text-end">
                      <p className=" text-sm text-TechStopBlue60 line-through">
                        {formatPrice(product.oldPrice)}
                      </p>
                      <p className="text-subtitle1 text-TechStopRed">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex justify-center text-TechStopBronze text-Headline5">
              Shopping Cart Empty
            </div>
          )}
        </div>
        {cartItems?.length ? (
          <div className="flex items-end justify-end pr-11">
            <Link href="./orderCart">
              <ButtonCatalog
                stylesButton="mt-[32px] bg-TechStopBlue text-TechStopWhite"
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
