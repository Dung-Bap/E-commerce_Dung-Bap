import React from 'react';
import icons from '../ultils/icons';
import { Link } from 'react-router-dom';
import path from '../ultils/path';

const Header = () => {
    const { MdPhone, GrMail, AiOutlineHeart, FaOpencart } = icons;

    return (
        <div className="flex justify-between border-b w-main h-[110px] py-[35px]">
            <Link to={`${path.HOME}`}>
                <img
                    alt=""
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/logo_digital_new_250x.png?v=1613166683"
                />
            </Link>
            <div className="flex items-center text-center">
                <div className="px-5 border-r-2 flex flex-col ">
                    <span className="text-[13px] flex items-center font-medium">
                        <span className="mr-2 text-main">
                            <MdPhone />
                        </span>
                        (+1800) 000 8808
                    </span>
                    <span className="text-[12px]  font-light">Mon-Sat 9:00AM - 8:00PM</span>
                </div>
                <div className="px-5 border-r-2 flex flex-col ">
                    <span className="text-[13px] font-medium flex items-center">
                        <span className="mr-2 text-main">
                            <GrMail />
                        </span>
                        SUPPORT@TADATHEMES.COM
                    </span>
                    <span className="text-[12px] font-light">Online Support 24/7</span>
                </div>
                <div className="px-5 border-r-2 flex items-center h-full">
                    <span className="text-[20px] text-main ">
                        <AiOutlineHeart />
                    </span>
                </div>
                <div className="px-5">
                    <span className="text-[13px] font-medium flex items-center">
                        <span className="text-[20px] mr-2 text-main">
                            <FaOpencart />
                        </span>
                        0 item
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Header;
