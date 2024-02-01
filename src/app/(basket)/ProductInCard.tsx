"use client";

import Image from "next/image";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ThreeDotsSymbolMobile from "./ThreeDotsSymbolMobile";
import { CartProduct } from "../../../types";
import { useCartStore } from "@/store/useCartStore";

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

  const onRemoveItem = (productId: number) => {
    removeItemFromCart(productId);
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
          width={210}
          height={320}
          className="w-[104px] h-[158px] md:w-[210px] md:h-[320px]"
        />
        <div className="flex flex-col justify-between pl-6 w-full">
          <div className="flex justify-between">
            <p className="text-sm text-[14px] leading-5 md:text-body1">
              {product.title}
            </p>
            <div className="lg:hidden">
              <ThreeDotsSymbolMobile
                onRemoveItem={() => removeItemFromCart(product.id)}
              />
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div className="hidden lg:flex">
              <Button
                variant="text"
                size="large"
                startIcon={<DeleteIcon />}
                sx={{ color: "#04C2C2" }}
                onClick={() => onRemoveItem(product.id)}
              >
                Видалити
              </Button>
            </div>
            <div className="flex md:gap-8 items-end justify-between w-full lg:w-auto">
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
                  className="w-12 h-10 mx-3 border-2 rounded-md border-slate-300 text-center"
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
                <span className="text-xs text-[#26262680] md:text-deWiseBlack md:text-[20px] md:font-medium md:leading-8 line-through">
                  {oldPrice}
                </span>
                <span className="text-deWiseRed text-subtitle1 md:text-Headline4">
                  {price}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInCard;
