import Image from "next/image";
import { Metadata } from "next";
import Catalog from "../../components/Catalog";
import OpenCatalogMainPage from "../../components/OpenCatalogMainPage";

export const metadata: Metadata = {
  title: "Home Shop page",
  description: "Its new Ukraine shop",
};

export default function Home() {
  return (
    <main className="min-h-screen max-w-[1712px] lg:px-6 xl:px-8 flex mx-auto md:divide-x">
      <aside className="hidden lg:block w-96">
        <Catalog />
      </aside>
      <section className="lg:pl-4 lg:w-[calc(100%_-_300px)]">
        <div className="mb-4">
          <Image
            src="/MainBaner.svg"
            alt="baner"
            width={1306}
            height={360}
            className="object-cover max-h-[360px]"
          />
        </div>
        <div className="px-4 md:px-0">
          <OpenCatalogMainPage />
        </div>
      </section>
    </main>
  );
}
