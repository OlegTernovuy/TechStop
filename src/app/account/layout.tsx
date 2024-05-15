"use client";

import Image from "next/image";
import Link from "next/link";
import { profileNavItems } from "@/constants";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { redirect, usePathname } from "next/navigation";
import question_mark from '../../../public/question_mark.svg'
import { useSession } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  if(!session?.user) {
    redirect('/')
  }

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col lg:flex-row">
        <div>
        <ul className="flex flex-col pt-0 pb-6 md:pt-6 w-screen ml-[-16px] lg:ml-0 lg:w-96 h-max text-TechStopBlue lg:border-b border-TechStopBlue40">
          {profileNavItems.map((item) => (
            <li
              key={item.title}
              className={`${
                pathname === item.url ? "bg-TechStopBronze20 lg:bg-TechStopBlue10" : ""
              } "flex justify-between text-body1 py-3 px-4 border-b border-TechStopBlue20 lg:border-none hover:bg-TechStopBronze20 hover:md:bg-TechStopBlue10`}
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
        <Link href={`/InformationCenter`} className="hidden md:flex">
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
        </div>
        <div className="min-h-screen w-full md:px-8 md:pt-8 lg:border-l border-TechStopBlue40">
          {children}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
