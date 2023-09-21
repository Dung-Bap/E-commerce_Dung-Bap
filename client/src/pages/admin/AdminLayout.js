import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import path from 'ultils/path';

const AdminLayout = () => {
    const { isLoggedIn, userData } = useSelector(state => state.user);
    if (!isLoggedIn || !userData || !+userData?.role === 1998) return <Navigate to={`${path.LOGIN}`} replace={true} />;
    return (
        <div>
            <div>AdminLayout</div>
            <Outlet />
        </div>
    );
};

export default AdminLayout;
