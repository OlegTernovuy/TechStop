"use client";

import Image from "next/image";
import { FC } from "react";
import { IProduct } from "../ProductCard.types";
import { useCartStore } from "@/store/useCartStore";

import previewProduct from "/public/product-card-images/image_preview_feedback.svg";
import Button from "../Button";
import toast from "react-hot-toast";
import CustomToast from "@/components/Global/Toaster";

interface IPreviewCardProps {
  productData: IProduct | any;
}

const PreviewCard: FC<IPreviewCardProps> = ({ productData }) => {
  const { addItemToCart } = useCartStore();

  const images = productData.images.length !== 0 && productData?.images[0].url;

  const handleAddItem = () => {
    addItemToCart(productData?.data);
    toast.success(`Товар ${productData?.data?.title} додано до кошика ✅`);
  };

  return (
    <div className="max-w-[518px] mb-16">
      <ul className="flex gap-4  mb-8">
        <li className="bg-TechStopWhite h-full border shadow-sm">
          {" "}
          <div className="my-[84px] min-w-[240px] ">
            <Image
              src={images || previewProduct}
              width={240}
              height={167}
              alt="product"
            />
          </div>
        </li>
        <li className="relative">
          <p className="text-textBlack font-medium text-xl">
            Характеристики {productData?.data?.title}
          </p>
          <div className="absolute bottom-0 right-0">
            {" "}
            <p className="text-TechStopBlue text-3xl font-bold">
              {productData?.price} ₴
            </p>
            <p className="text-SuccessLightGreen text-xl">В наявності</p>
          </div>
        </li>
      </ul>

      <Button
        type="button"
        className="w-full h-[56px] hover:bg-TechStopBlue60 focus:bg-TechStopBlue60 px-6 py-2"
        onClick={handleAddItem}
        bgColor="TechStopBlue"
        color="TechStopWhite"
      >
        Купити
      </Button>

      <CustomToast />
    </div>
  );
};

export default PreviewCard;
