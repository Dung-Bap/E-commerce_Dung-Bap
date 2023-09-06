import React from 'react';
import { NavLink } from 'react-router-dom';
import { createSlug } from '../ultils/helpers';
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const { categories } = useSelector(state => state.app);
    return (
        <div className="flex flex-col">
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
