import React from 'react';
import { navigation } from '../ultils/contants';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
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
            <div>phai</div>
        </div>
    );
};

export default Navigation;
