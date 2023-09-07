import React, { useEffect, useState } from 'react';
import { apiGetProducts } from '../apis/getProducts';
import { Product } from './';
import Slider from 'react-slick';

const BestSeller = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    const tabs = [
        {
            id: 1,
            name: 'Best Seller',
            border: 'border-r',
        },
        {
            id: 2,
            name: 'New Arrivals',
        },
    ];

    const [bestSellers, setBestSellers] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);
    const [products, setProducts] = useState([]);
    const [activedTab, setActivedTab] = useState(1);

    const getAllProducts = async () => {
        const response = await Promise.all([
            apiGetProducts({ sort: '-sold', limit: 10 }),
            apiGetProducts({ sort: '-createdAt', limit: 10 }),
        ]);
        if (response[0]?.success) setBestSellers(response[0].products);
        if (response[1]?.success) setNewArrivals(response[1].products);
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    useEffect(() => {
        if (activedTab === 1) setProducts(bestSellers);
        if (activedTab === 2) setProducts(newArrivals);
    }, [activedTab, bestSellers, newArrivals]);
    return (
        <div>
            <div className="flex text-center text-[20px] text-[#808080] font-medium uppercase border-b-2 border-main pb-[15px] mb-5 mt-[30px]">
                {tabs.map(tab => (
                    <span
                        key={tab.id}
                        onClick={() => setActivedTab(tab.id)}
                        className={` ${tab.border} mr-5 pr-5 cursor-pointer ${
                            activedTab === tab.id ? 'text-black' : ''
                        } `}
                    >
                        {tab.name}
                    </span>
                ))}
            </div>
            <div>
                <Slider {...settings} className="mr-[-20px]">
                    {products?.map(bestSeller => (
                        <Product key={bestSeller._id} data={bestSeller} isLabel={activedTab === 1 ? true : false} />
                    ))}
                </Slider>
            </div>
            <div className="w-full flex gap-5 ">
                <img
                    className="flex-1 cursor-pointer"
                    alt=""
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
                />
                <img
                    className="flex-1 cursor-pointer"
                    alt=""
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
                />
            </div>
        </div>
    );
};

export default BestSeller;
