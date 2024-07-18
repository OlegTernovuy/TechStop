import formatPrice from '@/app/utils/formatPrice';
import { useCartStore } from '@/store/useCartStore';
import { Product } from '@/types';
import { Rating } from '@mui/material';
import Image from 'next/image';
import { DiscountPercentage } from '@/constants';
import { useViewProductsStore } from '@/store/useViewProductsStore';
import defaultProductIcon from '../../public/defaultProductIcon.svg';

import favorite from '../../public/favorite.svg';
import activeFavorite from '../../public/activeFavorite.svg';

import calculateRating from '@/app/utils/calculateRating';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import toast from 'react-hot-toast';
import NoSsr from '@/app/utils/NoSsr';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

type IProduct = {
    product: Product;
};

const SingleProduct = ({ product }: IProduct) => {
    const { addItemToCart } = useCartStore();
    const { addItemToViewProducts } = useViewProductsStore();
    const { toggleProductCardToFavorites, isFavoriteProduct } =
        useFavoritesStore();

    // const isFavoriteProduct = useStore(useFavoritesStore, (state) => state.isFavoriteProduct);

    const { data: session } = useSession();

    useEffect(() => {}, []);

    const addProductToCart = (
        product: Product,
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e?.preventDefault();
        e?.stopPropagation();
        // if(!product.inStock) {
        //     toast.error(`Sorry, this product is out of stock`);
        // } else {
        addItemToCart(product);
        // toast.success(`Product ${product.title} was added to basket`);
        // }
    };

    const addProductToFavorite = (
        product: Product,
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e?.preventDefault();
        e?.stopPropagation();
        session !== null
            ? toggleProductCardToFavorites(product)
            : toast.error(`Please log in`);
    };

    const addProductToView = (product: Product) => {
        addItemToViewProducts(product);
    };

    const oldPrice = formatPrice(product.price * DiscountPercentage);
    const newPrice = formatPrice(product.price);

    return (
        <div
            className="w-full h-full flex flex-col justify-between"
            onClick={() => addProductToView(product)}
        >
            <div>
                <div className="relative">
                    <Image
                        src={product.poster ?? defaultProductIcon}
                        alt="cartImage"
                        height={370}
                        width={240}
                        className="w-full min-h-[260px] md:min-h-[370px] object-scale-down"
                    />
                    <button
                        className="absolute bottom-4 right-4 cursor-pointer"
                        onClick={(e) => addProductToFavorite(product, e)}
                    >
                        <NoSsr>
                            {isFavoriteProduct(product._id) ? (
                                <Image
                                    src={activeFavorite}
                                    alt="favorite"
                                    width={32}
                                    height={32}
                                />
                            ) : (
                                <Image
                                    src={favorite}
                                    alt="favorite"
                                    width={32}
                                    height={32}
                                />
                            )}
                        </NoSsr>
                    </button>
                </div>
                <p className="py-1 text-TechStopBlue text-body1 lg:text-base">
                    {product.title}{' '}
                </p>
            </div>
            <div>
                <Rating
                    name="read-only"
                    value={calculateRating(product.rating)}
                    precision={0.5}
                    readOnly
                />
                <div className="flex justify-between mt-2 items-center">
                    <div className="flex flex-col">
                        <span className="text-sm line-through text-TechStopBlue">
                            {oldPrice + ' ₴'}
                        </span>
                        <span className="text-TechStopRed text-xl">
                            {newPrice + ' ₴'}
                        </span>
                    </div>
                    <div className="flex space-x-2.5">
                        <Image
                            src="/PriceCartIcon.svg"
                            alt="priceCart"
                            width={32}
                            height={32}
                        />
                        <button onClick={(e) => addProductToCart(product, e)}>
                            <Image
                                src="/ShoppingCartIconBronze.svg"
                                alt="shoppingCard"
                                width={32}
                                height={32}
                                className="hover:[filter:drop-shadow(0px_3px_1px_#02275066)] ease-out duration-200 active:bg-TechStopBlue10 active:rounded-md"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
