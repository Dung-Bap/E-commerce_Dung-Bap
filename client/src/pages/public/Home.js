/** @format */

import React from 'react';
import { BestSeller, Sidebar, DailyDeal, FeaturedProduct, CustomSlider } from '../../components';
import { useSelector } from 'react-redux';
import icons from '../../ultils/icons';
import Banner from '../../components/home/Banner';

const Home = () => {
    const { newArrivals } = useSelector(state => state.products);
    const { categories } = useSelector(state => state.app);
    const { MdNavigateNext } = icons;
    return (
        <>
            <div className="w-full flex justify-center">
                <div className="w-main">
                    <div className="w-full mt-[20px] flex">
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
                        <div className="flex flex-wrap mx-[-10px] mt-[20px]">
                            {categories
                                ?.filter(el => el.brand.length > 0)
                                .map((categorie, index) => (
                                    <div className=" flex w-1/3 px-[10px] mb-[20px] " key={index}>
                                        <div className="flex w-full border p-[15px] ">
                                            <img
                                                className="pl-[20px] object-contain w-[144px] h-[129px]"
                                                alt=""
                                                src={categorie.image}
                                            />
                                            <div className="pl-[20px]">
                                                <h3 className="text-[14px] mb-[14px] font-medium uppercase">
                                                    {categorie.title}
                                                </h3>
                                                <ul>
                                                    {categorie.brand?.map((el, index) => (
                                                        <li key={index} className="text-[14px] text-[#808080] mb-[5px]">
                                                            <span className="flex items-center hover:text-main cursor-pointer">
                                                                <MdNavigateNext />
                                                                {el}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="w-full mt-[20px]">
                        <h2 className="w-full font-semibold text-[20px] py-[15px] border-b-2 border-main mb-[20px]">
                            BLOG POSTS
                        </h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
