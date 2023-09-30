import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import path from 'ultils/path';
import SidebarMember from './SidebarMember';

const MemberLayout = () => {
    const { isLoggedIn, userData } = useSelector(state => state.user);
    if (!isLoggedIn || !userData) return <Navigate to={`${path.LOGIN}`} replace={true} />;

    return (
        <div className="relative bg-gray-800 min-h-screen">
            <SidebarMember />
            <div className="pl-[300px]">
                <Outlet />
            </div>
        </div>
    );
};

export default MemberLayout;
