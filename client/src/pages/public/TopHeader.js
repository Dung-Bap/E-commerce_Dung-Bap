import React, { memo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import path from '../../ultils/path';
import { getCurrent } from '../../store/user/asyncActions';
import { clearMessage } from '../../store/user/userSlice';
import { showMenu } from '../../store/app/appSlice';

const TopHeader = () => {
    const { isLoggedIn, userData, message } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            const setTimeLogIn = setTimeout(() => {
                dispatch(getCurrent());
            }, 300);
            return () => {
                clearTimeout(setTimeLogIn);
            };
        }
    }, [dispatch, isLoggedIn]);

    useEffect(() => {
        if (message)
            Swal.fire({
                title: 'Login failed',
                text: message,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oki',
            }).then(result => {
                if (result.isConfirmed) {
                    navigate(`${path.LOGIN}`);
                    dispatch(clearMessage());
                    dispatch(showMenu());
                }
                if (result.isDismissed) {
                    dispatch(clearMessage());
                    dispatch(showMenu());
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message]);

    return (
        <div className="w-full hidden sm:flex justify-center bg-main p-2 text-[12px] text-white  ">
            <div className="lg:w-main md:w-full ">
                <div className="flex w-full justify-between">
                    <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
                    {isLoggedIn && userData ? (
                        <div className="flex items-center">
                            <span className="hover:text-black uppercase">{`Welcome to the store, ${userData?.firstname} ${userData?.lastname}`}</span>
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

export default memo(TopHeader);
