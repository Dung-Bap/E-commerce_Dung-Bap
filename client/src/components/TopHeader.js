import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import path from '../ultils/path';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrent } from '../store/user/asyncActions';
import icons from '../ultils/icons';
import { logout } from '../store/user/userSlice';
import Swal from 'sweetalert2';

const TopHeader = () => {
    const { IoLogOut } = icons;
    const { isLoggedIn, userData } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to log out !',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes !',
        }).then(rs => {
            if (rs.isConfirmed) {
                dispatch(logout());
            }
        });
    };

    useEffect(() => {
        dispatch(getCurrent());
    }, [dispatch, isLoggedIn]);

    return (
        <div className="w-full flex justify-center bg-main p-2 text-[12px] text-white">
            <div className="w-main">
                <div className="flex w-main justify-between">
                    <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
                    {isLoggedIn ? (
                        <div className="flex items-center">
                            <span className="hover:text-black uppercase">{`Welcome to the store, ${userData?.firstname} ${userData?.lastname}`}</span>
                            <span onClick={handleLogout} className="ml-5 hover:text-black cursor-pointer">
                                <IoLogOut size={20} />
                            </span>
                        </div>
                    ) : (
                        <Link to={path.LOGIN}>
                            <span className="cursor-pointer hover:text-black">Sign In or Create Account</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopHeader;
