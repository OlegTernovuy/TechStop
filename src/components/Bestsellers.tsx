import { getProductsData } from "@/api";
import HomePageProducts from "./HomePageProducts";

const Bestsellers = async () => {
  const data = await getProductsData();

  return (
    <div>
      {data === undefined || data?.length === 0 ? null : (
        <HomePageProducts products={data} title="Бестселлери" />
      )}
    </div>
  );
};

export default Bestsellers;
