/** @format */

import React, { useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../../components';
import TopHeader from './TopHeader';
import { Header, Navigation } from '../../components/home';
import icons from '../../ultils/icons';

const Public = () => {
    const { AiOutlineArrowUp } = icons;
    const pageRef = useRef();
    const [fix, setFix] = useState(false);
    const onScroll = event => {
        event.currentTarget.scrollTop >= 71 ? setFix(true) : setFix(false);
    };

    return (
        <div onScroll={onScroll} className="max-h-screen overflow-y-auto relative flex flex-col items-center">
            <div ref={pageRef} className="w-full">
                <TopHeader />
            </div>
            <Header />
            <Navigation />
            <div className="w-full">
                <Outlet />
            </div>
            <Footer />
            {fix && (
                <div
                    onClick={() => pageRef.current.scrollIntoView({ behavior: 'smooth' })}
                    className="fixed flex justify-center items-center rounded-full bottom-[50px] right-[30px] bg-[pink] w-[60px] h-[60px] cursor-pointer z-50"
                >
                    <span>
                        <AiOutlineArrowUp size={30} color="white" />
                    </span>
                </div>
            )}
        </div>
    );
};

export default Public;
