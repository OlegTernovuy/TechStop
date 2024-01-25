"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import ButtonCatalog from "../../../../components/ButtonCatalog";
import AdditionalServices from "../../../../components/AdditionalServices";
import AdditionalServicesMobile from "../AdditionalServicesMobile";
import CheaperTogether from "../CheaperTogether";
import ShoppingCardEmpty from "../../../../components/ShoppingCardEmpty";
import ProductInCard from "../ProductInCard";
import { productsInCard } from "../../../../constants";

const page = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen max-w-[1712px] mx-auto px-4">
      <button
        className="pt-4 flex text-Headline5 text-deWiseBlack md:text-Headline4 items-center"
        onClick={router.back}
      >
        <span className="pr-1 md:pr-4">
          <Image
            src="/NavigateBeforeOutlined.svg"
            alt="NavigateBeforeOutlined"
            width={24}
            height={24}
          />
        </span>
        Кошик
      </button>
      {!productsInCard.length ? (
        <ShoppingCardEmpty />
      ) : (
        <div className="text-textBlack">
          <div className="pt-6 pb-8 flex lg:divide-x w-full flex-col lg:flex-row">
            <div className="flex flex-col gap-3 lg:w-3/5 w-full lg:pr-6">
              <ProductInCard />
            </div>

            {/*Element only for mobile */}
            <AdditionalServicesMobile />
            <div className="w-full lg:w-2/5 lg:pl-20 pt-6 lg:pt-0">
              <ButtonCatalog stylesButton="w-full hidden md:flex" />
              <div className="hidden md:flex flex-col pt-10 pb-24 gap-6">
                <div className="flex justify-between items-center">
                  <p className="text-body1">Товар на суму</p>
                  <span className="text-[24px] leading-8 tracking-[0.25px]">
                    28 999
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-body1">Знижка</p>
                  <span className="text-[24px] leading-8 tracking-[0.25px]">
                    9000
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-subtitle1 md:text-body1 md:font-bold">
                  Загальна сума
                </p>
                <span className="text-subtitle1 text-textBlack md:text-Headline4">
                  19 999
                </span>
              </div>
            </div>
            {/*Element only for mobile */}
            <div className="flex flex-col md:hidden mt-4">
              <ButtonCatalog stylesButton="w-full" />
              <span className="text-Headline5 pt-8 pb-4">Разом дешевше</span>
              <CheaperTogether />
              <CheaperTogether />
              <div className="flex justify-center">
                <span className="text-Headline5 py-4 justify-center">
                  19 990
                </span>
              </div>
              <ButtonCatalog stylesButton="w-full" />
            </div>
          </div>
          <div className="hidden md:flex flex-col max-w-full">
            <h3 className="text-Headline4 mb-4">Додаткові послуги</h3>
            {/*Можливо буде потрібно для ліній*/}
            {/* <div className="flex flex-wrap w-full gap-x-8 [&>*:not(:nth-child(1)):not(:nth-child(4))]:border-l-2 [&>*:not(:nth-child(1)):not(:nth-child(4))]:pl-8"> */}
            <div className="flex flex-wrap  gap-x-8 ">
              <AdditionalServices />
              <AdditionalServices />
              <AdditionalServices />
              <AdditionalServices />
              <AdditionalServices />
              <AdditionalServices />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
