/** @format */

import React from 'react';
import { Outlet } from 'react-router-dom';
// Outlet sẽ chuyển tới trang con của public trùng với đường dẫn trên url
import { Footer, Header, Navigation, TopHeader } from '../../components';

const Public = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <TopHeader />
            <Header />
            <Navigation />

            <div className="w-main">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Public;
