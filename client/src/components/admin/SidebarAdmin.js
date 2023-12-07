import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { SIDEBARADMIN } from '../../ultils/contants';
import path from '../../ultils/path';
import icons from '../../ultils/icons';

const SidebarAdmin = () => {
    const { AiFillCaretRight, AiFillCaretDown } = icons;
    const [actived, setActived] = useState(false);
    const handleClick = isChildren => {
        if (isChildren) setActived(!actived);
    };
    const classNoneActive = 'flex items-center font-light text-white px-[20px] py-[10px] mr-[10px]';
    const classActive = 'flex items-center font-light text-white px-[20px] py-[10px] bg-main';

    const renderSidebar = () => {
        return SIDEBARADMIN?.map(item => {
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
            <div className="flex flex-col justify-center items-center p-4">
                <Link to={`/${path.HOME}`}>
                    <img
                        loading="lazy"
                        alt=""
                        src="https://digital-world-2.myshopify.com/cdn/shop/files/logo_digital_new_250x.png?v=1613166683"
                    />
                </Link>
                <span className="mt-[5px]">Admin Workspace</span>
            </div>
            {renderSidebar()}
        </div>
    );
};

export default SidebarAdmin;
