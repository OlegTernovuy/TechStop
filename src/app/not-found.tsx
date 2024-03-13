import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const NotFoundPage: FC = () => {
  return (
    <>
      <div className="flex items-center relative sm:border-b-[1px] w-full border-b-TechStopBlue40">
        {" "}
        <Link
          href="/"
          className=" flex items-center absolute sm:static z-10 top-[42px] md:left-[10px] left-[170px]  sm:pl-[34px] sm:py-[23px]"
        >
          <Image
            src="/icon_left.svg"
            alt="icon_left"
            width={24}
            height={24}
            priority={true}
          />
          <span className="text-[15px] font-medium leading-[1.7333] tracking-[0.46px] ml-[4px] ">
            Повернутись
          </span>
        </Link>
      </div>

      <section className="flex justify-center items-center relative pt-[37px] pb-[196px]">
        <div className="sm:w-[235px] sm:h-[235px]   w-[704px] h-[706px]  bg-TechStopBronze20 flex justify-center flex-col items-center rounded-full ">
          <ul className="flex items-center justify-center flex-col gap-[16px] ">
            <li>
              <h2 className="text-Headline2 sm:text-Headline5  text-TechStopBlue">
                Йой, лишенько!
              </h2>
            </li>
            <li>
              <h2 className="text-Headline1 sm:text-Headline3 text-TechStopBlue">
                404
              </h2>
            </li>
          </ul>
          <Image
            src="/404_error.svg"
            width={1920}
            height={284}
            alt="error_image"
            className="absolute sm:top-[146px] top-[353px]"
          />
          <p className="text-center mt-auto sm:text-base text-Headline3 text-TechStopBlue sm:text-textBlack">
            Схоже сторінки, яку ви шукаєте - не існує.
          </p>
        </div>
      </section>
    </>
  );
};

export default NotFoundPage;
