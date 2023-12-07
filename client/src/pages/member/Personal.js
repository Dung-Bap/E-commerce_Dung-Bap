import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Swal from 'sweetalert2';

import { Button, InputFileds, Loading } from '../../components';
import icons from '../../ultils/icons';
import { convertToBase64 } from '../../ultils/helpers';
import { showModal } from '../../store/app/appSlice';
import { apiUpdateUser } from '../../apis';
import { getCurrent } from '../../store/user/asyncActions';
import withBaseComponent from '../../hocs/withBaseComponent';
import { Link, useSearchParams } from 'react-router-dom';
import path from '../../ultils/path';

const Personal = ({ ...props }) => {
    const { userData } = useSelector(state => state.user);
    const [previewAvatar, setPreviewAvatar] = useState({
        avatar: null,
    });
    const [updated, setUpdated] = useState(false);
    const { BsFillCameraFill, AiFillHome } = icons;
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const setTimeLogIn = setTimeout(() => {
            props.dispatch(getCurrent());
        }, 300);
        return () => {
            clearTimeout(setTimeLogIn);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updated]);

    const personalSchema = yup.object({
        firstname: yup.string().required('Please enter firstname'),
        lastname: yup.string().required('Please enter lastname'),
        email: yup.string().required('Please enter email').email('Invalid email !'),
        address: yup.string(),
        phone: yup
            .string()
            .required('Please enter "Phone Number"')
            .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Phone number does not exist !'),
    });

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isDirty },
    } = useForm({
        resolver: yupResolver(personalSchema),
    });

    useEffect(() => {
        reset(
            {
                firstname: userData?.firstname,
                lastname: userData?.lastname,
                email: userData?.email,
                address: userData?.address,
                phone: userData?.phone,
            },
            setPreviewAvatar({
                avatar: null,
            }),
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData, updated]);

    const handleReviewAvatar = async file => {
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            Swal.fire('Something went wrong', 'Please choose image with type: jpg or png !', 'error');
        } else {
            const response = await convertToBase64(file);
            setPreviewAvatar(prev => ({ ...prev, avatar: response }));
        }
    };

    useEffect(() => {
        if (watch('avatar') instanceof FileList && watch('avatar').length > 0) {
            handleReviewAvatar(watch('avatar')[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('avatar')]);

    const onSubmit = async data => {
        const formData = new FormData();
        if (data.avatar.length > 0) formData.append('avatar', data.avatar[0]);
        delete data.avatar;
        for (let i of Object.entries(data)) formData.append(i[0], i[1]);

        props.dispatch(showModal({ isShowModal: true, childrenModal: <Loading /> }));
        const response = await apiUpdateUser(formData);
        props.dispatch(showModal({ isShowModal: false, childrenModal: null }));

        if (response.success) {
            Swal.fire({
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 1000,
            });
            setUpdated(!updated);
            if (searchParams.get('redirect')) props.navigate(searchParams.get('redirect'));
        } else Swal.fire('Opps!', response.message, 'error');
    };
    return (
        <div className="w-full ">
            <div className="p-4">
                <div className="absolute right-[10px] top-[10px] lg:hidden">
                    <Link to={`/${path.HOME}`}>
                        <AiFillHome size={20} color="white" />
                    </Link>
                </div>
                <div className="flex justify-center font-semibold text-white text-lg py-2 uppercase ">
                    Detail Profile
                </div>
            </div>
            <div className="flex justify-center">
                <div className="w-full p-4 md:w-[50%]">
                    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col justify-center items-center p-4 ">
                            <div className=" flex flex-col justify-center items-center relative">
                                <img
                                    loading="lazy"
                                    className=" w-[60px] h-[60px] rounded-full object-cover  "
                                    alt=""
                                    src={
                                        previewAvatar.avatar
                                            ? previewAvatar.avatar
                                            : userData.avatar ||
                                              'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'
                                    }
                                />

                                <span className="mt-[10px] text-white">{`${userData.firstname} ${userData.lastname}`}</span>
                                {
                                    <div className="absolute bottom-[26px] right-[8px]">
                                        <div className="bg-[rgba(0,0,0,0.5)] p-1 border rounded-full ">
                                            <label className="cursor-pointer" htmlFor="image">
                                                <BsFillCameraFill color="white" />
                                            </label>
                                        </div>
                                        <input {...register('avatar')} type="file" id="image" hidden />
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="mb-[30px]">
                            <InputFileds
                                withFull
                                label={'Firstname:'}
                                registername={register('firstname')}
                                errorName={errors.firstname?.message}
                                invalidRed
                            />
                        </div>
                        <div className="mb-[30px]">
                            <InputFileds
                                withFull
                                label={'Lastname:'}
                                registername={register('lastname')}
                                errorName={errors.lastname?.message}
                                invalidRed
                            />
                        </div>
                        <div className="mb-[30px]">
                            <InputFileds
                                withFull
                                label={'Email:'}
                                registername={register('email')}
                                errorName={errors.email?.message}
                                invalidRed
                                readOnly
                            />
                        </div>
                        <div className="mb-[30px]">
                            <InputFileds
                                withFull
                                label={'Phone Number:'}
                                registername={register('phone')}
                                errorName={errors.phone?.message}
                                invalidRed
                            />
                        </div>
                        <div className="mb-[30px]">
                            <InputFileds
                                withFull
                                label={'Address:'}
                                registername={register('address')}
                                errorName={errors.address?.message}
                                invalidRed
                            />
                        </div>
                        <div className="flex justify-between mb-[30px]">
                            <div className="flex flex-col text-white">
                                <span className="mb-[30px] italic">
                                    Account Status:{' '}
                                    <span className="font-light">{userData.isBlocked ? 'Blocked' : 'Actived'}</span>
                                </span>
                                <span className="mb-[30px] italic">
                                    Role:{' '}
                                    <span className="font-light"> {+userData.role === 1998 ? 'Admin' : 'Member'}</span>
                                </span>
                                <span className="italic">
                                    Date Created:{' '}
                                    <span className="font-light">
                                        {' '}
                                        {moment(userData.createdAt).format('DD/MM/YYYY')}
                                    </span>
                                </span>
                            </div>
                            <div className="flex items-end">
                                {isDirty && (
                                    <Button className="text-white bg-main p-2 rounded-md mr-[10px] px-4 py-2 min-w-[88px] mt-4">
                                        Update Profile
                                    </Button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default withBaseComponent(Personal);
