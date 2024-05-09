import Image from "next/image";
import { Metadata } from "next";
import Catalog from "../components/Catalog/Catalog";
import OpenCatalogMainPage from "../components/OpenCatalogMainPage";
import ViewProducts from "@/components/ViewProducts";
import Bestsellers from "@/components/Bestsellers";
import MainBanerTest from "../../public/MainBanerTest.svg";
import question_mark from "../../public/question_mark.svg";
import Link from "next/link";

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
        <Link href={`/InformationCenter`}>
          <div className="flex text-body1 py-3 px-4 mt-6 hover:bg-TechStopBronze20 text-TechStopBlue">
            <Image
              src={question_mark}
              alt={question_mark}
              width={24}
              height={24}
            />
            <p className="pl-8">Довідковий центр</p>
          </div>
        </Link>
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
        </div>
      </section>
    </main>
  );
}
