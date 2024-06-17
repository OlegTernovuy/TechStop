'use client'
import { searchedProducts } from '@/api';
import ProductsByCategory from '@/app/(categoriesProducts)/ProductsByCategory';
import { Product } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const SearchPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    
    const search = searchParams.get('search')

    const addQueryParams = () => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set('minPrice', '300');
    
        router.push(`/products/search/?${currentParams.toString()}`);
    }

    const [data, setData] = useState<Product[] | undefined>();

  useEffect(() => {
    const fetchProducts = async () => {
      const product = await searchedProducts({
        search: search,
      });

      setData(product);
    };

    fetchProducts();
  }, [search]);

  return (
    <div className="w-full min-h-screen">
        <button onClick={addQueryParams}>addQuery</button>
      <ProductsByCategory products={data} />
    </div>
  )
}

export default SearchPage