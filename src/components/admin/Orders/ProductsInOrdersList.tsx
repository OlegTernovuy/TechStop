import { PurchasesProduct } from "@/app/account/purchases/purchasesType";
import Image from "next/image";
import React, { FC } from "react";
import defaultImg from "/public/admin/default_img.jpg";

interface IProductsInOrdersListProps {
  products: PurchasesProduct[];
}

const ProductsInOrdersList: FC<IProductsInOrdersListProps> = ({ products }) => {
  return (
    <ul className="flex gap-4 justify-center">
      {products.map(({ title, id, price, quantity, poster }) => (
        <li key={id} className="bg-gray-800 p-4 rounded-lg shadow-md">
          <p className="text-TechStopBlue font-bold">
            <Image
              src={poster || defaultImg}
              width={80}
              height={80}
              alt=""
              className="rounded-md"
            />
          </p>
          <p className="mb-2 text-TechStopBronze font-bold">
            Title: <span className="text-white">{title}</span>
          </p>
          <p className="mb-2 text-TechStopBronze font-bold">
            Price: <span className="text-white">{price}</span>
          </p>
          <p className="mb-2 text-TechStopBronze font-bold">
            Quantity: <span className="text-white">{quantity}</span>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default ProductsInOrdersList;
