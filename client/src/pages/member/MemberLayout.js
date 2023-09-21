import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import path from 'ultils/path';

const MemberLayout = () => {
    const { isLoggedIn, userData } = useSelector(state => state.user);
    if (!isLoggedIn || !userData) return <Navigate to={`${path.LOGIN}`} replace={true} />;

    return (
        <div>
            <div>MemberLayout</div>
            <Outlet />
        </div>
    );
};

export default MemberLayout;
