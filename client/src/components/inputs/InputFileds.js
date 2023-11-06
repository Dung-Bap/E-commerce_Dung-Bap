import React from 'react';

const InputFileds = ({
    placeholder,
    registername,
    errorName,
    type,
    withFull,
    defaultValue,
    label,
    invalidRed,
    multiple,
    readOnly,
}) => {
    return (
        <div className={` ${withFull ? '' : 'mb-[15px]'} flex flex-col `}>
            <label className="text-white">{label}</label>
            <input
                className={`form-input ${
                    withFull ? 'w-full' : 'w-[400px]'
                } px-[6px] text-[14px] py-[4px] placeholder:text-[14px] bg-[#f6f6f6] text-[#1c1d1d] placeholder:border-none`}
                {...registername}
                placeholder={placeholder}
                type={type ? type : 'text'}
                defaultValue={defaultValue}
                multiple={multiple}
                readOnly={readOnly}
            />
            <span
                className={`${withFull ? 'w-full' : 'w-[400px]'} ${withFull ? 'text-[12px]' : 'text-sm'} font-light ${
                    invalidRed ? 'text-main' : 'text-white'
                } `}
            >
                {errorName}
            </span>
        </div>
    );
};

export default InputFileds;
