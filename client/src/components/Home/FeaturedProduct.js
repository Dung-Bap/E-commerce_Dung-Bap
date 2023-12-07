import React, { useEffect, useState } from 'react';
import ProductCard from '../product/ProductCard';
import { apiGetProducts } from '../../apis/products';
import withBaseComponent from '../../hocs/withBaseComponent';
import path from '../../ultils/path';

const FeaturedProduct = ({ navigate }) => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    const fetchFeaturedProduct = async () => {
        const response = await apiGetProducts({ limit: 9, sort: '-totalRatings' });
        if (response?.success) setFeaturedProducts(response?.products);
    };

    useEffect(() => {
        fetchFeaturedProduct();
    }, []);

    return (
        <>
            <div className="w-full mt-[20px]">
                <h2 className="w-full font-semibold text-[20px] py-[15px] border-b-2 border-main">FEATURED PRODUCTS</h2>
                <div className="sm:flex flex-wrap sm:mx-[-10px] mt-[20px]">
                    {featuredProducts?.map(featuredProduct => (
                        <ProductCard key={featuredProduct._id} data={featuredProduct} />
                    ))}
                </div>
            </div>
            <div className="w-full flex flex-col gap-3 sm:grid grid-cols-4 grid-rows-2 sm:gap-4">
                <img
                    loading="lazy"
                    onClick={() => navigate(`/${path.PRODUCTS}`)}
                    alt=""
                    className="cursor-pointer w-full h-full object-cover col-span-2 row-span-2 "
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
                />

                <img
                    loading="lazy"
                    onClick={() => navigate(`/${path.PRODUCTS}`)}
                    alt=""
                    className="cursor-pointer w-full h-full object-cover col-span-1 row-span-1 "
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
                />
                <img
                    loading="lazy"
                    onClick={() => navigate(`/${path.PRODUCTS}`)}
                    alt=""
                    className="cursor-pointer w-full h-full object-cover col-span-1 row-span-2 "
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
                />
                <img
                    loading="lazy"
                    onClick={() => navigate(`/${path.PRODUCTS}`)}
                    alt=""
                    className="cursor-pointer w-full h-full object-cover col-span-1 row-span-1 "
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
                />
            </div>
        </>
    );
};

export default withBaseComponent(FeaturedProduct);
