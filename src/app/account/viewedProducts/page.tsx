'use client'

import { useStore } from "@/store/useStore";
import { useViewProductsStore } from "@/store/useViewProductsStore";

const ViewedProducts = () => {
  const ViewedProducts = useStore(
    useViewProductsStore,
    (state) => state.viewProducts
  );
  // console.log(ViewedProducts);

  return <div>
    {
      ViewedProducts && (
        ViewedProducts.map(ViewedProduct =>
          <div key={ViewedProduct.id}>
            {ViewedProduct.title}
          </div>
        )
      ) 
    }
  </div>;
};

export default ViewedProducts;
