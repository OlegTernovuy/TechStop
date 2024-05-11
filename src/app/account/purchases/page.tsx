// "use client";

// import { InfoAboutPurchase } from "@/constants";
import { getOrders } from "@/api";
import { useCartStore } from "@/store/useCartStore";
import { PurchasesData } from "./purchasesType";
import SinglePurchase from "./SinglePurchase";
import { IInfoAboutPurchase } from "@/types";

const Purchases = async () => {
  // const router = useRouter();
  // const user = null;

  // useEffect(() => {
  //   if (user === null) {
  //     router.push(
  //       `/login?error=${encodeURIComponent(
  //         "You must be logged in to view this page."
  //       )}&redirect=${encodeURIComponent("/account")}`
  //     );
  //   }
  // }, []);

  const InfoAboutPurchase = await getOrders();

  return (
    <div className="w-full">
      <h2 className="w-full hidden md:flex text-Headline5 md:text-Headline4 text-TechStopBlue mb-4 md:mb-6">
        Мої замовлення
      </h2>
      <div className="mx-auto w-full text-TechStopBlue">
        {InfoAboutPurchase !== undefined &&
          (InfoAboutPurchase.length > 0 ? (
            InfoAboutPurchase?.map((purchases: PurchasesData) => {
              return <SinglePurchase purchases={purchases} key={purchases.orderCode}/>;
            })
          ) : (
            <div>Not found</div>
          ))}
      </div>
    </div>
  );
};

export default Purchases;
