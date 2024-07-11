'use client';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { ReactNode } from 'react';
import HeaderBlockProductsByCategory from '../../HeaderBlockProductsByCategory';
import { usePathname } from 'next/navigation';
import FitlersForProducts from '../../FitlersForProducts';

interface ILayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
    const pathname = usePathname();

    return (
        <>
            <HeaderBlockProductsByCategory pathname={pathname} />
            <MaxWidthWrapper>
                <div className="flex">
                    <FitlersForProducts />
                    {children}
                </div>
            </MaxWidthWrapper>
        </>
    );
};

export default Layout;
