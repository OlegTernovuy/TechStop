"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ButtonCatalog from "../../../components/ui/ButtonCatalog";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import ProductOrderCard from "../ProductOrderCard";
import ContactInfoOrder from "../ContactInfoOrder";
import MaxWidthWrapper from "../../../components/MaxWidthWrapper";
import { useCartStore } from "@/store/useCartStore";
import { useStore } from "@/store/useStore";
import formatPrice from "@/app/utils/formatPrice";
import { IAdd } from "@/types";

function OrderCart() {
  const router = useRouter();
  const cartItems = useStore(useCartStore, (state) => state.cartItems);
  const totalPrice = useStore(useCartStore, (state) => state.totalPrice);

  const productsPrice = formatPrice(totalPrice?.totalPrice);
  const productsPriceWithAdd = formatPrice(totalPrice?.priceWithAddService);

  const [orderContactData, setOrderContactData] = useState<IAdd>({});
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (Object.keys(orderContactData).length === 7) {
      setDisabled(false);
    }
  }, [orderContactData]);

  // console.log(orderContactData);
  

  return (
    <MaxWidthWrapper className="min-h-screen">
      <div className="w-full flex items-center justify-between  pl-4 pt-4 md:pt-8 pb-4 md:pb-6 mb-4 md:mb-0 border-b md:border-b-0 border-TechStopBlue40 text-TechStopBlue">
        <h2 className="text-Headline5 md:text-Headline4">Оформити замовлення</h2>
        <button
          onClick={router.back}
          className="text-body1 uppercase text-TechStopBronze hidden md:flex"
        >
          <Image
            src="/arowBronzeIcon.svg"
            alt="arrow icon"
            width={24}
            height={24}
          />
          <span>повертутись до покупок </span>
        </button>
      </div>
      <div className="w-full flex flex-col md:flex-row">
        <div className=" w-full md:w-[70%] md:pr-6 md:border-TechStopBlue40 md:border-r">
          {cartItems?.length ? (
            cartItems.map((item) => {
              return <ProductOrderCard product={item} key={item.id} />;
            })
          ) : (
            <div>Order Cart is Empty</div>
          )}
          <div className=" text-Headline6 flex items-center justify-between md:hidden">
            <p>Разом до сплати</p>
            <p>{productsPriceWithAdd}</p>
          </div>
          <ContactInfoOrder
            setOrderContactData={setOrderContactData}
            orderContactData={orderContactData}
          />
          <div className=" w-full mb-4 md:mb-[122px]">
            <TextField
              id="outlined-required"
              label="Коментар до замовлення"
              autoFocus={false}
              defaultValue=" "
              sx={{
                "& .MuiInputBase-root": {
                  height: 80,
                },
              }}
              fullWidth
            />
          </div>
        </div>
        <div className=" w-full md:w-[30%] text-body1 lg:text-Headline5 text-TechStopBlue">
          <div className=" md:pl-6  ">
            <div className="flex flex-col gap-3 md:gap-6">
              <div className="w-full flex items-center justify-between">
                <p>Товар на суму</p>
                <p className="font-bold md:font-normal">{productsPrice}</p>
              </div>
              <div className="flex flex-col gap-3 md:gap-6 text-body1 lg:text-Headline5">
                {cartItems?.length
                  ? cartItems?.map((product) => {
                      return product.addServices?.map((service) => {
                        return (
                          <div
                            className="flex justify-between items-center"
                            key={service.servicesId}
                          >
                            <p>{service.servicesTitle}</p>
                            <span>{service.servicesPrice}</span>
                          </div>
                        );
                      });
                    })
                  : null}
              </div>
              <div className="w-full flex items-center justify-between">
                <p>Вартість доставки</p>
                <p>150</p>
              </div>
            </div>

            <div>
              <div className="w-full flex items-center justify-between mt-[40px] md:mt-24 font-bold mb-4 md:mb-[42px]">
                <p>До сплати</p>
                <p className="text-body1 md:text-Headline4">
                  {productsPriceWithAdd}
                </p>
              </div>
              <ButtonCatalog
                title="оформити замовлення"
                stylesButton={`w-[100%] h-[52px] ${
                  disabled ? "bg-DisabledBackground" : "bg-TechStopBlue"
                } ${
                  disabled
                    ? "text-DisabledBackgroundText"
                    : "text-TechStopWhite"
                }`}
                disabled={disabled}
              />
              <div className="w-[100%] lg:border-b border-TechStopBlue40 mt-[31px]"></div>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default OrderCart;
