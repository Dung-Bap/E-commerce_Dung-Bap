import React, { useState } from 'react';
import { navigation } from '../../ultils/contants';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    const [valueInput, setValueInput] = useState('');
    return (
        <div className="w-main flex justify-between border-b h-[48px] py-2 items-center">
            <div className="text-[14px]">
                {navigation.map(nav => (
                    <NavLink
                        key={nav.id}
                        to={nav.path}
                        className={({ isActive }) =>
                            isActive ? 'pr-[30px] hover:text-main text-main' : 'pr-[30px] hover:text-main'
                        }
                    >
                        {nav.value}
                    </NavLink>
                ))}
            </div>
            <div className="flex justify-end">
                <input
                    className="form-input min-w-[500px] placeholder:italic placeholder:text-sm"
                    placeholder="Search everything..."
                    value={valueInput}
                    onChange={e => setValueInput(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Navigation;
