import React, { useEffect, useState } from 'react';
import icons from '../ultils/icons';
import { apiGetProducts } from '../apis/getProducts';
import { renderStars, formatMoney } from '../ultils/helpers';
import { CountDown } from './';

const DailyDeal = () => {
    const { AiFillStar, AiOutlineMenu } = icons;
    const [dailyDeal, setDailyDeal] = useState([]);

    const fetchDailyDeal = async () => {
        const response = await apiGetProducts({ limit: 1, page: 2, totalRatings: 5 });
        if (response.success) setDailyDeal(response.products[0]);
    };

    useEffect(() => {
        fetchDailyDeal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="border h-full p-5">
            <div className="flex justify-center items-center mb-[50px]">
                <span className="text-[22px] flex-1 ">
                    <AiFillStar color="red" />
                </span>
                <span className="text-[30px] flex-3 font-medium">DAILY DEALS</span>
                <span className="flex-1"></span>
            </div>
            <div className="flex flex-col items-center mb-[15px]">
                <img
                    className="w-[280px] h-[280px] object-cover mb-[30px] cursor-pointer"
                    alt=""
                    src={dailyDeal?.images?.length === 0 ? dailyDeal?.thumbnail : dailyDeal?.images}
                />
                <span className=" flex text-[14px] font-light mb-[15px] h-[18px] ">
                    {renderStars(dailyDeal.totalRatings)}
                </span>
                <span className="text-[16px] font-light mb-[15px] line-clamp-1 hover:text-main cursor-pointer">
                    {dailyDeal.title}
                </span>
                <span className={`text-[16px] font-light`}>{`${formatMoney(dailyDeal.price)}`}</span>
            </div>
            <div className="flex w-full items-center justify-between">
                <CountDown unit={'Hours'} />
                <CountDown unit={'Minutes'} />
                <CountDown unit={'Seconds'} />
            </div>
            <button className="w-full flex justify-center items-center p-2 bg-main text-white hover:bg-[#333]">
                <span className="mr-3">
                    <AiOutlineMenu />
                </span>
                OPTIONS
            </button>
        </div>
    );
};

export default DailyDeal;
