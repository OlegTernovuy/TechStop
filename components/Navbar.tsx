"use client";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import SearchField from "./SearchField";
import MobileMenu from "./MobileMenu";
import ButtonCatalog from "./ButtonCatalog";
import {
  useCatalogModalStore,
  useShoppingCardModalStore,
} from "@/store/modalStore";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const setShowShoppingCard = useShoppingCardModalStore(
    (state) => state.setShowShoppingCard
  );

  const createOrder = () => {
    console.log("create order function test");
  };

  const setShowCatalog = useCatalogModalStore((state) => state.setShowCatalog);

  return (
    <header className="bg-deWiseBlack relative h-16 md:h-28 flex justify-start items-center max-w-full  ">
      <div className=" relative flex justify-between gap-6 items-center w-screen px-4 lg:px-8 xl:px-[104px]">
        <div className="flex items-center gap-0 md:gap-16">
          <button onClick={handleNav}>
            <MenuIcon
              sx={{
                width: 48,
                height: 48,
                color: "#ffffff",
              }}
            />
          </button>
          <Link href="/">
            <Image
              src="/logo-footer.svg"
              alt="logo"
              width={193}
              height={72}
              className="hidden md:block"
            />
          </Link>
          <ButtonCatalog
            icon={true}
            stylesButton="hidden lg:flex w-60"
            title="каталог товарів"
            onClick={setShowCatalog}
          />
        </div>

        <Link href="/">
          <Image
            src="/navLogo.svg"
            alt="logo"
            width={30}
            height={32}
            priority={true}
            className="max-w-[30px] md:hidden"
          />
        </Link>
        <SearchField />
        <div className="group relative">
          <button onClick={setShowShoppingCard}>
            <ShoppingCartOutlinedIcon fontSize="large" className="text-white" />
          </button>

          <div className=" z-50 bg-transparent w-[573px] group-hover:block hidden  absolute  max-h-[700px] right-0 ">
            <div className=" pl-8 pt-8 bg-white shadow-sm mt-[38px] pb-8">
              <h2 className="mb-4 text-2xl text-left">Кошик</h2>
              <div className="max-h-[200px] overflow-y-auto mr-1">
                <div className=" flex gap-4 pr-11 mb-4">
                  <Image
                    src="/productBasketTest.svg"
                    alt="test icon"
                    width={63}
                    height={96}
                  />
                  <div className=" flex flex-col">
                    <div className="flex w-full items-baseline justify-between">
                      <h2 className="w-[80%]">
                        Дуже довга назва товару з якимись цифрами HTG-7658
                      </h2>
                      <Image
                        src="/basket.svg"
                        alt="basket"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div className="w-full text-end">
                      <p className=" text-[10px] text-[rgba(38, 38, 38, 0.50)] line-through">
                        28 999
                      </p>
                      <p className="text-base text-[#FE0202]">19 999</p>
                    </div>
                  </div>
                </div>
                <div className=" flex gap-4 pr-11 mb-4">
                  <Image
                    src="/productBasketTest.svg"
                    alt="test icon"
                    width={63}
                    height={96}
                  />
                  <div className=" flex flex-col">
                    <div className="flex w-full items-baseline justify-between">
                      <h2 className="w-[80%]">
                        Дуже довга назва товару з якимись цифрами HTG-7658{" "}
                      </h2>
                      <Image
                        src="/basket.svg"
                        alt="basket"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div className="w-full text-end">
                      <p className=" text-[10px] text-[rgba(38, 38, 38, 0.50)] line-through">
                        28 999
                      </p>
                      <p className="text-base text-[#FE0202]">19 999</p>
                    </div>
                  </div>
                </div>
                <div className=" flex gap-4 pr-11 mb-4">
                  <Image
                    src="/productBasketTest.svg"
                    alt="test icon"
                    width={63}
                    height={96}
                  />
                  <div className=" flex flex-col">
                    <div className="flex w-full items-baseline justify-between">
                      <h2 className="w-[80%]">
                        Дуже довга назва товару з якимись цифрами HTG-7658{" "}
                      </h2>
                      <Image
                        src="/basket.svg"
                        alt="basket"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div className="w-full text-end">
                      <p className=" text-[10px] text-[rgba(38, 38, 38, 0.50)] line-through">
                        28 999
                      </p>
                      <p className="text-base text-[#FE0202]">19 999</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-end justify-end pr-11">
                <ButtonCatalog
                  stylesButton="w-[244px] mt-[32px]"
                  title="Оформити замовлення"
                  icon={false}
                  onClick={createOrder}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileMenu nav={nav} handleNav={handleNav} />
    </header>
  );
};

export default Navbar;
