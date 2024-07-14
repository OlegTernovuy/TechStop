import Image from 'next/image';
import { footerBlock } from '../constants';
import MaxWidthWrapper from './MaxWidthWrapper';
import Link from 'next/link';

interface footerItem {
    head: string;
    subHeaders: SubHeader[];
}

interface SubHeader {
    title: string;
    href: string;
    target?: boolean;
}

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
                        <Image
                            src="/InstagramIcon.svg"
                            alt="instaLogo"
                            width={24}
                            height={24}
                        />
                    </span>
                </div>
                <div className="md:flex md:gap-6 lg:gap-20 md:flex-wrap pb-6">
                    {footerBlock.length ? (
                        footerBlock.map((item: footerItem, index) => {
                            return (
                                <div key={index} className="pt-8 md:pt-0">
                                    <h2 className="pb-6 text-Headline5">
                                        {item.head}
                                    </h2>
                                    <ul className='flex flex-col'>
                                        {item.subHeaders.map((el, index) => {
                                            return (
                                                <Link
                                                    key={index}
                                                    href={el.href}
                                                    target={el.target ? '_blank' : ''}
                                                    className="text-body1 pb-4 last:pb-0"
                                                >
                                                    {el.title}
                                                </Link>
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
                <Link
                    href="https://t.me/TechStop_Support_bot"
                    className="text-Headline5 font-semibold"
                    target="_blank"
                >
                    Зворотній звʼязок
                </Link>
            </MaxWidthWrapper>
        </footer>
    );
};

export default Footer;
