import { getOrders } from "@/api";
import { PurchasesData } from "./purchasesType";
import SinglePurchase from "./SinglePurchase";

const Purchases = async () => {
  const InfoAboutPurchase = await getOrders();

  return (
    <div className="w-full">
      <h2 className="w-full hidden md:flex text-Headline5 md:text-Headline4 text-TechStopBlue mb-4 md:mb-6">
        Мої замовлення
      </h2>
      <div className="mx-auto w-full text-TechStopBlue">
        {InfoAboutPurchase !== undefined &&
          (InfoAboutPurchase.length > 0 ? (
            InfoAboutPurchase?.reverse().map((purchases: PurchasesData) => {
              return (
                <SinglePurchase
                  purchases={purchases}
                  key={purchases.orderCode}
                />
              );
            })
          ) : (
            <div>Not found</div>
          ))}
      </div>
    </div>
  );
};

export default Purchases;
