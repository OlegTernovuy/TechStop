"use client";
import React, { useState } from "react";
import ContactContent from "./ContactContent";
import PaymentMethod from "./PaymentMethod";
import DeliveryMethod from "./DeliveryMethod";
import { IAdd } from "@/types";

interface TContactInfoOrder {
  orderContactData: IAdd;
  setOrderContactData: React.Dispatch<React.SetStateAction<IAdd>>;
}

const ContactInfoOrder = ({
  orderContactData,
  setOrderContactData,
}: TContactInfoOrder) => {
  const [selected, setSelected] = useState(null);

  const toggle = (i: any) => {
    if (selected === i) {
      return setSelected(null);
    }
    return setSelected(i);
  };

  const toOrderBlocks = [
    {
      title: "1. Контактна інформація",
      content: (
        <ContactContent
          toggle={toggle}
          setOrderContactData={setOrderContactData}
        />
      ),
    },
    {
      title: "2. Спосіб доставки",
      content: (
        <DeliveryMethod
          setOrderContactData={setOrderContactData}
          toggle={toggle}
        />
      ),
    },
    {
      title: "3. Спосіб оплати",
      content: (
        <PaymentMethod
          setOrderContactData={setOrderContactData}
          toggle={toggle}
        />
      ),
    },
  ];

  return (
    <div className=" w-full mt-8 mb-8">
      {toOrderBlocks.length
        ? toOrderBlocks.map((block, i) => {
            return (
              <div
                key={i}
                className={`${
                  i === toOrderBlocks.length - 1 ? "border-b" : ""
                } w-full border-TechStopBlue40 border-t`}
              >
                <button
                  className={
                    "w-full gap-4 md:gap-0 flex flex-col md:flex-row items-center justify-between py-4 md:py-8"
                  }
                  onClick={() => toggle(i)}
                >
                  <div className="flex flex-col items-center w-full">
                    <p className=" w-full flex text-body1 lg:text-Headline4 text-TechStopBlue60">
                      {block.title}
                    </p>
                    <span className="pl-6 md:pl-14 flex justify-start w-full">
                      {Object.keys(orderContactData).length ? (
                        selected !== i && i === 0 ? (
                          orderContactData?.name ? (
                            <div className="text-TechStopBlue60 pt-4 md:pt-6">{`${orderContactData?.name} ${orderContactData?.surname} / ${orderContactData?.phone}`}</div>
                          ) : null
                        ) : selected !== i && i === 1 ? (
                          orderContactData?.city ? (
                            <div className="text-TechStopBlue60 pt-4 md:pt-6">
                              <span className="flex mb-1">{`${orderContactData?.city} / ${orderContactData?.postOffice}`}</span>
                              {orderContactData?.postOffice === "Нова Пошта" ? (
                                <span className="flex text-start">
                                  {orderContactData?.novaPostDepart}
                                </span>
                              ) : orderContactData?.postOffice ===
                                "УкрПошта" ? (
                                <span className="flex text-start">
                                  {orderContactData?.ukrPostDepart}
                                </span>
                              ) : orderContactData?.postOffice ===
                                "Самовивіз з магазину" ? (
                                <span className="flex text-start">
                                  {orderContactData?.shopDepart}
                                </span>
                              ) : (
                                <span className="flex text-start">
                                  {orderContactData?.courierAddress}
                                </span>
                              )}
                            </div>
                          ) : null
                        ) : selected !== i && i === 2 ? (
                          orderContactData?.payMethod_id ? (
                            <div className="text-TechStopBlue60 pt-4 md:pt-6">{`${orderContactData?.payMethod_id}`}</div>
                          ) : null
                        ) : (
                          <div></div>
                        )
                      ) : null}
                    </span>
                  </div>
                  <span
                    className={`${
                      selected === i ? "hidden" : "block"
                    } 'text-body1 uppercase text-TechStopBronze mr-3`}
                  >
                    змінити
                  </span>
                </button>
                <div
                  className={
                    selected === i ? "h-auto pb-8" : "max-h-0 overflow-hidden"
                  }
                >
                  {block.content}
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default ContactInfoOrder;
