/** @format */

import React from 'react';
import { Banner, BestSeller, Sidebar, DailyDeal, FeaturedProduct, CustomSlider } from '../../components';
import { useSelector } from 'react-redux';

const Home = () => {
    const { newArrivals } = useSelector(state => state.products);

    return (
        <>
            <div className="w-main mt-[20px] flex">
                <div className="flex flex-col w-[25%] ">
                    <Sidebar />
                    <DailyDeal />
                </div>
                <div className="flex flex-col pl-5 w-[75%] ">
                    <Banner />
                    <BestSeller />
                </div>
            </div>
            <FeaturedProduct />
            <div className="w-full mt-[20px]">
                <h2 className="w-full font-semibold text-[20px] py-[15px] border-b-2 border-main mb-[20px]">
                    NEW ARRIVALS
                </h2>
                <CustomSlider products={newArrivals} />
            </div>
            <div className="w-full mt-[20px]">
                <h2 className="w-full font-semibold text-[20px] py-[15px] border-b-2 border-main mb-[20px]">
                    HOT COLLECTIONS
                </h2>
                <div className="flex flex-wrap mx-[-10px] mt-[20px]"></div>
            </div>
        </>
    );
};

export default Home;
