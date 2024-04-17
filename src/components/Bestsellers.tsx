import { getProductsData } from "@/api";
import HomePageProducts from "./HomePageProducts";

const Bestsellers = async () => {
  const data = await getProductsData();

  return <HomePageProducts products={data} title="Бестселлери" />;
};

export default Bestsellers;
