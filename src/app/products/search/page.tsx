'use client'
import { getProductsByQuery } from '@/api';
import ProductsByCategory from '@/app/(categoriesProducts)/ProductsByCategory';
import { Product } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const SearchPage = () => {
  const searchParams = useSearchParams()
  const minPriceQuery = searchParams.get("minPrice");
  const maxPriceQuery = searchParams.get("maxPrice");
  const searchSortQuery = searchParams.get("sort");
  const searchQuery = searchParams.get("search");
    
  const [data, setData] = useState<Product[] | undefined>();

  useEffect(() => {
    const fetchProducts = async () => {
      const product = await getProductsByQuery({
        minPrice: Number(minPriceQuery),
        maxPrice: Number(maxPriceQuery),
        sort: searchSortQuery,
        search: searchQuery,
      });      

      setData(product);
    };

    fetchProducts();
  }, [minPriceQuery, maxPriceQuery, searchSortQuery]);

  return (
    <div className="w-full min-h-screen">
      <ProductsByCategory products={data} />
    </div>
  )
}

export default SearchPage