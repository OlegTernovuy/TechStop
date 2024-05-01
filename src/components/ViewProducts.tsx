"use client";

import { useStore } from "@/store/useStore";
import HomePageProducts from "./HomePageProducts";
import { useViewProductsStore } from "@/store/useViewProductsStore";

const ViewProducts = () => {
  const viewProducts = useStore(
    useViewProductsStore,
    (state) => state.viewProducts
  );

  return (
    <div>
      {viewProducts != undefined && viewProducts?.length > 0 && (
        <div className="lg:pl-4 py-4 md:py-5 lg:py-6">
          <HomePageProducts
            products={viewProducts}
            title="Недавно переглянуті товари"
          />
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
