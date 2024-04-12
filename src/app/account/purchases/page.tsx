"use client";

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

  const repeatOrder = (orderDetail: IInfoAboutPurchase) => {
    const newOrder = {
      id: orderDetail.productId,
      inStock: orderDetail.inStock,
      poster: orderDetail.orderIcon,
      price: orderDetail.orderPrice,
      oldPrice: orderDetail.orderPrice,
      title: orderDetail.orderTitle,
    };
    addItemToCart(newOrder);
  };

  return (
    <div className="w-full">
      <h2 className="w-full text-Headline5 md:text-Headline4 text-TechStopBlue md:mb-6">
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
                      <Disclosure.Button className="flex justify-between w-full px-4 py-4 items-center">
                        <div
                          className={`${
                            open ? "mr-6" : "mr-14"
                          } w-full flex items-center justify-between`}
                        >
                          <div>
                            <p>
                              <span className="text-Headline6 mr-[6px]">
                                Замовлення № {purchases.orderNumber}
                              </span>
                              <span className="text-sm">
                                від {purchases.orderDate} року
                              </span>
                            </p>
                            <p className="flex items-baseline">
                              <span className="text-Headline6 mr-[6px] text-TechStopGreen">
                                {purchases.orderStatus}
                              </span>
                              {open && (
                                <span className="text-sm">
                                  {purchases.orderDate} року
                                </span>
                              )}
                            </p>
                          </div>
                          <div className="flex">
                            <Image
                              src={purchases.orderIcon}
                              alt="shoppingCardItemTest"
                              width={90}
                              height={62}
                              className="max-h-16 object-cover mr-6"
                            />
                            <p
                              className={`${
                                open ? "flex" : "hidden"
                              } max-w-60 text-start`}
                            >
                              {purchases.orderTitle}
                            </p>
                          </div>
                          {open && (
                            <div>
                              <span className="text-subtitle1">
                                {purchases.orderPrice} х {purchases.orderCount}
                              </span>
                            </div>
                          )}
                          <div className="flex flex-col">
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
                              {purchases.orderPrice} ₴
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
                      <Disclosure.Panel className="flex justify-between px-4 pb-4 pt-8">
                        <div className="flex gap-20">
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
                        <div className="flex gap-6">
                          <Button
                            title="Повторити замовлення"
                            stylesButton="w-full lg:max-w-[255px] px-6 bg-white text-TechStopBronze lg:text-TechStopBlue lg:border border-TechStopBlue60 uppercase"
                            onClick={() => repeatOrder(purchases)}
                          />
                          <Button
                            title="залишити відгук"
                            stylesButton="w-full lg:max-w-[196px] px-6 bg-white text-TechStopBronze lg:text-TechStopBlue lg:border border-TechStopBlue60 uppercase"
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
