import React, { useEffect, useState } from 'react';
import ProductCard from '../product/ProductCard';
import { apiGetProducts } from '../../apis/getProducts';

const FeaturedProduct = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    const fetchFeaturedProduct = async () => {
        const response = await apiGetProducts({ limit: 9, totalRatings: 5 });
        if (response?.success) setFeaturedProducts(response?.products);
    };

    useEffect(() => {
        fetchFeaturedProduct();
    }, []);

    return (
        <>
            <div className="w-full mt-[20px]">
                <h2 className="w-full font-semibold text-[20px] py-[15px] border-b-2 border-main">FEATURED PRODUCTS</h2>
                <div className="flex flex-wrap mx-[-10px] mt-[20px]">
                    {featuredProducts?.map(featuredProduct => (
                        <ProductCard key={featuredProduct._id} data={featuredProduct} />
                    ))}
                </div>
            </div>
            <div className="flex justify-between cursor-pointer">
                <img
                    className="w-[49%] object-cover"
                    alt=""
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
                />

                <div className="flex flex-col justify-between gap-4 w-[24%]">
                    <img
                        alt=""
                        src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
                    />
                    <img
                        alt=""
                        src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
                    />
                </div>

                <img
                    className="w-[24%] object-cover"
                    alt=""
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
                />
            </div>
        </>
    );
};

export default FeaturedProduct;
