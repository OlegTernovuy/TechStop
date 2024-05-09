"use client";

import formatPrice from "@/app/utils/formatPrice";
import Button from "@/components/ui/Button";
import { InfoAboutPurchase } from "@/constants";
import { useCartStore } from "@/store/useCartStore";
import { IInfoAboutPurchase } from "@/types";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";

const Purchases = () => {
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

  const { addItemToCart } = useCartStore();

  // const repeatOrder = (orderDetail: IInfoAboutPurchase) => {
  //   const newOrder = {
  //     id: orderDetail.productId,
  //     inStock: orderDetail.inStock,
  //     poster: orderDetail.orderIcon,
  //     price: orderDetail.orderPrice,
  //     title: orderDetail.orderTitle,
  //     quantity: orderDetail.orderCount,
  //   };
  //   addItemToCart(newOrder);
  // };

  return (
    <div className="w-full">
      <h2 className="w-full text-Headline5 md:text-Headline4 text-TechStopBlue mb-4 md:mb-6">
        Мої замовлення
      </h2>
      <div className="mx-auto w-full text-TechStopBlue">
        {InfoAboutPurchase?.length > 0 ? (
          InfoAboutPurchase?.map((purchases: IInfoAboutPurchase) => {
            return (
              <Disclosure as="div" key={purchases.orderNumber} className="mb-4">
                {({ open }) => (
                  <>
                    <div className="border border-TechStopBlue40 rounded">
                      <Disclosure.Button className="flex justify-between w-full p-2 lg:p-4 items-center h-auto">
                        <div
                          className={`${
                            open
                              ? "md:mr-6 mr-4 flex-col lg:flex-row lg:items-center"
                              : "md:mr-14 mr-4 items-center"
                          } w-full h-full flex  justify-between`}
                        >
                          <div className="flex flex-col justify-between h-full">
                            <div className="flex flex-col text-start gap-1 md:gap-2">
                              <p className="">
                                <span className="text-subtitle2 lg:text-Headline6 mr-[6px]">
                                  Замовлення № {purchases.orderNumber}
                                </span>
                                <span className="lg:inline hidden text-sm">
                                  від {purchases.orderDate} року
                                </span>
                              </p>
                              <p className="flex items-baseline">
                                <span className="text-subtitle2 lg:text-Headline6 mr-[6px] text-TechStopGreen">
                                  {purchases.orderStatus}
                                </span>
                                <span className="flex md:hidden text-sm mt-1 mb-6">
                                  від {purchases.orderDate}
                                </span>
                                {open && (
                                  <span className="hidden lg:flex text-sm">
                                    {purchases.orderDate} року
                                  </span>
                                )}
                              </p>
                            </div>
                            <div
                              className={`${
                                open ? "hidden" : "flex"
                              } md:hidden`}
                            >
                              <p className="text-subtitle1 text-TechStopBlue60 mr-4">
                                <span>{purchases.paymentStatus}</span>
                              </p>
                              <span className="text-subtitle1">
                                {formatPrice(purchases.orderPrice)} ₴
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Image
                              src={purchases.orderIcon}
                              alt="shoppingCardItemTest"
                              width={90}
                              height={62}
                              className={`${
                                open ? "mr-6" : ""
                              } max-h-16 min-w-[90px] object-cover`}
                            />
                            <p
                              className={`${
                                open ? "flex" : "hidden"
                              } max-w-60 text-start text-sm md:text-subtitle1`}
                            >
                              {purchases.orderTitle}
                            </p>
                          </div>
                          {open && (
                            <span className="hidden lg:flex text-subtitle1">
                              {formatPrice(purchases.orderPrice)} х{" "}
                              {purchases.orderCount}
                            </span>
                          )}
                          <div className="hidden md:flex lg:flex-row xl:flex-col justify-between gap-1 md:gap-2 mt-6 xl:mt-0">
                            <p className="text-subtitle1 text-TechStopBlue60">
                              <span
                                className={`${
                                  open ? "text-TechStopGreen" : ""
                                }`}
                              >
                                {purchases.paymentStatus}
                              </span>
                              {open && <span>/ {purchases.PaymentMethod}</span>}
                            </p>
                            <span className="text-Headline6 text-end">
                              {formatPrice(purchases.orderPrice)} ₴
                            </span>
                          </div>
                        </div>
                        <Image
                          src={"/ArrowDropDownFilledPurchases.svg"}
                          alt="ArrowDropDownFilledPurchases"
                          width={24}
                          height={24}
                          className={`${
                            open ? "rotate-180 transform" : ""
                          } h-5 w-5`}
                        />
                      </Disclosure.Button>
                      <div
                        className={`${
                          open ? "flex justify-between mt-6 mx-2" : "hidden"
                        } md:hidden `}
                      >
                        <p className="text-subtitle1 text-TechStopBlue60">
                          <span
                            className={`${open ? "text-TechStopGreen" : ""}`}
                          >
                            {purchases.paymentStatus}
                          </span>
                          {open && <span>/ {purchases.PaymentMethod}</span>}
                        </p>
                        <span className="text-Headline6 text-end">
                          {formatPrice(purchases.orderPrice)} ₴
                        </span>
                      </div>
                      <Disclosure.Panel
                        className={`${
                          open ? "flex-col-reverse lg:flex-row" : ""
                        } flex justify-between px-2 md:px-4 pb-2 md:pb-4 pt-6 md:pt-8`}
                      >
                        <div className="flex flex-col lg:flex-row gap-4 lg:gap-20">
                          <p className="flex flex-col">
                            <span className="text-sm mb-2">
                              Адреса доставки
                            </span>
                            <span className="text-subtitle1 max-w-64">
                              {purchases.deliveryAddress}
                            </span>
                          </p>
                          <p className="flex flex-col">
                            <span className="text-sm mb-2">Отримувач</span>
                            <span className="text-subtitle1">
                              {purchases.orderRecipientName} <br />
                              {purchases.orderRecipientPhone}
                            </span>
                          </p>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-2 md:gap-6 mb-6">
                          <Button
                            title="Повторити замовлення"
                            stylesButton="flex w-full lg:max-w-[255px] px-6 bg-white text-TechStopBlue border border-TechStopBlue60 uppercase"
                            // onClick={() => repeatOrder(purchases)}
                          />
                          <Button
                            title="залишити відгук"
                            stylesButton="flex w-full lg:max-w-[196px] px-6 bg-white text-TechStopBlue border border-TechStopBlue60 uppercase"
                          />
                        </div>
                      </Disclosure.Panel>
                    </div>
                  </>
                )}
              </Disclosure>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Purchases;
