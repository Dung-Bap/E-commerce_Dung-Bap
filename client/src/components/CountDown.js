import React from 'react';

const CountDown = ({ unit, number }) => {
    return (
        <div className="flex w-[32.5%] flex-col items-center justify-center p-[4px] bg-[#f4f4f4] mb-[15px]">
            <span className="text-[20px]">{0}</span>
            <span className="text-[14px] font-light">{unit}</span>
        </div>
    );
};

export default CountDown;
