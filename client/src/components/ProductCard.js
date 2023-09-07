import React from 'react';
import { renderStars, formatMoney } from '../ultils/helpers';

const ProductCard = ({ data }) => {
    return (
        <div className="flex w-1/3 px-[10px] mb-[20px] cursor-pointer">
            <div className="flex border w-full p-[15px] ">
                <img className="w-[84px] h-[84px] object-cover mr-5" alt="" src={data.thumbnail} />
                <div>
                    <span className=" flex text-[14px] font-light mb-[10px] h-[14px] ">
                        {renderStars(data?.totalRatings, 14)}
                    </span>
                    <span className="text-[14px] font-light mb-[6px] line-clamp-1 hover:text-main">{data?.title}</span>
                    <span className={`text-[12px] font-light`}>{`${formatMoney(data?.price)}`}</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
