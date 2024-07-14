import { getProductsData } from "@/api";
import HomePageProducts from "./HomePageProducts";

const Bestsellers = async () => {
  const data = await getProductsData();

  return (
    <div>

      {data === undefined || data?.products?.length === 0 ? null : (
        <div className="lg:pl-4 py-4 md:py-5 lg:py-6">
          <HomePageProducts products={data?.products} title="Бестселлери" />
        </div>
      )}
    </div>
  );
};

export default Bestsellers;
