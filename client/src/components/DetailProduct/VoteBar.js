import React, { useEffect, useRef } from 'react';
import { AiFillStar } from 'react-icons/ai';

const VoteBar = ({ number, totalRatings, userRating }) => {
    const progressBarRef = useRef();
    const percent = Math.round((userRating * 100) / totalRatings) || 0;
    useEffect(() => {
        progressBarRef.current.style.cssText = `right: ${100 - percent}%`;
    }, [percent, totalRatings, userRating]);

    return (
        <div className="flex">
            <div className="w-[10%] sm:w-[10%] flex items-center gap-1">
                <span className="w-[10px] flex justify-center">{number}</span>
                <AiFillStar color="orange" />
            </div>
            <div className="w-[60%] sm:w-[70%] flex items-center ">
                <div className="w-full relative  h-2 bg-[#ededed] rounded-r-full rounded-l-full">
                    <div
                        ref={progressBarRef}
                        className={`absolute inset-0 bg-main rounded-r-full rounded-l-full`}
                    ></div>
                </div>
            </div>
            <div className="w-[30%] sm:w-[20%] flex justify-center">{`${userRating || 0} review`}</div>
        </div>
    );
};

export default VoteBar;
