import React from 'react';
import icons from '../ultils/icons';

const Footer = () => {
    const { GrMail } = icons;
    return (
        <>
            <div className="w-full flex justify-center bg-main py-[26px] ">
                <div className="w-main">
                    <div className="flex w-main justify-between">
                        <div className="flex w-[50%] flex-col text-white">
                            <span className="text-[20px] font-light">SIGN UP TO NEWSLETTER</span>
                            <span className="text-[13px] font-extralight opacity-[.6]">
                                ubscribe now and receive weekly newsletter
                            </span>
                        </div>
                        <div className="w-[50%] flex items-center">
                            <input
                                className="w-full text-[14px] placeholder:text-white placeholder:opacity-[.6] focus:outline-none text-white font-extralight h-[50px] px-[20px] border-none rounded-l-[30px] bg-[#ffffff1a]"
                                placeholder="Email Adress"
                            />
                            <GrMail
                                className="h-[50px] bg-[#ffffff1a] rounded-r-[30px] px-[20px] cursor-pointer"
                                color="white"
                                size={58}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full "></div>
        </>
    );
};

export default Footer;
