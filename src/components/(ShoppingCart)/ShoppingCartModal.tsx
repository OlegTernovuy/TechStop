"use client";

import { useShoppingCartModalStore } from "@/store/modalStore";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import ShoppingCardEmpty from "./ShoppingCartEmpty";
import Button from "../ui/Button";
import HomePageProducts from "../HomePageProducts";
import ProductInCard from "./ProductInCard";
import formatPrice from "@/app/utils/formatPrice";
import { useViewProductsStore } from "@/store/useViewProductsStore";
import CloseIcon from "../../../public/CloseIcon.svg";
import { useEffect } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const ShoppingCartModal = () => {
  const { showShoppingCart, setShowShoppingCart } = useShoppingCartModalStore();
  const cartItems = useStore(useCartStore, (state) => state.cartItems);
  const totalPrice = useStore(useCartStore, (state) => state.totalPrice);

  const productsPriceWithAdd = formatPrice(totalPrice?.priceWithAddService);
  const calculateDiscountPrice = () => {
    if (totalPrice && totalPrice.totalPrice !== undefined) {
      return totalPrice.totalPrice / 5;
    } else {
      return undefined;
    }
  };
  const discountPrice = calculateDiscountPrice();

  const calculateProductsPrice = () => {
    if (totalPrice && totalPrice.totalPrice !== undefined) {
      return totalPrice.totalPrice * 1.2;
    } else {
      return undefined;
    }
  };
  const productsPrice = calculateProductsPrice();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/orderCart" && showShoppingCart) {
      setShowShoppingCart();
    }
  }, [pathname]);

  const routerToOrderPage = () => {
    router.push("/orderCart");
    if (pathname === "/orderCart") {
      setShowShoppingCart();
    }
  };

  useEffect(() => {
    const closeShoppingCartModal = (e: KeyboardEvent) => {
      if (e.code == "Escape" && showShoppingCart) {
        setShowShoppingCart();
      }
    };
    window.addEventListener("keyup", closeShoppingCartModal);
    if (showShoppingCart) {
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
    return () => {
      window.removeEventListener("keyup", closeShoppingCartModal);
      enableBodyScroll(document.body);
    };
  }, [showShoppingCart]);

  const viewProducts = useStore(
    useViewProductsStore,
    (state) => state.viewProducts
  );

  return (
    <>
      <div
        className={
          showShoppingCart
            ? "fixed inset-0 bg-white overflow-y-auto h-full w-full z-10 md:max-w-[1400px] md:h-min md:max-h-[760px] m-auto md:rounded-lg flex flex-col text-TechStopBlue"
            : "hidden"
        }
      >
        <div className="flex justify-between items-center p-4 md:p-8 border-b-[1px] md:border-b-0 border-TechStopBlue40">
          <h3 className="text-Headline5 md:text-Headline3 text-TechStopBlue">
            Кошик
          </h3>
          <button onClick={setShowShoppingCart}>
            <Image src={CloseIcon} alt="close" width={24} height={24} />
          </button>
        </div>
        <div>
          {!cartItems?.length ? (
            <ShoppingCardEmpty />
          ) : (
            <div className="text-TechStopBlue px-4 md:px-8">
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
                <div className="md:hidden"></div>
                <div className="w-full lg:w-[30%] flex flex-col justify-between lg:pl-6 pt-6 lg:pt-0">
                  <div className="hidden md:flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                      <p className="text-Headline5">Товар на суму</p>
                      <span className="text-Headline5">
                        {formatPrice(productsPrice) + " ₴"}
                      </span>
                    </div>
                    <div className="flex flex-col gap-6">
                      {cartItems.length
                        ? cartItems.map((product) => {
                            return product.addServices?.map((service) => {
                              return (
                                <div
                                  className="flex justify-between items-center"
                                  key={service.servicesId}
                                >
                                  <p className="text-Headline5">
                                    {service.servicesTitle}
                                  </p>
                                  <span className="text-Headline5">
                                    {formatPrice(service.servicesPrice) + " ₴"}
                                  </span>
                                </div>
                              );
                            });
                          })
                        : null}
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-Headline5">Знижка</p>
                      <span className="text-Headline5">
                        {formatPrice(discountPrice)} ₴
                      </span>
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
                      {productsPriceWithAdd + " ₴"}
                    </span>
                  </div>
                </div>
                {/*Element only for mobile */}
                <div className="flex flex-col md:hidden mt-4">
                  <Button
                    stylesButton="w-full bg-TechStopBlue text-TechStopWhite"
                    title="Оформити замовлення"
                    onClick={routerToOrderPage}
                  />
                </div>
              </div>
              <div className="hidden md:flex justify-between pb-10">
                <Button
                  title="продовжити покупки"
                  onClick={setShowShoppingCart}
                  stylesButton="border-[1px] border-TechStopBlue40"
                />
                <Button
                  title="Оформити замовлення"
                  stylesButton="bg-TechStopBlue text-TechStopWhite w-96"
                  onClick={routerToOrderPage}
                />
              </div>
              {viewProducts != undefined && viewProducts?.length > 0 && (
                <div className="hidden md:flex mb-8 w-full">
                  <HomePageProducts
                    products={viewProducts}
                    title="Недавно переглянуті товари"
                    ShowAllItems={false}
                  />
                </div>
              )}
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
