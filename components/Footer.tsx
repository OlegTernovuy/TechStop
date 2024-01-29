import Image from "next/image";
import { footerBlock } from "../constants";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {
  return (
    <footer className="py-6 bg-deWiseBlack text-white">
      <MaxWidthWrapper className="md:flex md:justify-around md:gap-5">
        <div className="flex flex-col">
          <Image
            src="/logo-footer.svg"
            alt="Logo"
            width={193}
            height={72}
            priority={true}
          />
          <span className="flex pt-6 gap-6">
            <Image
              src="/facebook_line.svg"
              alt="facebookLogo"
              width={32}
              height={32}
            />
            <Image
              src="/youtube-line.svg"
              alt="youtubeLogo"
              width={32}
              height={32}
            />
            <Image src="/insta.svg" alt="instaLogo" width={32} height={32} />
          </span>
        </div>
        <div className="md:flex md:gap-6 lg:gap-20 md:flex-wrap">
          {footerBlock.length ? (
            footerBlock.map((item) => {
              return (
                <div key={item.head} className="pt-8 md:pt-0">
                  <h2 className="pb-6 text-Headline5 text-deWiseGray">
                    {item.head}
                  </h2>
                  <ul>
                    {item.subHeaders.map((el: string, index: number) => {
                      return (
                        <li key={index} className="text-base pb-4 last:pb-0">
                          {el}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })
          ) : (
            <div>Not Data</div>
          )}
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
