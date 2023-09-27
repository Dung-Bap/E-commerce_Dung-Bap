import React from 'react';

const SelectFileds = ({
    registername,
    onChange,
    errorName,
    withFull,
    defaultValue,
    options = [],
    label,
    invalidRed,
}) => {
    return (
        <div className={`flex flex-col`}>
            <label className="text-white">{label}</label>
            <select
                className="form-select text-[#1c1d1d]"
                {...registername}
                defaultValue={defaultValue}
                onChange={onChange} // Using setValue
            >
                <option value="">--Choose--</option>
                {options?.map(option => (
                    <option key={option.code} value={option.code}>
                        {option.value}
                    </option>
                ))}
            </select>
            <span
                className={`${withFull ? 'w-full' : 'w-[400px]'} ${withFull ? 'text-[12px]' : 'text-sm'} font-light  ${
                    invalidRed ? 'text-main' : 'text-white'
                }`}
            >
                {errorName}
            </span>
        </div>
    );
};

export default SelectFileds;
