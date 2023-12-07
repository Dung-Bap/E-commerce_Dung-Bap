import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSlug } from '../../ultils/helpers';
import LoadingSkeleton from '../../components/loading/LoadingSkeleton';

const Sidebar = () => {
    const { categories, isLoading } = useSelector(state => state.app);
    return (
        <div className="hidden sm:flex flex-col border mb-[30px]">
            {isLoading &&
                new Array(8)
                    .fill()
                    .map((item, index) => (
                        <LoadingSkeleton key={index} className="w-full h-[35px] mb-[14px]"></LoadingSkeleton>
                    ))}
            {categories.map(category => {
                return (
                    <NavLink
                        key={category._id}
                        to={createSlug(category.title)}
                        className={({ isActive }) =>
                            isActive
                                ? 'text-[14px]  px-5 pt-[15px] pb-[14px] text-main hover:text-main'
                                : 'text-[14px] font-semibold uppercase px-5 pt-[15px] pb-[14px] hover:text-main'
                        }
                    >
                        {category.title}
                    </NavLink>
                );
            })}
        </div>
    );
};

export default Sidebar;
