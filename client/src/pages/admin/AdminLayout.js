import { SidebarAdmin } from 'components';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import path from 'ultils/path';

const AdminLayout = () => {
    const { isLoggedIn, userData } = useSelector(state => state.user);
    if (!isLoggedIn || !userData || !+userData?.role === 1998) return <Navigate to={`${path.LOGIN}`} replace={true} />;
    return (
        <div className="relative">
            <SidebarAdmin />
            <div className="pl-[300px] bg-gray-800 h-screen">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
