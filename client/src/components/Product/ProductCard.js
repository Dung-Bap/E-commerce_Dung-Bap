import React from 'react';
import { renderStars, formatMoney } from '../../ultils/helpers';
import { Link } from 'react-router-dom';

const ProductCard = ({ data }) => {
    return (
        <Link
            to={`/${data?.category?.toLowerCase()}/${data?._id}/${data?.title}`}
            className="flex sm:w-1/3 sm:px-[10px] mb-[20px] cursor-pointer"
        >
            <div className="flex border w-full p-[15px] ">
                <img loading="lazy" className="w-[84px] h-[84px] object-contain mr-5" alt="" src={data?.thumbnail} />
                <div>
                    <span className=" flex text-[14px] font-light mb-[10px] h-[14px] ">
                        {renderStars(data?.totalRatings, 14)?.map((el, index) => (
                            <span key={index}>{el}</span>
                        ))}
                    </span>
                    <span className="text-[14px] font-light mb-[6px] line-clamp-1 hover:text-main">{data?.title}</span>
                    <span className={`text-[12px] font-light`}>{`${formatMoney(data?.price)}`}</span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
