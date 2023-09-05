/** @format */

import React from 'react';
import { Banner, Sidebar } from '../../components';

const Home = () => {
    return (
        <div className="w-main mt-[20px] flex">
            <div className="flex flex-col gap-5 w-[25%] border">
                <Sidebar />
                <div className="border">Daily Deal</div>
            </div>
            <div className="flex flex-col gap-5 pl-5 w-[75%] ">
                <Banner />
                <div className="border">Best seller</div>
            </div>
        </div>
    );
};

export default Home;
