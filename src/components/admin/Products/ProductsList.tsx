import React, { FC } from "react";
import ProductsListItem from "./ProductsListItem";
import { Product } from "@/types";

interface IProductsListProps {
  products: Product[];
  handleDelete: (_id: string) => void;
  handleDeleteImageById: (productId: string, imageId: number) => void;
}

const ProductsList: FC<IProductsListProps> = ({
  products,
  handleDelete,
  handleDeleteImageById,
}) => {
  return (
    <>
      {products &&
        products?.map((item, idx) => (
          <ProductsListItem
            key={item._id}
            listItem={item}
            idx={idx}
            handleDelete={handleDelete}
            handleDeleteImageById={handleDeleteImageById}
          />
        ))}
    </>
  );
};

export default ProductsList;
