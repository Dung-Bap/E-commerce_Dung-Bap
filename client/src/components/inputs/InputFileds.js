import React from 'react';

const InputFileds = ({ placeholder, registername, errorName, type, withFull, defaultValue }) => {
    return (
        <div className={` ${withFull ? '' : 'mb-[15px]'} flex flex-col`}>
            <input
                className={`form-input ${
                    withFull ? 'w-full' : 'w-[400px]'
                } px-[10px] py-[8px] placeholder:text-[14px] bg-[#f6f6f6] text-[#1c1d1d] placeholder:border-none`}
                {...registername}
                placeholder={placeholder}
                type={type ? type : 'text'}
                defaultValue={defaultValue}
            />
            <span
                className={`${withFull ? 'w-full' : 'w-[400px]'} ${
                    withFull ? 'text-[10px]' : 'text-sm'
                } font-light  text-white`}
            >
                {errorName}
            </span>
        </div>
    );
};

export default InputFileds;
