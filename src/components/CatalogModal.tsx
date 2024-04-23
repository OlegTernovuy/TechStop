"use client";

import ArrowForwardFilled from "@mui/icons-material/ArrowForward";

import { useCatalogModalStore } from "@/store/modalStore";
import Image from "next/image";
import { categoriesItems } from "@/constants";
import Link from "next/link";
import { Category, Subcategory, SubcategoryModel } from "@/types";
import { useEffect, useState } from "react";
import CloseIcon from "../../public/CloseIcon.svg";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const CatalogModal = () => {
  const showCatalog = useCatalogModalStore((state) => state.showCatalog);
  const setShowCatalog = useCatalogModalStore((state) => state.setShowCatalog);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
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
          <div className="w-full lg:w-96">
            <ul className="flex flex-col py-4 lg:py-0 text-TechStopBlue">
              {categoriesItems ? (
                categoriesItems.map((item: Category) => {
                  return (
                    <li key={item.title}>
                      <Link
                        href={`/categories/${item.id}`}
                        onMouseEnter={() => setSelectedCategory(item)}
                        onClick={setShowCatalog}
                      >
                        <div className="flex justify-between text-body1 py-3 px-4 hover:bg-TechStopBlue10">
                          <div className="flex">
                            <Image
                              src={item.icon}
                              alt={item.title}
                              width={24}
                              height={24}
                            />
                            <p className="pl-8">{item.title}</p>
                          </div>
                          <ArrowForwardFilled />
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
          <div className="hidden lg:flex flex-grow">
            {selectedCategory && (
              <div className="flex-grow grid grid-cols-[repeat(4,_1fr)] gap-[1.5rem 1rem]">
                {selectedCategory?.subcategories.map(
                  (subcategory: Subcategory) => (
                    <div
                      key={subcategory.id}
                      className="border-l border-TechStopBlue40 px-4 text-Headline6 text-TechStopBlue60"
                    >
                      <Link
                        href={`/categories/${subcategory.id}`}
                        onClick={setShowCatalog}
                      >
                        {subcategory.name}
                      </Link>
                      {subcategory.model && (
                        <div className="text-body1 text-TechStopBlue">
                          {subcategory?.model.map(
                            (subModel: SubcategoryModel) => (
                              <Link
                                key={subModel.id}
                                href={`/categories/${subModel.id}`}
                                onClick={setShowCatalog}
                              >
                                <div key={subModel.id}>{subModel.name}</div>
                              </Link>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )
                )}
                {Array.from(
                  { length: 4 - (selectedCategory?.subcategories.length % 4) },
                  (_, i) => (
                    <div
                      key={`empty-${i}`}
                      className="border-l border-TechStopBlue40 "
                    ></div>
                  )
                )}
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
