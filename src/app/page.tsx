import Image from "next/image";
import { Metadata } from "next";
import ButtonCatalog from "../../components/ButtonCatalog";
import Catalog from "../../components/Catalog";

export const metadata: Metadata = {
  title: "Home Shop page",
  description: "Its new Ukraine shop",
};

export default function Home() {
  return (
    <main className="min-h-screen max-w-screen-2xl flex mx-auto md:divide-x">
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
            <ButtonCatalog stylesButton="w-full md:hidden"/>
        </div>
      </section>
    </main>
  );
}
