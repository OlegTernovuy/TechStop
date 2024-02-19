"use client";

import Image from "next/image";

import ThreeDotsSymbolMobile from "./ThreeDotsSymbolMobile";
import AdditionalServicesMobile from "./AdditionalServicesMobile";
import { CartProduct } from "../../types";
import { useCartStore } from "@/store/useCartStore";
import AdditionalServicesDesktop from "./AdditionalServicesDesktop";

interface CartItemCardProps {
  product: CartProduct;
}

const ProductInCard = ({ product }: CartItemCardProps) => {
  const { increaseQuantity, decreaseQuantity, removeItemFromCart } =
    useCartStore();

  const onIncreaseQuantity = (productId: number) => {
    increaseQuantity(productId);
  };
  const onDecreaseQuantity = (productId: number) => {
    decreaseQuantity(productId);
  };

  const getTotal = (product: CartProduct) => {
    let totalOldPrice = 0;
    let totalPrice = 0;
    totalOldPrice = product.oldPrice * product.quantity;
    totalPrice = product.price * product.quantity;
    return { totalPrice, totalOldPrice };
  };

  const oldPrice = getTotal(product)
    .totalOldPrice.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const price = getTotal(product)
    .totalPrice.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full">
        <Image
          src={product.poster}
          alt="shoppingCardItem"
          width={320}
          height={488}
          className="w-[104px] h-[158px] md:w-[320px] md:h-[488px]"
        />
        <div className="flex flex-col justify-between pl-6 w-full">
          <div className="flex justify-between">
            <p className="text-sm md:text-Headline5">
              {product.title}
            </p>
              <ThreeDotsSymbolMobile
                onRemoveItem={() => removeItemFromCart(product.id)}
              />
          </div>

            <div className="flex md:gap-8 justify-between w-full">
              <div className="flex items-center">
                <button onClick={() => onDecreaseQuantity(product.id)}>
                  <Image
                    src="/removeFilled.svg"
                    alt="removeFilled"
                    width={18}
                    height={18}
                  />
                </button>
                <input
                  type="text"
                  name="count"
                  value={product.quantity}
                  readOnly
                  className="w-12 h-10 mx-3 border-2 rounded-md border-TechStopBlue40 text-TechStopBlue40 text-center"
                  width={48}
                  height={40}
                />
                <button onClick={() => onIncreaseQuantity(product.id)}>
                  <Image
                    src="/addFilled.svg"
                    alt="addFilled"
                    width={18}
                    height={18}
                  />
                </button>
              </div>
              <div className="flex flex-col md:gap-2 items-end">
                <span className="text-xs text-TechStopBlue60 md:text-[20px] md:font-medium md:leading-8 line-through">
                  {oldPrice}
                </span>
                <span className="text-TechStopRed text-subtitle1 md:text-Headline4">
                  {price}
                </span>
              </div>
            </div>

            <div>
              <AdditionalServicesDesktop/>
            </div>

        </div>
      </div>
    </div>
  );
};

export default ProductInCard;
