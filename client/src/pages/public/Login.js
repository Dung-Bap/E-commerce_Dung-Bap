import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { InputFileds, Loading } from '../../components';
import { apiForgotPassword, apiLogin, apiRegister } from '../../apis/user';
import { registerUser } from '../../store/user/userSlice';
import Button from '../../components/Button';
import icons from '../../ultils/icons';
import path from '../../ultils/path';
import { showModal } from '../../store/app/appSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showRegister, setShowRegister] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [searchParams] = useSearchParams();

    const handleForgotPassword = async () => {
        dispatch(showModal({ isShowModal: true, childrenModal: <Loading /> }));
        const response = await apiForgotPassword({ email });
        dispatch(showModal({ isShowModal: false, childrenModal: null }));
        if (response.success) {
            Swal.fire('Congratulation !', response.message, 'success');
        } else Swal.fire('Opps!', response.message, 'error');
    };

    const hadleShowRegister = () => {
        setShowRegister(!showRegister);
        reset();
    };
    const handleShowForgotPassword = () => {
        setShowForgotPassword(!showForgotPassword);
    };

    const { AiFillHome } = icons;

    const RegisterSchema = yup.object({
        firstname: yup.string().required('Please enter "First Name"'),
        lastname: yup.string().required('Please enter "Last Name"'),
        phone: yup
            .string()
            .required('Please enter "Phone Number"')
            .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Phone number does not exist !'),
        email: yup.string().required('Please enter "Your Email"').email('Invalid email !'),
        password: yup
            .string()
            .required('Please enter "Password"')
            .min(
                8,
                'Password must be at least 8 characters including uppercase letters, lowercase letters, numbers and special characters !!',
            )
            .test(
                'isValidPass',
                ' Password must be at least 8 characters including uppercase letters, lowercase letters, numbers and special characters !!',
                (value, context) => {
                    const hasUpperCase = /[A-Z]/.test(value);
                    const hasLowerCase = /[a-z]/.test(value);
                    const hasNumber = /[0-9]/.test(value);
                    const hasSymbole = /[!@#%&]/.test(value);
                    let validConditions = 0;
                    const numberOfMustBeValidConditions = 3;
                    const conditions = [hasLowerCase, hasUpperCase, hasNumber, hasSymbole];
                    conditions.forEach(condition => (condition ? validConditions++ : null));
                    if (validConditions >= numberOfMustBeValidConditions) {
                        return true;
                    }
                    return false;
                },
            ),
        confirmPassword: yup
            .string()
            .required('Please enter "Confirm Password"')
            .oneOf([yup.ref('password'), null], 'Passwords do not match !'),
    });

    const loginSchema = yup.object({
        email: yup.string().required('Please enter "Your Email"').email('Invalid email !'),
        password: yup
            .string()
            .required('Please enter "Password"')
            .min(
                8,
                'Password must be at least 8 characters including uppercase letters, lowercase letters, numbers and special characters !!',
            )
            .test(
                'isValidPass',
                ' Password must be at least 8 characters including uppercase letters, lowercase letters, numbers and special characters !!',
                (value, context) => {
                    const hasUpperCase = /[A-Z]/.test(value);
                    const hasLowerCase = /[a-z]/.test(value);
                    const hasNumber = /[0-9]/.test(value);
                    const hasSymbole = /[!@#%&]/.test(value);
                    let validConditions = 0;
                    const numberOfMustBeValidConditions = 3;
                    const conditions = [hasLowerCase, hasUpperCase, hasNumber, hasSymbole];
                    conditions.forEach(condition => (condition ? validConditions++ : null));
                    if (validConditions >= numberOfMustBeValidConditions) {
                        return true;
                    }
                    return false;
                },
            ),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(showRegister ? RegisterSchema : loginSchema),
    });
    const onSubmit = async data => {
        const { confirmPassword, firstname, lastname, ...payload } = data;
        if (showRegister) {
            dispatch(showModal({ isShowModal: true, childrenModal: <Loading /> }));
            const response = await apiRegister(data);
            dispatch(showModal({ isShowModal: false, childrenModal: null }));
            if (response.success) {
                Swal.fire('Congratulation', response.message, 'success').then(() => {
                    reset();
                    setShowRegister(!showRegister);
                });
            } else Swal.fire('Opps!', response.message, 'error').then(reset());
        } else {
            const response = await apiLogin(payload);
            if (response?.success) {
                dispatch(registerUser({ isLoggedIn: true, accessToken: response.accessToken }));
                searchParams.get('redirect') ? navigate(searchParams.get('redirect')) : navigate(`/${path.HOME}`);
            } else Swal.fire('Opps!', response.message, 'error');
        }
    };

    return (
        <div>
            <img
                loading="lazy"
                className="relative w-screen h-screen object-cover"
                alt=""
                src="https://img.freepik.com/free-photo/shopping-trolleys-packets-gift-tags_23-2147961963.jpg?w=1800&t=st=1694255869~exp=1694256469~hmac=f2e9b4243d7d926c015c9fc2a5507bc2df923277818aa728f634aad46074da82"
            />
            <div className="absolute flex justify-center top-0 right-0 bottom-0 left-0 items-center ">
                <div className="rounded-md bg-main p-[15px]">
                    {showForgotPassword ? (
                        <div className="flex flex-col items-center w-full sm:min-w-[400px] min-h-[234px]">
                            <div>
                                <h2 className="text-[18px] font-medium mb-[20px]">RESET YOUR PASSWORD</h2>
                            </div>
                            <div className="py-[6px] px-[12px] border mb-[10px]">
                                <span className="text-[14px]">We will send you an email to reset your password.</span>
                            </div>
                            <label htmlFor="email" className="mb-[10px] cursor-pointer">
                                Email
                            </label>
                            <input
                                className="min-w-[225px] py-[8px] px-[10px] text-[14px]"
                                id="email"
                                placeholder="email@gmail.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <div className="mt-[15px] mr-[-10px]">
                                <Button onClick={handleForgotPassword}>Submit</Button>
                                <Button onClick={handleShowForgotPassword}>Back</Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between">
                                <h2 className="mb-[15px] text-[20px] font-medium">
                                    {showRegister ? 'Register' : 'Login'}
                                </h2>
                                <Link to={`/${path.HOME}`}>
                                    <AiFillHome className="text-[30px] text-white cursor-pointer" />
                                </Link>
                            </div>
                            <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                                {showRegister && (
                                    <InputFileds
                                        placeholder={'First Name'}
                                        registername={register('firstname')}
                                        errorName={errors.firstname?.message}
                                    />
                                )}
                                {showRegister && (
                                    <InputFileds
                                        placeholder={'Last Name'}
                                        registername={register('lastname')}
                                        errorName={errors.lastname?.message}
                                    />
                                )}
                                {showRegister && (
                                    <InputFileds
                                        placeholder={'Phone Number'}
                                        registername={register('phone')}
                                        errorName={errors.phone?.message}
                                    />
                                )}
                                <InputFileds
                                    placeholder={'Your Email'}
                                    registername={register('email')}
                                    errorName={errors.email?.message}
                                />
                                <InputFileds
                                    placeholder={'Password'}
                                    registername={register('password')}
                                    errorName={errors.password?.message}

                                    // type={'password'}
                                />
                                {showRegister && (
                                    <InputFileds
                                        placeholder={'Confirm Password'}
                                        registername={register('confirmPassword')}
                                        errorName={errors.confirmPassword?.message}
                                        // type={'password'}
                                    />
                                )}
                                <div className="flex w-full justify-center">
                                    <button
                                        className="text-white bg-black p-2 rounded-md hover:text-black hover:bg-white w-full mb-[15px]"
                                        type="submit"
                                    >
                                        {showRegister ? 'Create' : 'Sign in'}
                                    </button>
                                </div>
                                <div className="flex justify-between">
                                    {!showRegister && (
                                        <span
                                            onClick={handleShowForgotPassword}
                                            className="text-black hover:text-white cursor-pointer"
                                        >
                                            Forgot password ???
                                        </span>
                                    )}
                                    <span
                                        onClick={hadleShowRegister}
                                        type="button"
                                        className="text-black hover:text-white cursor-pointer "
                                    >
                                        {showRegister ? 'Back' : 'Register'}
                                    </span>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
