"use client";

import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import formatPrice from "@/app/utils/formatPrice";
import Button from "@/components/ui/Button";
import { PurchasesData, PurchasesProduct } from "./purchasesType";
import defaultProductIcon from "../../../../public/defaultProductIcon.svg";
import { useCartStore } from "@/store/useCartStore";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Purchase {
  purchases: PurchasesData;
}

const SinglePurchase = ({ purchases }: Purchase) => {  
  const router = useRouter()
  const { addItemToCart } = useCartStore();

  const formattedDate = format(purchases.createdAt, "dd MMMM yyyy", {
    locale: uk,
  });

  const repeatOrder = (purchaseProduct: PurchasesProduct) => {
    const newOrder = {
      _id: purchaseProduct.id.toString(), //Тимчасово потім замінити
      poster: purchaseProduct.poster,
      price: purchaseProduct.price,
      title: purchaseProduct.title,
      quantity: purchaseProduct.quantity,
    };
    console.log(newOrder);
    
    addItemToCart(newOrder);
    // toast.success('Your order has been added to the cart');
  };

  const leaveFeetback = (id: string) => {
    router.push(`/products/${id}/feedback`)
  }

  return (
    <div>
      {purchases.products.map((purchaseProduct: PurchasesProduct) => {        
        return (
          <Disclosure as="div" key={purchases.orderCode} className="mb-4">
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
                              Замовлення № {purchases.orderCode}
                            </span>
                            <span className="lg:inline hidden text-sm">
                              від {formattedDate} року
                            </span>
                          </p>
                          <p className="flex items-baseline">
                            <span className="text-subtitle2 lg:text-Headline6 mr-[6px] text-TechStopGreen">
                              {/* {purchases.orderStatus} */}
                            </span>
                            <span className="flex md:hidden text-sm mt-1 mb-6">
                              від {formattedDate}
                            </span>
                            {open && (
                              <span className="hidden lg:flex text-sm">
                                {formattedDate} року
                              </span>
                            )}
                          </p>
                        </div>
                        <div
                          className={`${open ? "hidden" : "flex"} md:hidden`}
                        >
                          <p className="text-subtitle1 text-TechStopBlue60 mr-4">
                            <span>{purchases.paymentStatus}</span>
                          </p>
                          <span className="text-subtitle1">
                            {formatPrice(purchaseProduct.price)} ₴
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Image
                          src={purchaseProduct.poster ?? defaultProductIcon}
                          alt="shoppingCardItemTest"
                          width={90}
                          height={62}
                          className={`${
                            open ? "mr-6" : ""
                          } max-h-16 min-w-[90px] object-scale-down`}
                        />
                        <p
                          className={`${
                            open ? "flex" : "hidden"
                          } max-w-60 text-start text-sm md:text-subtitle1`}
                        >
                          {purchaseProduct.title}
                        </p>
                      </div>
                      {open && (
                        <span className="hidden lg:flex text-subtitle1">
                          {formatPrice(purchaseProduct.price)} х{" "}
                          {purchaseProduct.quantity}
                        </span>
                      )}
                      <div className="hidden md:flex lg:flex-row xl:flex-col justify-between gap-1 md:gap-2 mt-6 xl:mt-0">
                        <p className="text-subtitle1 text-TechStopBlue60">
                          <span
                            className={`${open ? "text-TechStopGreen" : ""}`}
                          >
                            {purchases.paymentStatus}
                          </span>
                          {open && <span>/ {purchases.paymentMethod}</span>}
                        </p>
                        <span className="text-Headline6 text-end">
                          {formatPrice(purchaseProduct.price)} ₴
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
                      <span className={`${open ? "text-TechStopGreen" : ""}`}>
                        {purchases.paymentStatus}
                      </span>
                      {open && <span>/ {purchases.paymentMethod}</span>}
                    </p>
                    <span className="text-Headline6 text-end">
                      {formatPrice(purchaseProduct.price)} ₴
                    </span>
                  </div>
                  <Disclosure.Panel
                    className={`${
                      open ? "flex-col-reverse lg:flex-row" : ""
                    } flex justify-between px-2 md:px-4 pb-2 md:pb-4 pt-6 md:pt-8`}
                  >
                    <div className="flex flex-col lg:flex-row gap-4 lg:gap-20">
                      <p className="flex flex-col">
                        <span className="text-sm mb-2">Адреса доставки</span>
                        <span className="text-subtitle1 max-w-64">
                          {`${purchases?.deliveryAddress?.city} ${purchases?.deliveryAddress?.street !== undefined ? `, ${purchases?.deliveryAddress?.street} ${purchases?.deliveryAddress?.house}/${purchases?.deliveryAddress?.apartment}` : ''} `}
                        </span>
                      </p>
                      <p className="flex flex-col">
                        <span className="text-sm mb-2">Отримувач</span>
                        <span className="text-subtitle1">
                          {purchases?.recepient?.name} <br />
                          {purchases?.recepient?.phone}
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-2 md:gap-6 mb-6">
                      <Button
                        title="Повторити замовлення"
                        stylesButton="flex w-full lg:max-w-[255px] px-6 bg-white text-TechStopBlue border border-TechStopBlue60 uppercase"
                        onClick={() => repeatOrder(purchaseProduct)}
                      />
                      <Button
                        title="залишити відгук"
                        onClick={() => leaveFeetback(purchaseProduct.productId)}
                        stylesButton="flex w-full lg:max-w-[196px] px-6 bg-white text-TechStopBlue border border-TechStopBlue60 uppercase"
                      />
                    </div>
                  </Disclosure.Panel>
                </div>
              </>
            )}
          </Disclosure>
        );
      })}
    </div>
  );
};

export default SinglePurchase;
