"use client";
import React, { useState } from "react";
import ContactContent from "./ContactContent";
import PaymentMethod from "./PaymentMethod";
import DeliveryMethod from "./DeliveryMethod";

export interface IAdd {
  [key: string]: string; // або вкажіть більше типів, якщо є потреба
}

function ContactInfoOrder() {

  const [add, setAdd] = useState<IAdd>({})
  const formContactData = new FormData();
  const formDeliveryData = new FormData();
  const formPayData = new FormData();
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
        <ContactContent formContactData={formContactData} toggle={toggle} setAdd={setAdd} />
      ),
    },
    {
      title: "2. Спосіб доставки",
      content: (
        <DeliveryMethod formDeliveryData={formDeliveryData} toggle={toggle} />
      ),
    },
    {
      title: "3. Спосіб оплати",
      content: <PaymentMethod formPayData={formPayData} />,
    },
  ];

  const combinedFormData = new FormData();

  // const confirm = () => {
  //   console.log('1');
    
  //   [formContactData, formDeliveryData, formPayData].forEach((formData) => {
  //     for (const key of Array.from(formData.keys())) {
  //       const value = formData.get(key);
  //       if (value !== null) {
  //         console.log(key, value.toString());
          
  //         combinedFormData.append(key, value.toString());
  //       }
  //     }
  //   });
  // }

  console.log(add);
  

  return (
    <div className=" w-full mt-8 mb-8">
      {toOrderBlocks.length
        ? toOrderBlocks.map((block, i) => {
            return (
              <div key={i}>
                <div
                  className={`${
                    i === toOrderBlocks.length - 1 ? "border-b" : ""
                  } w-full border-TechStopBlue40 border-t`}
                >
                  <button
                    className="w-full gap-4 md:gap-0  flex items-center justify-between py-4 md:py-8  flex-col md:flex-row "
                    onClick={() => toggle(i)}
                  >
                    <p className=" w-full flex text-body1 lg:text-Headline4 text-TechStopBlue60">
                      {block.title}
                    </p>
                    <span
                      className={`${
                        selected === i ? "hidden" : "block"
                      } 'text-body1 uppercase text-TechStopBronze mr-[11px]`}
                    >
                      змінити
                    </span>
                    {/* <span>
                      {formData.has("name") ? (
                        <div>{String(formData.get("name"))}</div>
                      ) : null}
                    </span> */}
                  </button>
                  <div
                    className={
                      selected === i ? "h-auto pb-8" : "max-h-0 overflow-hidden"
                    }
                  >
                    {block.content}
                  </div>
                </div>
              </div>
            );
          })
        : null}
        {/* <button onClick={confirm}>confirm</button> */}
    </div>
  );
}

export default ContactInfoOrder;
