import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import path from '../../ultils/path';
import Swal from 'sweetalert2';

const FinalRegister = () => {
    const { status } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (status === 'failed')
            Swal.fire('Oops!', 'Registration failed !', 'error').then(() => {
                navigate(`/${path.LOGIN}`);
            });
        if (status === 'success')
            Swal.fire('Congratulation!', 'Sign Up Success ! Go Loginn', 'success').then(() => {
                navigate(`/${path.LOGIN}`);
            });
    }, [navigate, status]);
    return (
        <img
            loading="lazy"
            className="relative w-screen h-screen"
            alt=""
            src="https://img.freepik.com/free-photo/shopping-trolleys-packets-gift-tags_23-2147961963.jpg?w=1800&t=st=1694255869~exp=1694256469~hmac=f2e9b4243d7d926c015c9fc2a5507bc2df923277818aa728f634aad46074da82"
        />
    );
};
export default FinalRegister;
