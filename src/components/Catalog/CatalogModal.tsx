"use client";

import { useCatalogModalStore } from "@/store/modalStore";
import Image from "next/image";
import Link from "next/link";
import { Categories } from "@/types";
import React, { useEffect, useState } from "react";
import CloseIcon from "../../../public/CloseIcon.svg";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

import laptop from "../../../public/catalogIcons/laptop.svg";
import ChevronRightFilled from "../../../public/ChevronRightFilled.svg";

interface ICategoryProps {
  categories: Categories[] | undefined;
}

const CatalogModal = ({ categories }: ICategoryProps) => {
  const showCatalog = useCatalogModalStore((state) => state.showCatalog);
  const setShowCatalog = useCatalogModalStore((state) => state.setShowCatalog);

  const [selectedCategory, setSelectedCategory] = useState<Categories | null>(
    null
    // categories === undefined ? null : categories[9]
  );

  useEffect(() => {
    const closeShoppingCartModal = (e: KeyboardEvent) => {
      if (e.code == "Escape" && showCatalog) {
        setShowCatalog();
      }
    };
    window.addEventListener("keyup", closeShoppingCartModal);
    if (showCatalog) {
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
    return () => {
      window.removeEventListener("keyup", closeShoppingCartModal);
      enableBodyScroll(document.body);
    };
  }, [showCatalog]);

  return (
    <>
      <div
        className={
          showCatalog
            ? "fixed lg:absolute lg:top-[86px] mx-auto inset-0 bg-white overflow-y-auto h-full w-full z-10 lg:max-w-[1712px] lg:h-min lg:max-h-[760px] lg:rounded-lg flex flex-col text-black divide-y divide-slate-300"
            : "hidden"
        }
      >
        <div className="flex lg:hidden justify-between p-4">
          <h3 className="text-Headline5 text-TechStopBlue">Каталог товарів</h3>
          <button onClick={setShowCatalog}>
            <Image src={CloseIcon} alt="close" width={24} height={24} />
          </button>
        </div>
        <div className="text-deWiseBlack flex lg:p-8">
          <div className="w-full lg:min-w-96 md:max-w-96 md:border-r border-TechStopBlue40">
            <ul className="flex flex-col py-4 lg:py-0 text-TechStopBlue">
              {categories ? (
                categories.map((item) => {
                  return (
                    <li key={item.title}>
                      <Link
                        href={`/categories/${item.slug}`}
                        onMouseEnter={() => setSelectedCategory(item)}
                        onClick={setShowCatalog}
                      >
                        <div className="flex justify-between text-body1 py-3 px-4 hover:bg-TechStopBlue10">
                          <div className="flex">
                            <Image
                              src={item.icon === null ? laptop : item.icon}
                              alt={item.title}
                              width={24}
                              height={24}
                            />
                            <p className="pl-8">{item.title}</p>
                          </div>
                          <Image
                            src={ChevronRightFilled}
                            alt="ChevronRightFilled"
                            width={24}
                            height={24}
                          />
                        </div>
                      </Link>
                    </li>
                  );
                })
              ) : (
                <div>Not found</div>
              )}
            </ul>
          </div>
          <div className="hidden lg:flex flex-grow text-TechStopBlue">
            {selectedCategory && (
              <div className="flex w-full">
                {selectedCategory?.children.length > 0 && (
                  <div className="flex flex-col min-w-60 border-r border-TechStopBlue40">
                    <h3 className="text-Headline6 flex justify-center mb-1">
                      Популярні категорії
                    </h3>
                    <ul className="bg-TechStopBlue10 h-full">
                      {selectedCategory?.children.map(
                        (subcategory: Categories) => (
                          <li
                            key={subcategory._id}
                            className="w-full text-body1 px-4 py-[6px]"
                          >
                            <Link
                              href={`/categories/${subcategory.slug}`}
                              onClick={setShowCatalog}
                            >
                              {subcategory.title}
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
                <div className="h-full w-full columns-3">
                  {selectedCategory?.children.map((subcategory: Categories) => (
                    <div
                      key={subcategory._id}
                      className="customBorder w-full px-4 mb-6 text-Headline6 text-TechStopBlue60 h-max break-inside-avoid-column"
                    >
                      <Link
                        href={`/categories/${subcategory.slug}`}
                        onClick={setShowCatalog}
                        className="pb-1"
                      >
                        {subcategory.title}
                      </Link>
                      {subcategory.children && (
                        <div className="text-body1 text-TechStopBlue">
                          {subcategory?.children.map((subModel) => (
                            <div className="px-4 py-[6px]" key={subModel._id}>
                              <Link
                                key={subModel._id}
                                href={`/categories/${subModel.slug}`}
                                onClick={setShowCatalog}
                              >
                                <h3>{subModel.title}</h3>
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  {/* <style jsx>{`
                  .customBorder::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 1px;
                    background-color: #02275099;
                    margin-left: -16px;
                  }
                `}</style> */}
                </div>
              </div>
            )}
          </div>
          <button onClick={setShowCatalog} className="hidden lg:flex">
            <Image src={CloseIcon} alt="close" width={24} height={24} />
          </button>
        </div>
      </div>
      <div
        className={
          showCatalog
            ? "fixed top-0 left-0 bg-black bg-opacity-30 h-screen w-full"
            : "hidden"
        }
        onClick={setShowCatalog}
      ></div>
    </>
  );
};

export default CatalogModal;
