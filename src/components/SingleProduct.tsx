import { Rating } from "@mui/material";
import Image from "next/image";

const SingleProduct = () => {
  return (
    <div className="w-full">
      <Image
        src="/shoppingCardItemTest.svg"
        alt="cartImage"
        height={370}
        width={240}
        className="w-full min-h-[260px] object-cover"
      />
      <p className="py-1 text-body1 lg:text-base">Дуже довга назва товару з якимись цифрами HTG-7658 </p>
      <Rating name="read-only" value={2.5} precision={0.5} readOnly />
      <div className="flex justify-between mt-2 items-center">
        <div className="flex flex-col">
          <span className="text-sm line-through">28 999</span>
          <span className="text-TechStopRed text-xl">19 999</span>
        </div>
        <div className="flex space-x-2.5">
          <Image src="/PriceCartIcon.svg" alt="priceCart" width={32} height={32} />
          <Image
            src="/ShoppingCartIconBronze.svg"
            alt="shoppingCard"
            width={32}
            height={32}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
