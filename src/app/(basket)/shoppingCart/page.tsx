"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import ButtonCatalog from "../../../../components/ButtonCatalog";
import AdditionalServices from "../../../../components/AdditionalServices";
import AdditionalServicesMobile from "../AdditionalServicesMobile";
import CheaperTogether from "../CheaperTogether";
import ShoppingCardEmpty from "../../../../components/ShoppingCartEmpty";
import ProductInCard from "../ProductInCard";
import MaxWidthWrapper from "../../../../components/MaxWidthWrapper";
import { useCartStore } from "@/store/useCartStore";
import { useStore } from "@/store/useStore";
import { additionalServices } from "../../../../constants";

const ShoppingCart = () => {
  const router = useRouter();

  const cartItems = useStore(useCartStore, (state) => state.cartItems);
  const additionalService = useStore(
    useCartStore,
    (state) => state.additionalService
  );

  const totalPrice = () => {
    let totalPrice = 0;
    let priceWithAddService = 0;
    cartItems?.forEach((item) => {
      totalPrice += item.price * item.quantity!;
    });
    additionalService?.forEach((item) => {
      priceWithAddService += item.servicesPrice;
    });
    return { totalPrice, priceWithAddService };
  };

  const price = totalPrice()
    .totalPrice.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const priceWithAddServices = (
    totalPrice().priceWithAddService + totalPrice().totalPrice
  )
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <MaxWidthWrapper className="min-h-screen">
      <div className="border-b-2 pb-4 lg:border-b-0">
        <button
          className="pt-4 flex text-Headline5 text-deWiseBlack md:text-Headline4 items-center"
          onClick={router.back}
        >
          <span className="pr-1 md:pr-4">
            <Image
              src="/NavigateBeforeOutlined.svg"
              alt="NavigateBeforeOutlined"
              width={24}
              height={24}
            />
          </span>
          Кошик
        </button>
      </div>
      {!cartItems?.length ? (
        <ShoppingCardEmpty />
      ) : (
        <div className="text-textBlack">
          <div className="pt-4 md:pt-6 pb-8 flex lg:divide-x w-full flex-col lg:flex-row">
            <div className="flex flex-col gap-3 lg:w-8/12 xl:w-3/5 w-full lg:pr-8 xl:pr-24">
              {cartItems.length ? (
                cartItems.map((product) => {
                  return <ProductInCard product={product} key={product.id} />;
                })
              ) : (
                <div>Not Data</div>
              )}
            </div>
            <AdditionalServicesMobile /> {/*Element only for mobile */}
            <div className="w-full lg:w-4/12 xl:w-2/5 lg:pl-8 xl:pl-24 pt-6 lg:pt-0">
              <ButtonCatalog
                stylesButton="w-full hidden md:flex bg-deWiseMain text-deWiseBlack"
                title="перейти до оформлення"
              />
              <div className="hidden md:flex flex-col pt-10 pb-24 gap-6">
                <div className="flex justify-between items-center">
                  <p className="text-body1">Товар на суму</p>
                  <span className="text-[24px] leading-8 tracking-[0.25px]">
                    {price}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-body1">Знижка</p>
                  <span className="text-[24px] leading-8 tracking-[0.25px]">
                    9000
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="hidden md:flex text-subtitle1 md:text-body1 md:font-bold">
                  Загальна сума
                </p>
                <p className="md:hidden text-subtitle1 md:text-body1 md:font-bold">
                  Разом до сплати
                </p>
                <span className="text-subtitle1 text-textBlack md:text-Headline4">
                  {priceWithAddServices}
                </span>
              </div>
            </div>
            {/*Element only for mobile */}
            <div className="flex flex-col md:hidden mt-4">
              <ButtonCatalog
                stylesButton="w-full bg-deWiseMain text-deWiseBlack"
                title="Оформити замовлення"
              />
              <span className="text-Headline5 pt-8 pb-4">Разом дешевше</span>
              <CheaperTogether />
              <CheaperTogether />
              <div className="flex justify-center">
                <span className="text-Headline5 py-4 justify-center">
                  19 990
                </span>
              </div>
              <ButtonCatalog
                stylesButton="w-full bg-deWiseMain text-deWiseBlack"
                title="придбати комплект"
              />
            </div>
          </div>
          <div className="hidden md:flex flex-col max-w-full">
            <h3 className="text-Headline4 mb-4">Додаткові послуги</h3>
            <div className="grid gap-x-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 lg:[&>*:nth-child(even)]:border-l-2 lg:[&>*:nth-child(even)]:pl-8 xl:[&>*:nth-child(4)]:!pl-0 xl:[&>*:nth-child(4)]:!border-l-0 xl:[&>*:not(:nth-child(1)):not(:nth-child(4))]:border-l-2 xl:[&>*:not(:nth-child(1)):not(:nth-child(4))]:pl-8">
              {additionalServices.length ? (
                additionalServices.map((service) => {
                  return (
                    <AdditionalServices service={service} key={service.id} />
                  );
                })
              ) : (
                <div>Not Data</div>
              )}
            </div>
          </div>
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default ShoppingCart;
