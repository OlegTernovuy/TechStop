import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import ButtonCatalog from "../../components/ButtonCatalog";

export const metadata: Metadata = {
  title: "Home Shop page",
  description: "Its new Ukraine shop",
};

export default function Home() {
  return (
    <main className="min-h-screen max-w-screen-xl flex flex-col mx-auto">
      <div className="mb-4">
        <Image
          src="/MainBaner.svg"
          alt="baner"
          width={1306}
          height={360}
          className="object-cover max-h-[360px]"
        />
      </div>
      <section className="px-4">
        <Link href="/?catalog=true" className="md:hidden">
          <ButtonCatalog />
        </Link>
      </section>
    </main>
  );
}
