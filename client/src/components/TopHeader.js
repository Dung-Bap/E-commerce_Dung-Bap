import React from 'react';
import { Link } from 'react-router-dom';
import path from '../ultils/path';

const TopHeader = () => {
    return (
        <div className="w-full flex justify-center bg-main p-2 text-[12px] text-white">
            <div className="w-main">
                <div className="flex w-main justify-between">
                    <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
                    <Link to={path.LOGIN}>
                        <span className="cursor-pointer hover:text-black">Sign In or Create Account</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TopHeader;
