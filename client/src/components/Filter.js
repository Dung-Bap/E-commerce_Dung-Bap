import React, { useState } from 'react';
import icons from '../ultils/icons';
import { colors } from '../ultils/contants';

const Filter = ({ name, activeFilter, changeActiveFilter, type = 'checkbox' }) => {
    const { BiChevronDown } = icons;
    const [selected, setSelected] = useState([]);
    const handleChecked = value => {
        const alreadyChecked = selected.find(el => el === value);
        if (alreadyChecked) setSelected(prev => prev.filter(el => el !== value));
        else setSelected(prev => [...prev, value]);
    };
    return (
        <div>
            <div
                onClick={() => changeActiveFilter(name)}
                className="relative flex items-center justify-between min-w-[100px] p-3 border mr-[10px] cursor-pointer"
            >
                <span className="text-[12px] font-light capitalize">{name}</span>
                <BiChevronDown />
            </div>
            {activeFilter === name && (
                <div className="absolute z-10 top-[100%] bg-white border  min-w-[250px]">
                    {type === 'checkbox' && (
                        <>
                            <div className="text-[14px] border-b font-light flex items-center justify-between py-[15px] px-[20px] leading-8">
                                <span>{selected.length} selected</span>
                                <span onClick={() => setSelected([])} className="underline cursor-pointer">
                                    Reset
                                </span>
                            </div>
                            <div className="py-[5px] px-[20px] ">
                                {colors.map((el, index) => (
                                    <div key={index} className="flex items-center gap-6">
                                        <input
                                            type="checkbox"
                                            name={el}
                                            value={el}
                                            id={el}
                                            onChange={e => handleChecked(e.target.value)}
                                            checked={selected.some(select => select === el)}
                                        />
                                        <label className="capitalize text-[16px] font-light " htmlFor={el}>
                                            {el}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Filter;
