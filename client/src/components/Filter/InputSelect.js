import React, { memo } from 'react';

const InputSelect = ({ value, changeValue, options }) => {
    return (
        <select
            className="p-3 w-full border cursor-pointer text-[12px] font-light"
            value={value}
            onChange={e => changeValue(e.target.value)}
        >
            <option value="">Featured</option>
            {options?.map(el => (
                <option key={el.id} value={el.value}>
                    {el.option}
                </option>
            ))}
        </select>
    );
};

export default memo(InputSelect);
