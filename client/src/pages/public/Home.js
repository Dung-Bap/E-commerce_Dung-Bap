/** @format */

import React from 'react';
import { DailyDeal, BestSeller, FeaturedProduct } from '../../components/home';
import Sidebar from '../../components/home/Sidebar';
import { useSelector } from 'react-redux';
import icons from '../../ultils/icons';
import Banner from '../../components/home/Banner';
import { CustomSlider } from '../../components';
import withBaseComponent from '../../hocs/withBaseComponent';
import { createSearchParams } from 'react-router-dom';
import LoadingSkeleton from '../../components/loading/LoadingSkeleton';

const Home = ({ navigate }) => {
    const { newArrivals } = useSelector(state => state.products);
    const { categories, isLoading } = useSelector(state => state.app);
    const { MdNavigateNext } = icons;
    return (
        <>
            <div className="w-full flex justify-center">
                <div className="w-full px-[10px] sm:px-[20px] lg:w-main lg:p-0">
                    <div className="w-full sm:mt-[20px] sm:flex">
                        <div className="flex flex-col w-full sm:w-[25%] ">
                            <Sidebar />
                            <DailyDeal />
                        </div>
                        <div className="flex flex-col sm:pl-5 sm:w-[75%] ">
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
                            {!isLoading &&
                                categories
                                    ?.filter(el => el.brand.length > 0)
                                    .map((categorie, index) => (
                                        <div className=" flex w-1/2 sm:w-1/3 px-[10px] mb-[20px] " key={index}>
                                            <div className="sm:flex w-full border p-[15px] ">
                                                <img
                                                    loading="lazy"
                                                    className="lg:pl-[20px] object-contain md:w-[100px] lg:w-[144px] h-[129px]"
                                                    alt=""
                                                    src={categorie.image}
                                                />
                                                <div className="lg:pl-[20px]">
                                                    <h3 className="text-[14px] mb-[14px] font-medium uppercase">
                                                        {categorie.title}
                                                    </h3>
                                                    <ul>
                                                        {categorie.brand?.map((item, index) => (
                                                            <li
                                                                key={index}
                                                                className="text-[14px] text-[#808080] mb-[5px]"
                                                            >
                                                                <span
                                                                    onClick={() => {
                                                                        navigate({
                                                                            pathname: `/${categorie.title}`,
                                                                            search: createSearchParams({
                                                                                brand: item,
                                                                            }).toString(),
                                                                        });
                                                                    }}
                                                                    className="flex items-center hover:text-main cursor-pointer"
                                                                >
                                                                    <MdNavigateNext />
                                                                    {item}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            {isLoading &&
                                new Array(6).fill().map((item, index) => (
                                    <div key={index} className="flex w-1/2 sm:w-1/3 px-[10px] mb-[20px] ">
                                        <div className="sm:flex w-full border p-[15px] ">
                                            <LoadingSkeleton className="lg:ml-[20px] md:w-[100px] lg:w-[144px] h-[129px] md:mr-[10px]" />
                                            <div className="lg:pl-[20px] mt-[10px] md:mt-0">
                                                <LoadingSkeleton className={'w-[100px] h-[20px]'} />
                                                <ul>
                                                    {new Array(4).fill().map((item, index) => (
                                                        <LoadingSkeleton
                                                            key={index}
                                                            className={'w-[100px] h-[20px] mt-[10px]'}
                                                        />
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* <div className="w-full mt-[20px]">
                        <h2 className="w-full font-semibold text-[20px] py-[15px] border-b-2 border-main mb-[20px]">
                            BLOG POSTS
                        </h2>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default withBaseComponent(Home);
