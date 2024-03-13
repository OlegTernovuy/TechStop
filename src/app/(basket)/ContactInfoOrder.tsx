"use client";
import { useState } from "react";

function ContactInfoOrder() {
  const toOrderBlocks = [
    {
      title: "1. Контактна інформація",
    },
    {
      title: "2. Спосіб доставки",
    },
    {
      title: "3. Спосіб оплати",
    },
  ];

  const [selected, setSelected] = useState(null);

  const toggle = (i: any) => {
    if (selected === i) {
      return setSelected(null);
    }
    return setSelected(i);
  };

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
                  </button>
                  <div
                    className={
                      selected === i ? "h-auto" : "max-h-0 overflow-hidden"
                    }
                  >
                    Yes! You can purchase a license that you can share with your
                    entire team.
                    {i !== toOrderBlocks.length - 1 && (
                      <button onClick={() => toggle(i + 1)}>Continue</button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        : // <div>no data</div>
          null}
      {/* <Disclosure defaultOpen={true}>
        {({ open }) => (
          <div className="w-full border-TechStopBlue40 border-b border-t">
            <Disclosure.Button className="w-full gap-4 md:gap-0  flex items-center justify-between py-4 md:py-8  flex-col md:flex-row ">
              <p className=" w-full flex text-body1 lg:text-Headline4 text-TechStopBlue60">
                1. Контактна інформація
              </p>
              <span
                className={`${
                  open ? "hidden" : "block"
                } 'text-body1 uppercase text-TechStopBronze mr-[11px]`}
              >
                змінити
              </span>
            </Disclosure.Button>
            <Disclosure.Panel className="pb-7 text-gray-500">
              Yes! You can purchase a license that you can share with your
              entire team.
              <Disclosure.Button>
                Close
              </Disclosure.Button>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure> */}

      {/* <Disclosure>
        {({open}) => (
          <div className="w-full border-TechStopBlue40 border-b">
            <Disclosure.Button className="w-full gap-4 md:gap-0  flex items-center justify-between py-4 md:py-8  flex-col md:flex-row ">
              <p className=" w-full flex text-body1 lg:text-Headline4 text-TechStopBlue60">
                2. Спосіб доставки
              </p>
              <span
                className={`${
                  open ? "hidden" : "block"
                } 'text-body1 uppercase text-TechStopBronze mr-[11px]`}
              >
                змінити
              </span>
            </Disclosure.Button>
            <Disclosure.Panel className="pb-7 text-gray-500">
              Yes! You can purchase a license that you can share with your
              entire team.
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <div className="w-full border-TechStopBlue40 border-b mb-4 md:mb-16">
            <Disclosure.Button className="w-full gap-4 md:gap-0  flex items-center justify-between py-4 md:py-8  flex-col md:flex-row ">
              <p className=" w-full flex text-body1 lg:text-Headline4 text-TechStopBlue60">
                3. Спосіб оплати
              </p>
              <span
                className={`${
                  open ? "hidden" : "block"
                } 'text-body1 uppercase text-TechStopBronze mr-[11px]`}
              >
                змінити
              </span>
            </Disclosure.Button>
            <Disclosure.Panel className="pb-7 text-gray-500">
              Yes! You can purchase a license that you can share with your
              entire team.
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure> */}
    </div>
  );
}

export default ContactInfoOrder;
