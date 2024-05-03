import Image from "next/image";
import { FC } from "react";
import previewProduct from "/public/product-card-images/image_preview_feedback.svg";
import Button from "../Button";

const PreviewCard: FC = () => {
  const handleClick = () => {};

  return (
    <div>
      <ul className="flex gap-4  mb-8">
        <li className="bg-TechStopWhite h-full border shadow-sm">
          {" "}
          <div className="my-[84px] max-w-[240px]">
            <Image
              src={previewProduct}
              width={240}
              height={167}
              alt="product"
            />
          </div>
        </li>
        <li className="relative">
          <p className="text-textBlack font-medium text-xl">
            Характеристики Геймпад Microsoft Xbox Series X | S Wireless
            Controller Velocity Green (QAU-00091)
          </p>
          <div className="absolute bottom-0 right-0">
            {" "}
            <p className="text-TechStopBlue text-3xl font-bold">19 999 ₴</p>
            <p className="text-SuccessLightGreen text-xl">В наявності</p>
          </div>
        </li>
      </ul>

      <Button
        type="button"
        className="w-full hover:bg-TechStopBlue60"
        onClick={handleClick}
        bgColor="TechStopBlue"
        color="TechStopWhite"
      >
        Купити
      </Button>
    </div>
  );
};

export default PreviewCard;
