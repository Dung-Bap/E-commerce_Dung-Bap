import React, { useEffect, useState } from 'react';
import icons from '../../ultils/icons';
import { apiGetProducts } from '../../apis/products';
import { renderStars, formatMoney } from '../../ultils/helpers';
import { Link } from 'react-router-dom';
import CountDown from './CountDown';
import LoadingSkeleton from '../loading/LoadingSkeleton';

const DailyDeal = () => {
    const { AiFillStar, AiOutlineMenu } = icons;
    const [dailyDeal, setDailyDeal] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchDailyDeal = async () => {
        setLoading(true);
        const response = await apiGetProducts({ limit: 1, page: 6, totalRatings: 5 });
        setLoading(false);
        if (response?.success) setDailyDeal(response?.products[0]);
    };

    useEffect(() => {
        fetchDailyDeal();
    }, []);

    return (
        <>
            {loading && (
                <div className="border h-full p-5">
                    <div className="flex justify-center gap-2 items-center mb-[50px]">
                        <LoadingSkeleton className={'flex-1 w-[30px] h-[30px]'} />
                        <LoadingSkeleton className={'flex-1 w-[60px] h-[30px]'} />
                        <span className="flex-1"></span>
                    </div>
                    <div className="flex flex-col items-center mb-[15px]">
                        <LoadingSkeleton className={'w-full lg:w-[280px] h-[280px]'} />
                        <LoadingSkeleton className="flex w-[100px] text-[14px] my-[10px] h-[20px] " />
                        <LoadingSkeleton className="flex w-[100px] text-[14px] my-[10px] h-[20px] " />
                        <LoadingSkeleton className="flex w-[100px] text-[14px] my-[10px] h-[20px] " />
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
            )}
            <div className="border h-full p-5">
                <div className="flex justify-center items-center mb-[50px]">
                    <span className="text-[22px] flex-1 ">
                        <AiFillStar color="red" />
                    </span>
                    <span className="text-[16px] lg:text-[30px] flex-3 font-medium">DAILY DEALS</span>
                    <span className="flex-1"></span>
                </div>
                <div className="flex flex-col items-center mb-[15px]">
                    <Link to={`/${dailyDeal?.category?.toLowerCase()}/${dailyDeal?._id}/${dailyDeal?.title}`}>
                        <img
                            loading="lazy"
                            className="w-full lg:w-[280px] h-[280px] object-cover mb-[30px] cursor-pointer"
                            alt=""
                            src={dailyDeal?.images?.length === 0 ? dailyDeal?.thumbnail : dailyDeal?.images}
                        />
                    </Link>
                    <span className=" flex text-[14px] font-light mb-[15px] h-[18px] ">
                        {renderStars(dailyDeal?.totalRatings)?.map((el, index) => (
                            <span key={index}>{el}</span>
                        ))}
                    </span>
                    <Link to={`/${dailyDeal?.category?.toLowerCase()}/${dailyDeal?._id}/${dailyDeal?.title}`}>
                        <span className="text-[16px] font-light mb-[15px] line-clamp-1 hover:text-main cursor-pointer">
                            {dailyDeal?.title}
                        </span>
                    </Link>
                    <span className={`text-[16px] font-light`}>{`${formatMoney(dailyDeal?.price || 0)}`}</span>
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
        </>
    );
};

export default DailyDeal;
