import React, { useState } from 'react';
import { formatMoney, renderStars } from '../ultils/helpers';
import labelnew from '../assets/new.png';
import labeltrending from '../assets/trending.png';
import { SelectOption } from './';
import icons from '../ultils/icons';
import { Link } from 'react-router-dom';

const { AiOutlineHeart, AiOutlineMenu, AiFillEye } = icons;

const Product = ({ data, isLabel, nomal }) => {
    const [isSelectOption, setIsSelectOption] = useState(false);

    return (
        <div className="pr-5">
            <Link
                to={`/${data?.category?.toLowerCase()}/${data._id}/${data.title}`}
                className="flex flex-col p-[15px] mb-[20px] border h-[366px] cursor-pointer "
            >
                <div
                    className="w-full relative "
                    onMouseEnter={() => setIsSelectOption(true)}
                    onMouseLeave={() => setIsSelectOption(false)}
                >
                    {isSelectOption && (
                        <div className=" animate-slide-top w-full absolute bottom-0 flex justify-center gap-2">
                            <SelectOption icon={<AiOutlineHeart />} />
                            <SelectOption icon={<AiOutlineMenu />} />
                            <SelectOption icon={<AiFillEye />} />
                        </div>
                    )}
                    <img
                        className="w-[243px] h-[243px] object-cover"
                        alt=""
                        src={
                            data?.thumbnail ||
                            'https://orangeheatingsupplies.co.uk/wp-content/uploads/2023/02/image-coming-soon-placeholder.png'
                        }
                    />
                    {!nomal && (
                        <img
                            className="absolute top-0 right-0 w-[70px] h-[25px]"
                            alt=""
                            src={isLabel ? labelnew : labeltrending}
                        />
                    )}
                </div>
                <span className=" flex text-[14px] font-light my-[10px] h-[14px] ">
                    {renderStars(data.totalRatings, 14)?.map((el, index) => (
                        <span key={index}>{el}</span>
                    ))}
                </span>
                <span className="text-[16px] font-light mb-[10px] line-clamp-1 hover:text-main">{data?.title}</span>
                <span className={`text-[16px] font-light`}>{`${formatMoney(data?.price)}`}</span>
            </Link>
        </div>
    );
};

export default Product;
