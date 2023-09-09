import React from 'react';

const InputFileds = ({ placeholder, registername, errorName, type }) => {
    return (
        <div className="mb-[15px]">
            <input
                className="w-[400px] px-[10px] py-[8px] placeholder:text-[14px] bg-[#f6f6f6] text-[#1c1d1d] placeholder:border-none"
                {...registername}
                placeholder={placeholder}
                type={type ? type : 'text'}
            />
            <p className="w-[400px] text-sm text-white">{errorName}</p>
        </div>
    );
};

export default InputFileds;
