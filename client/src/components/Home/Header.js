import React from 'react';
import icons from '../../ultils/icons';
import { Link } from 'react-router-dom';
import path from '../../ultils/path';
import { useSelector } from 'react-redux';

const Header = () => {
    const { MdPhone, GrMail, FaOpencart } = icons;
    const { userData } = useSelector(state => state.user);
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
                <div className={`px-5  ${userData ? 'border-r-2' : ''} flex flex-col `}>
                    <span className="text-[13px] font-medium flex items-center">
                        <span className="mr-2 text-main">
                            <GrMail />
                        </span>
                        SUPPORT@TADATHEMES.COM
                    </span>
                    <span className="text-[12px] font-light">Online Support 24/7</span>
                </div>
                {userData && (
                    <>
                        <div className="px-5 border-r-2 leading-[37.5px]">
                            <span className="text-[13px] font-medium flex items-center">
                                <span className="text-[20px] mr-2 text-main">
                                    <FaOpencart />
                                </span>
                                0 item
                            </span>
                        </div>
                        <Link
                            to={
                                +userData?.role === 1998
                                    ? `/${path.ADMIN}/${path.DASHBOARD}`
                                    : `/${path.MEMBER}/${path.PERSONAL}`
                            }
                            className="px-5 flex items-center cursor-pointer"
                        >
                            <img
                                className="w-[20px] h-[20px] rounded-full object-cover mr-[5px]"
                                alt=""
                                src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
                            />
                            <span className="text-[13px] font-medium">Profile</span>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
