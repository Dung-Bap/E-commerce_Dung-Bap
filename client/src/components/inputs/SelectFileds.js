import React from 'react';

const SelectFileds = ({ registername, onChange, errorName, withFull, defaultValue, options = [] }) => {
    return (
        <div className={`flex flex-col`}>
            <select
                className="form-select text-[#1c1d1d]"
                {...registername}
                defaultValue={defaultValue}
                onChange={onChange} // Using setValue
            >
                {/* <option value="">Choose</option> */}
                {options.map(option => (
                    <option key={option.code} value={option.code}>
                        {option.value}
                    </option>
                ))}
            </select>
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

export default SelectFileds;
