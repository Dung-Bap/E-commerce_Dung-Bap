/** @format */

import React from 'react';
import { Banner, BestSeller, Sidebar, DailyDeal } from '../../components';

const Home = () => {
    return (
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
    );
};

export default Home;
