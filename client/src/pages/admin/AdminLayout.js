import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { SidebarAdmin } from '../../components';
import path from '../../ultils/path';

const AdminLayout = () => {
    const { isLoggedIn, userData } = useSelector(state => state.user);
    if (!isLoggedIn || !userData || !+userData?.role === 1998) return <Navigate to={`${path.LOGIN}`} replace={true} />;
    return (
        <div className="relative max-h-screen overflow-y-auto bg-gray-800 min-h-screen">
            <SidebarAdmin />
            <div className="lg:pl-[300px]">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
