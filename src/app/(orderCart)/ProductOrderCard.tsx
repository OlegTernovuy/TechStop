import Image from "next/image";
import React from "react";
import ThreeDotsSymbolMobile from "../../components/(ShoppingCart)/ThreeDotsSymbolMobile";
import { CartProduct } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { useShoppingCartModalStore } from "@/store/modalStore";
import formatPrice from "../utils/formatPrice";
import { DiscountPercentage } from "@/constants";
import defaultProductIcon from "../../../public/defaultProductIcon.svg";

type ProductProps = {
  product: CartProduct;
};

function ProductOrderCard(product: ProductProps) {
  const setShowShoppingCart = useShoppingCartModalStore(
    (state) => state.setShowShoppingCart
  );
  const { getTotalPriceOneProduct, increaseQuantity, decreaseQuantity } =
    useCartStore();
  const productPrice = getTotalPriceOneProduct(product.product);

  const oldPrice = formatPrice(productPrice.totalPrice * DiscountPercentage);
  const newPrice = formatPrice(productPrice.totalPrice);

  const onIncreaseQuantity = (productId: string) => {
    increaseQuantity(productId);
  };
  const onDecreaseQuantity = (productId: string) => {
    decreaseQuantity(productId);
  };

  return (
    <div className="flex w-full justify-between mb-8">
      <div className="flex w-full text-TechStopBlue">
        <Image
          src={product.product.poster ?? defaultProductIcon}
          alt="basket"
          width={112}
          height={171}
          className="object-scale-down"
        />
        <div className="flex flex-col justify-between pl-6 w-full">
          <div className="flex justify-between">
            <div className="flex flex-col justify-between md:justify-normal text-TechStopBlue">
              <h2 className="text-base lg:text-Headline5">
                {product.product.title}
              </h2>
              <p className="text-base lg:text-Headline5">
                {" "}
                {product.product.quantity} шт.
              </p>
            </div>
            <div className="mt-1">
              <button onClick={setShowShoppingCart} className="flex gap-2">
                <span className="text-body1 uppercase text-TechStopBronze hidden md:block">
                  змінити
                </span>
              </button>
              <div className=" block md:hidden">
                <ThreeDotsSymbolMobile isOrderPage={true} />
              </div>
            </div>
          </div>

          <div className="flex md:gap-8 justify-between md:justify-end w-full">
            <div className="flex md:hidden items-center">
              <button onClick={() => onDecreaseQuantity(product.product._id)}>
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
                value={product.product.quantity}
                readOnly
                className="w-12 h-10 mx-3 border-2 rounded-md border-TechStopBlue40 text-TechStopBlue40 text-center"
                width={48}
                height={40}
              />
              <button onClick={() => onIncreaseQuantity(product.product._id)}>
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
                {oldPrice + " ₴"}
              </span>
              <span className="text-TechStopRed text-subtitle1 md:text-Headline4">
                {newPrice + " ₴"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductOrderCard;
