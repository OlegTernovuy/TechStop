"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import ButtonCatalog from "../../../../components/ButtonCatalog";
import AdditionalServices from "../../../../components/AdditionalServices";
import AdditionalServicesMobile from "../AdditionalServicesMobile";
import CheaperTogether from "../CheaperTogether";
import ShoppingCardEmpty from "../../../../components/ShoppingCartEmpty";
import ProductInCard from "../ProductInCard";
import { productsInCard } from "../../../../constants";

const ShoppingCart = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen max-w-[1712px] mx-auto px-4">
      <div className="border-b-2 pb-4 md:border-b-0">
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
      </div>
      {!productsInCard.length ? (
        <ShoppingCardEmpty />
      ) : (
        <div className="text-textBlack">
          <div className="pt-4 md:pt-6 pb-8 flex lg:divide-x w-full flex-col lg:flex-row">
            <div className="flex flex-col gap-3 lg:w-8/12 xl:w-3/5 w-full lg:pr-8 xl:pr-24">
              <ProductInCard />
            </div>

            {/*Element only for mobile */}
            <AdditionalServicesMobile />
            <div className="w-full lg:w-4/12 xl:w-2/5 lg:pl-8 xl:pl-24 pt-6 lg:pt-0">
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
                <p className="hidden md:flex text-subtitle1 md:text-body1 md:font-bold">
                  Загальна сума
                </p>
                <p className="md:hidden text-subtitle1 md:text-body1 md:font-bold">
                  Разом до сплати
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
            <div className="grid gap-x-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 lg:[&>*:nth-child(even)]:border-l-2 lg:[&>*:nth-child(even)]:pl-8 xl:[&>*:nth-child(4)]:!pl-0 xl:[&>*:nth-child(4)]:!border-l-0 xl:[&>*:not(:nth-child(1)):not(:nth-child(4))]:border-l-2 xl:[&>*:not(:nth-child(1)):not(:nth-child(4))]:pl-8">
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

export default ShoppingCart;
