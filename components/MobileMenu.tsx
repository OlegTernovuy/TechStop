"use client";

import Image from "next/image";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { mobileMenuInfo, mobileMenuLinkInfo, mobileMenuSocialMedia } from "../constants";
import { Navigation } from "../types";

const MobileMenu = ({ nav, handleNav }: Navigation) => {
  return (
    <>
      <nav
        className={
          nav
            ? "fixed left-0 top-0 w-10/12 md:w-96 h-full bg-white text-deWiseBlack z-10 overflow-y-scroll"
            : "hidden"
        }
      >
        <div className="flex justify-between bg-deWiseBlack px-4 py-3">
          <Link href="/" onClick={handleNav}>
            <Image
              src='/logo-footer.svg'
              alt="Logo"
              width={109}
              height={40}
              className="h-[40px]"
            />
          </Link>
          <button onClick={handleNav}>
            <CloseIcon fontSize="medium" className="text-white" />
          </button>
        </div>
        <div className=" text-deWiseBlack text-base">
          <ul className="flex flex-col uppercase">
            {mobileMenuLinkInfo.length > 0 ? (
              mobileMenuLinkInfo.map((item) => {
                return (
                  <li
                    key={item.title}
                    className="py-3 pl-4 hover:bg-deWiseMainHover"
                    onClick={handleNav}
                  >
                    <Link href={item.href} className="flex">
                      <Image
                        src={item.imageSrc}
                        alt="buttonIcon"
                        width={24}
                        height={24}
                        className="mr-8"
                      />
                      {item.title}
                    </Link>
                  </li>
                );
              })
            ) : (
              <div>No Data</div>
            )}
          </ul>
          <hr className="my-2 text-slate-300" />
          <ul className="flex flex-col uppercase ">
            {mobileMenuInfo.length > 0 ? (
              mobileMenuInfo.map((item) => {
                return (
                  <li
                    className="py-3 pl-4 hover:bg-deWiseMainHover"
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
                mobileMenuSocialMedia.map((item: any) => {
                  return (
                    <Link href={item?.href} target="_blank" key={item.href}>
                      <Image
                        src={item.imageSrc}
                        alt="Logo"
                        width={32}
                        height={32}
                      />
                    </Link>
                  );
                })
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
