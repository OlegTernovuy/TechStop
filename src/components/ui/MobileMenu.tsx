"use client";

import Image from "next/image";
import Link from "next/link";
import { mobileMenuInfo, mobileMenuSocialMedia } from "../../constants";
import { NavigationProps } from "../../types";
import {
  useCatalogModalStore,
  useShoppingCartModalStore,
} from "@/store/modalStore";

import ButtonCatalogIcon from "../../../public/ButtonCatalogIcon.svg";
import AccountCircleOutlined from "../../../public/AccountCircleOutlined.svg";
import question_mark from "../../../public/question_mark.svg";
import cart from "../../../public/cart.svg";

const MobileMenu = ({ nav, handleNav }: NavigationProps) => {
  const setShowCatalog = useCatalogModalStore((state) => state.setShowCatalog);
  const setShowShoppingCart = useShoppingCartModalStore(
    (state) => state.setShowShoppingCart
  );
  return (
    <>
      <nav
        className={
          nav
            ? "fixed left-0 top-0 w-10/12 md:w-96 h-full bg-white text-TechStopBlue z-10 overflow-y-scroll"
            : "hidden"
        }
      >
        <div className="flex justify-between px-4 py-3 border-b border-TechStopBlue20">
          <Link href="/" onClick={handleNav}>
            <Image
              src="/TechLogo.svg"
              alt="Logo"
              width={66}
              height={51}
              className="h-[51px]"
            />
          </Link>
          <button onClick={handleNav}>
            <Image src="CloseIcon.svg" alt="close" width={24} height={24} />
          </button>
        </div>
        <div className="text-body1">
          <ul className="flex flex-col">
            <li
              className="py-3 pl-4 hover:bg-TechStopBronze20"
              onClick={handleNav}
            >
              <button onClick={setShowCatalog} className="flex">
                <Image
                  src={ButtonCatalogIcon}
                  alt="buttonIcon"
                  width={24}
                  height={24}
                  className="mr-8"
                />
                Каталог товарів
              </button>
            </li>
            <li
              className="py-3 pl-4 hover:bg-TechStopBronze20"
              onClick={handleNav}
            >
              <Link href={"/account"} className="flex">
                <Image
                  src={AccountCircleOutlined}
                  alt="accountIcon"
                  width={24}
                  height={24}
                  className="mr-8"
                />
                Особистий кабінет
              </Link>
            </li>
            <li
              className="py-3 pl-4 hover:bg-TechStopBronze20"
              onClick={handleNav}
            >
              <Link href="/" className="flex">
                <Image
                  src={question_mark}
                  alt="questionIcon"
                  width={24}
                  height={24}
                  className="mr-8"
                />
                Довідковий центр
              </Link>
            </li>
            <li
              className="py-3 pl-4 hover:bg-TechStopBronze20"
              onClick={handleNav}
            >
              <button onClick={setShowShoppingCart} className="flex">
                <Image
                  src={cart}
                  alt="cartIcon"
                  width={24}
                  height={24}
                  className="mr-8"
                />
                Кошик
              </button>
            </li>
          </ul>
          <hr className="my-2 text-slate-300" />
          <ul className="flex flex-col text-body1">
            {mobileMenuInfo.length > 0 ? (
              mobileMenuInfo.map((item: { title: string; href: string }) => {
                return (
                  <li
                    className="py-3 pl-4 hover:bg-TechStopBronze20"
                    key={item.title}
                  >
                    <Link href={item.href}>{item.title}</Link>
                  </li>
                );
              })
            ) : (
              <div>No Data</div>
            )}
          </ul>
          <hr className="my-2 text-slate-300" />
          <div>
            <p className="pl-4 mt-6 mb-4">Ми в соціальних мережах:</p>
            <div className="flex text-deWiseMain pl-4 gap-6">
              {mobileMenuSocialMedia.length > 0 ? (
                mobileMenuSocialMedia.map(
                  (item: { href: string; imageSrc: string }) => {
                    return (
                      <Link href={item?.href} target="_blank" key={item.href}>
                        <Image
                          src={item.imageSrc}
                          alt="Logo"
                          width={24}
                          height={24}
                        />
                      </Link>
                    );
                  }
                )
              ) : (
                <div>No Data</div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div
        className={
          nav
            ? "fixed top-0 left-0 bg-black bg-opacity-50 h-screen w-full"
            : "hidden"
        }
        style={{ zIndex: 1 }}
        onClick={handleNav}
      ></div>
    </>
  );
};

export default MobileMenu;
