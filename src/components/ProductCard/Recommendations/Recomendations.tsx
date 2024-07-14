import { getProductsData } from "@/api";
import HomePageProducts from "@/components/HomePageProducts";
import React from "react";

const Recommendations = async () => {
  const data = await getProductsData();

  return (
    <div>
      {data && data?.products.length !== 0 ? (
        <div>
          <HomePageProducts
            products={data.products}
            title="Також Вас можуть зацікавити"
          />
        </div>
      ) : (
        <div>Oops something went wrong</div>
      )}
    </div>
  );
};

export default Recommendations;
