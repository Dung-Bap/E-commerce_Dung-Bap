import clsx from 'clsx';
import React, { useState } from 'react';
import icons from '../../ultils/icons';

const SelectQuantity = ({ quantity, handleQuantity, handleChangeQuantity }) => {
    const { AiOutlinePlus, AiOutlineMinus } = icons;
    const [color, setColor] = useState();
    const handleSetColor = flag => {
        if (flag === 'minus') {
            setColor(true);
        }
        if (flag === 'plus') {
            setColor(false);
        }
    };
    return (
        <div onClick={e => e.stopPropagation()} className="flex items-center">
            <span
                onClick={() => {
                    handleChangeQuantity('minus');
                    handleSetColor('minus');
                }}
                className={clsx(
                    'w-[40px] flex items-center justify-center border rounded-l-md h-[32px] cursor-pointer',
                    color ? 'text-main border-main' : '',
                )}
            >
                <AiOutlineMinus />
            </span>
            <input
                value={quantity}
                onChange={e => handleQuantity(e.target.value)}
                className="w-[40px] h-[32px] border text-center"
            />
            <span
                onClick={() => {
                    handleChangeQuantity('plus');
                    handleSetColor('plus');
                }}
                className={clsx(
                    'w-[40px] flex items-center justify-center border rounded-r-md h-[32px] cursor-pointer ',
                    !color ? 'text-main border-main' : '',
                )}
            >
                <AiOutlinePlus />
            </span>
        </div>
    );
};

export default SelectQuantity;
