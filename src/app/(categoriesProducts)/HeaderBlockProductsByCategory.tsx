import {
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import Link from 'next/link';
import NoSsr from '../utils/NoSsr';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCategories } from '@/api';
import { findTitleBySlug } from '../utils/findTitleBySlug';
import { useFilterModalStore } from '@/store/modalStore';

interface IPropsParams {
    pathname: string;
}

const HeaderBlockProductsByCategory = ({ pathname }: IPropsParams) => {
    const parts = pathname.split('/');
    const category = parts[2];
    const [categoryTitle, setCategoryTitle] = useState<string | null>('');

    const setShowFilterModal = useFilterModalStore(
        (state) => state.setShowFilterModal
    );

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedCategories = await getCategories();
            const title = findTitleBySlug(fetchedCategories, category);
            setCategoryTitle(title);
        };
        fetchProducts();
    }, [category]);

    const router = useRouter();
    const searchParams = useSearchParams();
    const searchSortQuery = searchParams.get('sort');
    const searchQuery = searchParams.get('search');

    const addQueryParams = (event: SelectChangeEvent) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set('sort', event.target.value as string);

        router.push(`${pathname}/?${currentParams.toString()}`);
    };

    return (
        <div className="md:border-b-[1px] border-b-TechStopBlue40 px-4 md:px-4 lg:px-6 xl:px-8">
            <div className="mx-auto w-full max-w-[1712px] pt-4 pb-4 md:py-8">
                <div className="mb-6 text-body1 text-TechStopGrey">
                    <Link href={'/'} className="hover:text-TechStopBronze">
                        Головна
                    </Link>
                    {searchQuery ? '' : `/ ${category}`}
                </div>
                <div className="flex justify-between gap-4">
                    <h2 className="hidden md:flex text-Headline3 text-TechStopBlue">
                        {searchQuery ? searchQuery : categoryTitle}
                    </h2>
                    <div className="w-full max-w-[220px]">
                        <FormControl fullWidth>
                            <NoSsr>
                                <Select
                                    value={
                                        searchSortQuery !== null
                                            ? searchSortQuery
                                            : ''
                                    }
                                    displayEmpty
                                    inputProps={{
                                        'aria-label': 'Without label',
                                    }}
                                    onChange={addQueryParams}
                                    className="h-[42px] md:h-14 text-body1 text-TechStopBlue60"
                                >
                                    <MenuItem value="">
                                        <em>Сортувати за</em>
                                    </MenuItem>
                                    <MenuItem value={'date'}>Нові</MenuItem>
                                    <MenuItem value={'-date'}>Старі</MenuItem>
                                    <MenuItem value={'price'}>дешеві</MenuItem>
                                    <MenuItem value={'-price'}>дорогі</MenuItem>
                                </Select>
                            </NoSsr>
                        </FormControl>
                    </div>
                    <button
                        className="w-full md:hidden bg-TechStopBlue text-TechStopWhite uppercas h-[42px] md:h-[52px] flex justify-center items-center py-2 rounded"
                        onClick={setShowFilterModal}
                    >
                        фільтри
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeaderBlockProductsByCategory;
