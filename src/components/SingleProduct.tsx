import formatPrice from "@/app/utils/formatPrice";
import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/types";
import { Rating } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Image from "next/image";
import { DiscountPercentage } from "@/constants";
import { useViewProductsStore } from "@/store/useViewProductsStore";

type IProduct = {
  product: Product;
};

const SingleProduct = ({ product }: IProduct) => {
  const { addItemToCart } = useCartStore();
  const { addItemToViewProducts } = useViewProductsStore();

  const addProductToCart = (
    product: Product,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e?.preventDefault();
    e?.stopPropagation();
    addItemToCart(product);
  };

  const addProductToView = (product: Product) => {
    addItemToViewProducts(product);
  };

  const oldPrice = formatPrice(product.price * DiscountPercentage);
  const newPrice = formatPrice(product.price);

  return (
    <div
      className="w-full h-full flex flex-col justify-between"
      onClick={() => addProductToView(product)}
    >
      <div>
        <div className="relative">
          <Image
            src={product.poster}
            alt="cartImage"
            height={370}
            width={240}
            className="w-full min-h-[260px] md:min-h-[370px] object-cover"
          />
          <div
            className="absolute bottom-4 right-4 cursor-pointer"
            onClick={() => console.log("like")}
          >
            <FavoriteBorderOutlinedIcon
              className="relative"
              style={{
                width: "32px",
                height: "32px",
              }}
            />
          </div>
        </div>
        <p className="py-1 text-body1 lg:text-base">{product.title} </p>
      </div>
      <div>
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
            <button onClick={(e) => addProductToCart(product, e)}>
              <Image
                src="/ShoppingCartIconBronze.svg"
                alt="shoppingCard"
                width={32}
                height={32}
                className="hover:[filter:drop-shadow(0px_3px_1px_#02275066)] ease-out duration-200 active:bg-TechStopBlue10 active:rounded-md"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
