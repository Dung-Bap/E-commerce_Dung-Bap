/** @format */

import React from 'react';
import { Outlet } from 'react-router-dom';
// Outlet sẽ chuyển tới trang con của public trùng với đường dẫn trên url
import { Footer, Header, Navigation } from '../../components';
import TopHeader from './TopHeader';

const Public = () => {
    return (
        <div className="max-h-screen overflow-y-auto flex flex-col items-center">
            <TopHeader />
            <Header />
            <Navigation />

            <div className="w-full">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Public;
