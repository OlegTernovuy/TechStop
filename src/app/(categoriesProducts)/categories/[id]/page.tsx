'use client';

import { getProductsByQuery } from '@/api';
import { Product } from '@/types';
import { FC, useEffect, useState } from 'react';
import ProductsByCategory from '../../ProductsByCategory';
import { useSearchParams } from 'next/navigation';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@mui/styles';
import { CircularProgress } from '@mui/material';

interface ICatalogItemsProps {
    params: {
        id: string;
    };
}

const useStyles = makeStyles({
    loaderContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 9999,
    },
});

const CatalogItem: FC<ICatalogItemsProps> = ({ params }) => {
    const { id } = params;

    const searchParams = useSearchParams();
    const minPriceQuery = searchParams.get('minPrice');
    const maxPriceQuery = searchParams.get('maxPrice');
    const searchSortQuery = searchParams.get('sort');

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Product[] | undefined>();
    const [page, setPage] = useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const classes = useStyles();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const product = await getProductsByQuery({
                category: id,
                minPrice: Number(minPriceQuery),
                maxPrice: Number(maxPriceQuery),
                sort: searchSortQuery,
                // page: page,
            });
            setData(product);
            setLoading(false);
        };

        fetchProducts();
    }, [id, minPriceQuery, maxPriceQuery, searchSortQuery, page]);

    return (
        <div className="w-full flex flex-col justify-between">
            {loading && (
                <div className={classes.loaderContainer}>
                    <CircularProgress />
                </div>
            )}
            <ProductsByCategory products={data} />
            <div className="flex justify-center my-8">
                <Pagination count={10} page={page} onChange={handleChange} />
            </div>
        </div>
    );
};

export default CatalogItem;
