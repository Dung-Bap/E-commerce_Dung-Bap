import React, { useState } from 'react';
import imageLogin from '../../assets/shopping-trolleys-packets-gift-tags.jpg';
import { InputFileds } from '../../components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { apiLogin, apiRegister } from '../../apis/user';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../store/user/userSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showRegister, setShowRegister] = useState(false);

    const hadleShowRegister = () => {
        setShowRegister(!showRegister);
    };

    const RegisterSchema = yup.object({
        firstname: yup.string().required('Please enter "First Name"'),
        lastname: yup.string().required('Please enter "Last Name"'),
        // phone: yup
        //     .string()
        //     .required('Please enter "Phone Number"')
        //     .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Phone number does not exist !'),
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
        const { confirmPassword, firstname, lastname, phone, ...payload } = data;
        if (showRegister) {
            const response = await apiRegister(data);
            if (response.success) {
                Swal.fire('Congratulation', response.message, 'success').then(() => {
                    reset();
                    setShowRegister(!showRegister);
                });
            } else Swal.fire('Opps!', response.message, 'error').then(reset());
        } else {
            const response = await apiLogin(payload);
            if (response.success) {
                dispatch(
                    registerUser({ isLoggedIn: true, userData: response.userData, accessToken: response.accessToken }),
                );
                navigate('/');
            } else Swal.fire('Opps!', response.message, 'error');
        }
    };
    return (
        <div>
            <img className="relative w-screen h-screen" alt="" src={imageLogin} />
            <div className="absolute flex justify-center top-0 right-0 bottom-0 left-0 items-center ">
                <div className="rounded-md bg-main p-[15px]">
                    <h2 className="mb-[15px]">{showRegister ? 'Register' : 'Login'}</h2>
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
                        {/* {showRegister && (
                            <InputFileds
                                placeholder={'Phone Number'}
                                registername={register('phone')}
                                errorName={errors.phone?.message}
                            />
                        )} */}
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
                        <div className="flex justify-between">
                            <button className="text-white" type="submit">
                                {showRegister ? 'Create' : 'Sign in'}
                            </button>
                            <button onClick={hadleShowRegister} type="button" className="text-white">
                                {showRegister ? 'Back' : 'Register'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
