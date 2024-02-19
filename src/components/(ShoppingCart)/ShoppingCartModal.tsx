"use client";

import { useShoppingCartModalStore } from "@/store/modalStore";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStore } from "zustand";
import ShoppingCardEmpty from "./ShoppingCartEmpty";
import ButtonCatalog from "../ui/ButtonCatalog";
import HomePageProducts from "../HomePageProducts";
import ProductInCard from "./ProductInCard";
import AdditionalServicesMobile from "./AdditionalServicesMobile";
import CheaperTogether from "./CheaperTogether";

const ShoppingCartModal = () => {
  const showShoppingCart = useShoppingCartModalStore(
    (state) => state.showShoppingCart
  );
  const setShowShoppingCart = useShoppingCartModalStore(
    (state) => state.setShowShoppingCart
  );

  typeof window !== "undefined"
    ? showShoppingCart
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden")
    : null;

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
    <>
      <div
        className={
          showShoppingCart
            ? "fixed inset-0 p-8 bg-white overflow-y-auto h-full w-full z-10 md:max-w-[1400px] md:h-min md:max-h-[800px] m-auto md:rounded-lg flex flex-col text-TechStopBlue"
            : "hidden"
        }
      >
        <div className="flex justify-between items-start">
          <h3 className="text-Headline3 text-TechStopBlue">Кошик</h3>
          <button onClick={setShowShoppingCart}>
            <Image src="CloseIcon.svg" alt="close" width={24} height={24} />
          </button>
        </div>
        <div>
          {!cartItems?.length ? (
            <ShoppingCardEmpty />
          ) : (
            <div className="text-TechStopBlue">
              <div className="pt-4 md:pt-6 pb-12 flex lg:divide-x w-full flex-col lg:flex-row">
                <div className="flex flex-col gap-3 lg:w-[70%]  w-full lg:pr-6">
                  {cartItems.length ? (
                    cartItems.map((product) => {
                      return (
                        <ProductInCard product={product} key={product.id} />
                      );
                    })
                  ) : (
                    <div>Not Data</div>
                  )}
                </div>
                <div className="md:hidden">
                  <AdditionalServicesMobile /> {/*Element only for mobile */}
                </div>
                <div className="w-full lg:w-[30%] flex flex-col justify-between lg:pl-6 pt-6 lg:pt-0">
                  <div className="hidden md:flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                      <p className="text-Headline5">Товар на суму</p>
                      <span className="text-Headline4">{price}</span>
                    </div>
                    <div className="flex flex-col gap-6">
                      {additionalService.length
                        ? additionalService.map((service) => {
                            return (
                              <div
                                className="flex justify-between items-center"
                                key={service.id}
                              >
                                <p className="text-Headline5">
                                  {service.title}
                                </p>
                                <span className="text-Headline4">
                                  {service.servicesPrice}
                                </span>
                              </div>
                            );
                          })
                        : null}
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-Headline5">Знижка</p>
                      <span className="text-Headline4">9000</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="hidden md:flex text-subtitle1 md:text-Headline5">
                      Загальна сума
                    </p>
                    <p className="md:hidden text-subtitle1 md:text-Headline5">
                      Разом до сплати
                    </p>
                    <span className="text-subtitle1 md:text-Headline4">
                      {priceWithAddServices}
                    </span>
                  </div>
                </div>
                {/*Element only for mobile */}
                <div className="flex flex-col md:hidden mt-4">
                  <ButtonCatalog
                    stylesButton="w-full bg-deWiseMain text-deWiseBlack"
                    title="Оформити замовлення"
                    onClick={() => router.push("/shoppingCart/orderCart")}
                  />
                  <span className="text-Headline5 pt-8 pb-4">
                    Разом дешевше
                  </span>
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
              <div className="flex justify-between pb-10">
                <ButtonCatalog
                  title="продовжити покупки"
                  onClick={setShowShoppingCart}
                  stylesButton="border-[1px] border-TechStopBlue40"
                />
                <ButtonCatalog
                  title="Оформити замовлення"
                  stylesButton="bg-TechStopBlue text-TechStopWhite w-96"
                />
              </div>
              <div className="hidden md:flex flex-col max-w-full">
                <HomePageProducts ShowAllItems={false} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className={
          showShoppingCart
            ? "fixed top-0 left-0 bg-black bg-opacity-30 h-screen w-full overflow-x-hidden"
            : "hidden"
        }
        onClick={setShowShoppingCart}
      ></div>
    </>
  );
};

export default ShoppingCartModal;
