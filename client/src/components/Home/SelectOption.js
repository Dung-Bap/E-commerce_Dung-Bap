import React from 'react';

const SelectOption = ({ icon, border }) => {
    return (
        <div
            className={`flex items-center justify-center cursor-pointer w-[40px] h-[40px] rounded-[50%] bg-white hover:bg-zinc-100 border ${
                border ? 'border-main' : ''
            }`}
        >
            {icon}
        </div>
    );
};

export default SelectOption;
