import formatPrice from "@/app/utils/formatPrice";
import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/types";
import { Rating } from "@mui/material";
import Image from "next/image";

type IProduct = {
  product: Product;
};

const SingleProduct = (product: IProduct) => {
  const { addItemToCart } = useCartStore();
  const addProductToCart = (product: Product) => {
    addItemToCart(product);
  };
  const oldPrice = formatPrice(product.product.oldPrice);
  const newPrice = formatPrice(product.product.price);

  return (
    <div className="w-full">
      <Image
        src={product.product.poster}
        alt="cartImage"
        height={370}
        width={240}
        className="w-full min-h-[260px] object-cover"
      />
      <p className="py-1 text-body1 lg:text-base">{product.product.title} </p>
      <Rating name="read-only" value={2.5} precision={0.5} readOnly />
      <div className="flex justify-between mt-2 items-center">
        <div className="flex flex-col">
          <span className="text-sm line-through">{oldPrice}</span>
          <span className="text-TechStopRed text-xl">{newPrice}</span>
        </div>
        <div className="flex space-x-2.5">
          <Image
            src="/PriceCartIcon.svg"
            alt="priceCart"
            width={32}
            height={32}
          />
          <button onClick={() => addProductToCart(product.product)}>
            <Image
              src="/ShoppingCartIconBronze.svg"
              alt="shoppingCard"
              width={32}
              height={32}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
