import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FiltersForm from './FiltersForm';
import { IPriceFilter } from '@/types';
import { useFilterModalStore } from '@/store/modalStore';

const FiltersForProducts = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const minPriceQuery = searchParams.get('minPrice');
    const maxPriceQuery = searchParams.get('maxPrice');

    const addQueryParams = (
        minPrice?: number | null,
        maxPrice?: number | null
    ) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        
        if (minPrice !== undefined && minPrice !== null) {
            currentParams.set('minPrice', String(minPrice));
        } else {
            currentParams.delete('minPrice');
        }

        if (maxPrice !== undefined && maxPrice !== null) {
            currentParams.set('maxPrice', String(maxPrice));
        } else {
            currentParams.delete('maxPrice');
        }

        router.push(`${pathname}/?${currentParams.toString()}`);
    };

    const showFilterModal = useFilterModalStore(
        (state) => state.showFilterModal
    );
    const setHideFilterModal = useFilterModalStore(
        (state) => state.setHideFilterModal
    );

    const {
        formState: { errors },
        reset,
    } = useForm<IPriceFilter>({});

    const onSubmit: SubmitHandler<IPriceFilter> = (data) => {
        addQueryParams(
            data.priceFrom ? Number(data.priceFrom) : null,
            data.priceTo ? Number(data.priceTo) : null
        );
        setHideFilterModal();
    };

    useEffect(() => {
        reset({
            priceFrom:
                minPriceQuery === null ? undefined : Number(minPriceQuery),
            priceTo: maxPriceQuery === null ? undefined : Number(maxPriceQuery),
        });
    }, [reset, maxPriceQuery, minPriceQuery]);

    return (
        <>
            <aside className="hidden md:flex min-h-screen min-w-80 pt-8 pr-6 border-r-[1px] border-r-TechStopBlue40">
                <FiltersForm
                    onSubmit={onSubmit}
                    minPriceQuery={minPriceQuery}
                    maxPriceQuery={maxPriceQuery}
                />
            </aside>

            {showFilterModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-full h-full md:w-[80%] max-w-screen-lg p-8">
                        <FiltersForm
                            onSubmit={onSubmit}
                            minPriceQuery={minPriceQuery}
                            maxPriceQuery={maxPriceQuery}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default FiltersForProducts;
