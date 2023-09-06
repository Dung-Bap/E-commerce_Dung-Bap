import React from 'react';
import { formatMoney } from '../ultils/helpers';
import labelnew from '../assets/new.png';
import labeltrending from '../assets/trending.png';

const Product = ({ data, isLabel }) => {
    return (
        <div className=" px-[10px] w-full">
            <div className="w-full flex flex-col p-[15px] mb-[20px] border h-[384px] ">
                <div className="relative ">
                    <img
                        className="w-[243px] h-[243px] object-cover"
                        alt=""
                        src={
                            data?.thumbnail ||
                            'https://orangeheatingsupplies.co.uk/wp-content/uploads/2023/02/image-coming-soon-placeholder.png'
                        }
                    />
                    <img
                        className="absolute top-0 right-0 w-[70px] h-[25px]"
                        alt=""
                        src={isLabel ? labelnew : labeltrending}
                    />
                </div>
                <span className="text-[16px] font-light my-[10px] line-clamp-1">{data?.title}</span>
                <span className={`text-[16px] font-light mb-[10px]`}>{`${formatMoney(data?.price)}`}</span>
            </div>
        </div>
    );
};

export default Product;
