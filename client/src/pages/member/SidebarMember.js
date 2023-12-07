import React, { memo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { SIDEBARMEMBER } from '../../ultils/contants';
import icons from '../../ultils/icons';
import path from '../../ultils/path';

const SidebarMember = () => {
    const { AiFillHome } = icons;
    const { userData } = useSelector(state => state.user);
    const { AiFillCaretRight, AiFillCaretDown } = icons;
    const [actived, setActived] = useState(false);
    const handleClick = isChildren => {
        if (isChildren) setActived(!actived);
    };
    const classNoneActive = 'flex items-center font-light text-white px-[20px] py-[10px] mr-[10px]';
    const classActive = 'flex items-center font-light text-white px-[20px] py-[10px] bg-main';

    const renderSidebar = () => {
        return SIDEBARMEMBER?.map(item => {
            const isChildren = !!item.children;
            return isChildren ? (
                <div key={item.id}>
                    <NavLink className={classNoneActive} onClick={() => handleClick(isChildren)} to={item.path}>
                        <span className="mr-[10px]">{item.icon}</span>
                        <div className="flex w-full items-center justify-between">
                            <span className="text-[16px]">{item.name}</span>
                            <span className="mr-[10px]">{actived ? <AiFillCaretDown /> : <AiFillCaretRight />}</span>
                        </div>
                    </NavLink>
                    {actived &&
                        item?.children?.map(el => (
                            <NavLink
                                className={({ isActive }) => (isActive ? classActive : classNoneActive)}
                                onClick={e => e.stopPropagation()}
                                to={el.path}
                                key={el.id}
                            >
                                <span className="mr-[10px]">{el.icon}</span>
                                <span className="text-[16px]">{el.name}</span>
                            </NavLink>
                        ))}
                </div>
            ) : (
                <NavLink
                    className={({ isActive }) => (isActive ? classActive : classNoneActive)}
                    onClick={() => handleClick(isChildren)}
                    to={item.path}
                    key={item.id}
                >
                    <span className="mr-[10px]">{item.icon}</span>
                    <span className="text-[16px]">{item.name}</span>
                </NavLink>
            );
        });
    };
    return (
        <div className="hidden lg:fixed bg-gray-600 top-0 left-0 bottom-0 w-[300px] lg:block">
            <div className="flex flex-col justify-center items-center p-4 relative">
                <img
                    loading="lazy"
                    className="w-[60px] h-[60px] object-cover rounded-full"
                    alt=""
                    src={
                        userData.avatar ||
                        'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'
                    }
                />
                <span className="mt-[5px] text-white">Detail Profile</span>
                <div className="absolute right-[10px] top-[10px]">
                    <Link to={`/${path.HOME}`}>
                        <AiFillHome size={20} color="white" />
                    </Link>
                </div>
            </div>
            {renderSidebar()}
        </div>
    );
};

export default memo(SidebarMember);
