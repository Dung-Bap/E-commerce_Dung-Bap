import React from 'react';
import { productEXtrainfo } from '../../ultils/contants';

const ProductExtrainfo = () => {
    return (
        <>
            {productEXtrainfo.map((el, index) => (
                <div className="flex gap-2 lg:gap-8 border items-center mb-[10px] px-[10px] py-[10px]" key={index}>
                    <span className="px-[6px] py-[6px] rounded-[50%] bg-slate-300">{el.icon}</span>
                    <div className="flex flex-col">
                        <span className="text-[14px]">{el.name}</span>
                        <span className="text-[12px] font-light text-[#333]">{el.des}</span>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ProductExtrainfo;
