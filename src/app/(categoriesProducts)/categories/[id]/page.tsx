"use client";

import { getProductsByQuery } from "@/api";
import { Product } from "@/types";
import { FC, useEffect, useMemo, useState } from "react";
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
    
  const [data, setData] = useState<Product[] | undefined>();

  useEffect(() => {
    const fetchProducts = async () => {
      const product = await getProductsByQuery({
        category: id,
        // minPrice: priceFilter.priceFrom,
        // maxPrice: priceFilter.priceTo,
        // sort: sortFilter,
      });

      setData(product);
    };

    fetchProducts();
  }, [id]);

  return (
    <div className="w-full">
      <ProductsByCategory products={data} />
    </div>
  );
};

export default CatalogItem;
