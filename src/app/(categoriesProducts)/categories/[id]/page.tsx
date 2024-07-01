"use client";

import { getProductsByQuery } from "@/api";
import { Product } from "@/types";
import { FC, useEffect, useState } from "react";
import ProductsByCategory from "../../ProductsByCategory";
import { useSearchParams } from "next/navigation";

interface ICatalogItemsProps {
  params: {
    id: string;
  };
}

const CatalogItem: FC<ICatalogItemsProps> = ({ params }) => {
  const { id } = params;

  const searchParams = useSearchParams()
  const minPriceQuery = searchParams.get("minPrice");
  const maxPriceQuery = searchParams.get("maxPrice");
  const searchSortQuery = searchParams.get("sort");
    
  const [data, setData] = useState<Product[] | undefined>();

  useEffect(() => {
    const fetchProducts = async () => {
      const product = await getProductsByQuery({
        category: id,
        minPrice: Number(minPriceQuery),
        maxPrice: Number(maxPriceQuery),
        sort: searchSortQuery,
      });      

      setData(product);
    };

    fetchProducts();
  }, [id, minPriceQuery, maxPriceQuery, searchSortQuery]);

  return (
    <div className="w-full">
      <ProductsByCategory products={data} />
    </div>
  );
};

export default CatalogItem;
