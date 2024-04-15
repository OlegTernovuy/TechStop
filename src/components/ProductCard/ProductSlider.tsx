import React from "react";
import Image from "next/image";
import product from "/public/porduct-card-images/product.png";

const ProductSlider = () => {
  return (
    <div className="md:max-w-[720px] max-w-[358px]">
      <div className="bg-TechStopWhite h-full ">
        <div className="top-0 left-[104px] max-w-[720px]">
          {" "}
          <Image
            src={product}
            alt="product"
            width={720}
            className="bg-TechStopWhite h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
