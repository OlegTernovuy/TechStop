import Image from "next/image";
import { Metadata } from "next";
import Catalog from "../components/Catalog";
import OpenCatalogMainPage from "../components/OpenCatalogMainPage";
import ViewProducts from "@/components/ViewProducts";
import Bestsellers from "@/components/Bestsellers";
import MainBanerTest from "../../public/MainBanerTest.svg";

export const metadata: Metadata = {
  title: "Home Shop page",
  description: "Its new Ukraine shop",
};

export default function Home() {
  return (
    <main className="min-h-screen max-w-[1712px] lg:px-6 xl:px-8 flex mx-auto md:divide-x-[1px] divide-TechStopBlue40 overflow-hidden">
      <aside className="hidden lg:block w-80">
        <div className="border-b-[1px] border-b-TechStopBlue40">
          <Catalog />
        </div>
      </aside>
      <section className=" lg:w-[calc(100%_-_300px)]">
        <div className="pb-4 pt-2 lg:pt-4 lg:pl-4">
          <Image
            src={MainBanerTest}
            alt="baner"
            priority
            width={1306}
            height={360}
            className="object-cover min-h-[300px] max-h-[360px]"
          />
        </div>
        <div className="px-2 md:px-4 lg:px-0 md:divide-y-[1px] divide-TechStopBlue40">
          <OpenCatalogMainPage />
          <ViewProducts />
          <Bestsellers />
          {/* <HomePageProducts products={viewProducts} title="Недавно переглянуті товари"/> */}
          {/* <HomePageProducts title="Бестселлери"/> */}
        </div>
      </section>
    </main>
  );
}
