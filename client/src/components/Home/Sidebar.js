import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { createSlug } from '../../ultils/helpers';

const Sidebar = () => {
    const { categories } = useSelector(state => state.app);
    return (
        <div className="flex flex-col border mb-[30px]">
            {categories.map(category => (
                <NavLink
                    key={category._id}
                    to={createSlug(category.title)}
                    className={({ isActive }) =>
                        isActive
                            ? 'text-[14px] px-5 pt-[15px] pb-[14px] text-main hover:text-main'
                            : 'text-[14px] px-5 pt-[15px] pb-[14px] hover:text-main'
                    }
                >
                    {category.title}
                </NavLink>
            ))}
        </div>
    );
};

export default Sidebar;
