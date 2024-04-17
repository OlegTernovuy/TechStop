"use client";

import ArrowForwardFilled from "@mui/icons-material/ArrowForward";

import { useCatalogModalStore } from "@/store/modalStore";
import Image from "next/image";
import { categoriesItems } from "@/constants";
import Link from "next/link";
import { Category, Subcategory } from "@/types";
import { useState } from "react";

const CatalogModal = () => {
  const showCatalog = useCatalogModalStore((state) => state.showCatalog);
  const setShowCatalog = useCatalogModalStore((state) => state.setShowCatalog);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  typeof window !== "undefined"
    ? showCatalog
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden")
    : null;

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
            <Image src="CloseIcon.svg" alt="close" width={24} height={24} />
          </button>
        </div>
        <div className="text-deWiseBlack flex lg:p-8">
          <div className="w-96">
            <ul className="flex flex-col py-4 lg:py-0 text-TechStopBlue">
              {categoriesItems ? (
                categoriesItems.map((item: Category) => {
                  return (
                    <li key={item.title}>
                      <Link
                        // href="/"
                        href={`/categories/${item.id}`}
                        onMouseEnter={() => setSelectedCategory(item)}
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
          <div className="w-60 hidden lg:flex">
            {selectedCategory && (
              <div className="">
                {selectedCategory?.subcategories.map(
                  (subcategory: Subcategory) => (
                    <div key={subcategory.id}>{subcategory.name}</div>
                  )
                )}
              </div>
            )}
          </div>
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
