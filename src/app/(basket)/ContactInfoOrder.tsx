import React from "react";

function ContactInfoOrder() {
  return (
    <div className=" w-full mt-8 ">
      <div className="w-full border-[rgba(0, 0, 0, 0.12)] border-b border-t gap-4 md:gap-0  flex items-center justify-between py-4 md:py-8  flex-col md:flex-row ">
        <p className=" w-full text-[16px] ld:text-[32px] text-[#b5b5b5] font-normal">
          1. Контактна інформація
        </p>
        <button className="text-[15px] text-deWiseMain mr-[11px]">
          змінити
        </button>
      </div>
      <div className="w-full border-[rgba(0, 0, 0, 0.12)] border-b  gap-4 md:gap-0  flex items-center justify-between py-4 md:py-8  flex-col md:flex-row">
        <p className="w-full text-[16px] ld:text-[32px] text-[#b5b5b5]">
          2. Спосіб доставки
        </p>
        <button className=" text-[15px] text-deWiseMain mr-[11px]">
          змінити
        </button>
      </div>
      <div className="w-full mb-[16px] md:mb-16 border-[rgba(0, 0, 0, 0.12)] border-b gap-4 md:gap-0  flex items-center justify-between py-4 md:py-8 flex-col md:flex-row">
        <p className=" w-full text-[16px] ld:text-[32px] text-[#b5b5b5]">
          3. Спосіб оплати
        </p>
        <button className="text-[15px] text-deWiseMain mr-[11px]">
          змінити
        </button>
      </div>
    </div>
  );
}

export default ContactInfoOrder;
