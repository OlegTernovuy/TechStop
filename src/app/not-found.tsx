import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const NotFoundPage: FC = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex items-center relative  border-b-[1px] w-full border-b-TechStopBlue40">
        {" "}
        <Link
          href="/"
          className=" flex items-center sm:absolute static z-10 top-[42px] left-[10px] lg:left-[170px]  sm:pl-0 pl-9 sm:py-0 py-6"
        >
          <Image
            src="/icon_left.svg"
            alt="icon_left"
            width={24}
            height={24}
            priority={true}
          />
          <span className="text-TechStopBlue text-lg font-medium tracking-[0.46px] ml-1 ">
            Повернутись
          </span>
        </Link>
      </div>

      <section className="flex justify-center items-center relative pt-9 pb-[196px]">
        <div className="w-[235px] h-[235px]  sm:w-[704px] sm:h-[706px]  bg-TechStopBronze20 flex justify-center flex-col items-center rounded-full ">
          <ul className="flex items-center justify-center flex-col gap-4 ">
            <li>
              <h2 className="sm:text-Headline2 text-Headline5  text-TechStopBlue">
                Йой, лишенько!
              </h2>
            </li>
            <li>
              <h2 className="sm:text-Headline1 text-Headline3 text-TechStopBlue">
                404
              </h2>
            </li>
          </ul>
          <Image
            src="/404_error.svg"
            width={1920}
            height={284}
            alt="error_image"
            className="absolute top-[146px] sm:top-[353px]"
          />
          <p className="text-center mt-auto text-base sm:text-Headline3 sm:text-TechStopBlue text-textBlack">
            Схоже сторінки, яку ви шукаєте - не існує.
          </p>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default NotFoundPage;
