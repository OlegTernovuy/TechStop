"use client";

import Image from "next/image";
import Link from "next/link";
import { profileNavItems } from "@/constants";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col md:flex-row">
        <ul className="flex flex-col pt-0 pb-6 md:pt-6 w-screen ml-[-16px] md:ml-0 md:w-96 h-max text-TechStopBlue md:border-b border-TechStopBlue40">
          {profileNavItems.map((item) => (
            <li
              key={item.title}
              className={`${
                pathname === item.url ? "bg-TechStopBronze20 md:bg-TechStopBlue10" : ""
              } "flex justify-between text-body1 py-3 px-4 border-b border-TechStopBlue20 md:border-none hover:bg-TechStopBronze20 hover:md:bg-TechStopBlue10`}
            >
              <Link href={item.url} className="flex gap-8">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={24}
                  height={24}
                />
                <p>{item.title}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="min-h-screen w-full md:px-8 md:pt-8 md:border-l border-TechStopBlue40">
          {children}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
