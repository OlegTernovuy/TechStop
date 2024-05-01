import Image from "next/image";
import { footerBlock } from "../constants";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {
  return (
    <footer className="bg-TechStopWhite text-TechStopBlue pt-10 pb-14 border-t-[1px] border-TechStopBlue40">
      <MaxWidthWrapper className="md:flex md:gap-5">
        <div className="flex flex-col md:mr-24 lg:mr-56 xl:mr-96">
          <Image
            src="/TechLogo.svg"
            alt="Logo"
            width={116}
            height={89}
            priority={true}
          />
          <span className="flex pt-6 gap-5">
            <Image
              src="/FacebookIcon.svg"
              alt="facebookLogo"
              width={24}
              height={24}
            />
            <Image
              src="/YoutubeIcon.svg"
              alt="youtubeLogo"
              width={24}
              height={24}
            />
            <Image src="/InstagramIcon.svg" alt="instaLogo" width={24} height={24} />
          </span>
        </div>
        <div className="md:flex md:gap-6 lg:gap-20 md:flex-wrap">
          {footerBlock.length ? (
            footerBlock.map(
              (item: { head: String; subHeaders: String[] }, index) => {
                return (
                  <div key={index} className="pt-8 md:pt-0">
                    <h2 className="pb-6 text-Headline5">
                      {item.head}
                    </h2>
                    <ul>
                      {item.subHeaders.map((el, index) => {
                        return (
                          <li key={index} className="text-body1 pb-4 last:pb-0">
                            {el}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              }
            )
          ) : (
            <div>Not Data</div>
          )}
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
