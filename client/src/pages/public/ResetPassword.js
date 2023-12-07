import React from 'react';
import { InputFileds } from '../../components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { aipResetPassword } from '../../apis/user';
import Swal from 'sweetalert2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import icons from '../../ultils/icons';
import path from '../../ultils/path';

const ResetPassword = () => {
    const RegisterSchema = yup.object({
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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(RegisterSchema),
    });

    const { AiFillHome } = icons;
    const navigate = useNavigate();
    const { token } = useParams();
    const onSubmit = async data => {
        const { password } = data;
        const response = await aipResetPassword({ token, password });
        if (response.success) {
            Swal.fire('Congratulation !', response.message, 'success').then(() => navigate(`/${path.LOGIN}`));
        } else Swal.fire('Opps!', response.message, 'error');
    };
    return (
        <div>
            <img
                loading="lazy"
                className="relative w-screen h-screen"
                alt=""
                src="https://img.freepik.com/free-photo/shopping-trolleys-packets-gift-tags_23-2147961963.jpg?w=1800&t=st=1694255869~exp=1694256469~hmac=f2e9b4243d7d926c015c9fc2a5507bc2df923277818aa728f634aad46074da82"
            />
            <div className="absolute flex justify-center top-0 right-0 bottom-0 left-0 items-center ">
                <div className="rounded-md bg-main p-[15px]">
                    <div className="flex justify-between">
                        <h2 className="mb-[15px] text-[20px] font-medium">Reset your password</h2>
                        <Link to={`/${path.HOME}`}>
                            <AiFillHome className="text-[30px] text-white cursor-pointer" />
                        </Link>
                    </div>
                    <form method="PUT" onSubmit={handleSubmit(onSubmit)}>
                        <InputFileds
                            placeholder={'New Password'}
                            registername={register('password')}
                            errorName={errors.password?.message}
                            // type={'password'}
                        />

                        <InputFileds
                            placeholder={'Confirm Password'}
                            registername={register('confirmPassword')}
                            errorName={errors.confirmPassword?.message}
                            // type={'password'}
                        />
                        <div className="flex w-full justify-center">
                            <button
                                className="text-white bg-black p-2 rounded-md hover:text-black hover:bg-white w-full mb-[15px]"
                                type="submit"
                            >
                                Change
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
