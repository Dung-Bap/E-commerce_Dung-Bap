import Swal from 'sweetalert2';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { apiDeleteUser, apiGetUsers, apiUpdateUsers } from '../../apis';
import { Pagination } from '../../components/pagination';
import useDebouce from '../../hook/useDebouce';
import { roles, isBlocked } from '../../ultils/contants';
import { InputFileds, SelectFileds } from '../../components';
import path from '../../ultils/path';
import icons from '../../ultils/icons';

const ManageUser = () => {
    const { AiFillHome } = icons;
    const [allUsers, setAllUsers] = useState(null);
    const [valueInput, setValueInput] = useState('');
    const [params] = useSearchParams();
    const [editUser, setEditUser] = useState(null);
    const [updated, setUpdated] = useState(false);
    const debouceValue = useDebouce(valueInput, 400);
    const currentPage = +params.get('page') || 1;
    const refForm = useRef();

    const fetchGetUsers = async params => {
        const response = await apiGetUsers({ ...params, limit: process.env.REACT_APP_PAGE_SIZE });
        if (response?.success) setAllUsers(response);
    };

    const handleDeleteUser = (uid, mail) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `User with email: '${mail}' delete ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async result => {
            if (result.isConfirmed) {
                const response = await apiDeleteUser(uid);
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: response.message,
                        showConfirmButton: false,
                        timer: 1000,
                    });
                    setUpdated(!updated);
                }
            }
        });
    };

    useEffect(() => {
        const queries = Object.fromEntries([...params]);
        queries.q = debouceValue;
        fetchGetUsers(queries);
        refForm.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }, [debouceValue, params, updated]);

    const editUserSchema = yup.object({
        firstname: yup.string().required('Please enter "First Name"'),
        lastname: yup.string().required('Please enter "Last Name"'),
        email: yup.string().required('Please enter "Email"').email('Invalid email !'),

        role: yup.string().required('Please select your use case !'),
        isBlocked: yup.string().required('Please select your use case !'),
    });

    const {
        register,
        setValue,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(editUserSchema),
    });

    const onSubmit = async data => {
        reset();
        setUpdated(!updated);
        setEditUser(null);
        const response = await apiUpdateUsers(data, editUser._id);
        if (response.success) {
            Swal.fire({
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 1000,
            });
        }
    };

    return (
        <div className="p-4">
            <div className="absolute right-[10px] top-[10px] lg:hidden">
                <Link to={`/${path.HOME}`}>
                    <AiFillHome size={20} color="white" />
                </Link>
            </div>
            <div ref={refForm} className="flex justify-center font-semibold text-white text-lg py-2 uppercase ">
                Manage Users
            </div>
            <div className="flex justify-end p-5">
                <input
                    className="form-input w-full sm:w-[500px] placeholder:italic placeholder:text-sm"
                    placeholder="Search name and email"
                    value={valueInput}
                    onChange={e => setValueInput(e.target.value)}
                />
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="sm:px-2 px-1 sm:py-3">
                                    #
                                </th>
                                <th scope="col" className="sm:px-2 px-1 sm:py-3">
                                    First Name
                                </th>
                                <th scope="col" className="sm:px-2 px-1 sm:py-3">
                                    Last Name
                                </th>
                                <th scope="col" className="sm:px-2 px-1 sm:py-3">
                                    Email Adress
                                </th>
                                <th scope="col" className="sm:px-2 px-1 sm:py-3">
                                    Role
                                </th>
                                <th scope="col" className="sm:px-2 px-1 sm:py-3">
                                    Status
                                </th>
                                <th scope="col" className="sm:px-2 px-1 sm:py-3">
                                    Date Created
                                </th>
                                <th scope="col" className="sm:px-2 px-1 sm:py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers?.users?.map((user, index) => (
                                <tr
                                    key={index}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <th scope="row" className="sm:px-2 px-1 sm:py-4">
                                        {(currentPage - 1) * process.env.REACT_APP_PAGE_SIZE + index + 1}
                                    </th>
                                    <td className="sm:px-2 px-1 sm:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {editUser?._id === user?._id ? (
                                            <InputFileds
                                                withFull
                                                registername={register('firstname')}
                                                errorName={errors.firstname?.message}
                                                defaultValue={editUser.firstname}
                                            />
                                        ) : (
                                            user.firstname
                                        )}
                                    </td>
                                    <td className="sm:px-2 px-1 sm:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {editUser?._id === user?._id ? (
                                            <InputFileds
                                                withFull
                                                defaultValue={editUser.lastname}
                                                registername={register('lastname')}
                                                errorName={errors.lastname?.message}
                                            />
                                        ) : (
                                            user.lastname
                                        )}
                                    </td>
                                    <td className="sm:px-2 px-1 sm:py-4">
                                        {editUser?._id === user?._id ? (
                                            <InputFileds
                                                withFull
                                                defaultValue={editUser.email}
                                                registername={register('email')}
                                                errorName={errors.email?.message}
                                            />
                                        ) : (
                                            user.email
                                        )}
                                    </td>
                                    <td className="sm:px-2 px-1 sm:py-4">
                                        {editUser?._id === user?._id ? (
                                            <SelectFileds
                                                registername={register('role')}
                                                errorName={errors.select?.message}
                                                onChange={e =>
                                                    setValue('role', e.target.value, { shouldValidate: true })
                                                }
                                                withFull
                                                defaultValue={user.role}
                                                options={roles}
                                            />
                                        ) : (
                                            roles.find(role => +role.code === +user.role).value
                                        )}
                                    </td>
                                    <td className="sm:px-2 px-1 sm:py-4">
                                        {editUser?._id === user?._id ? (
                                            <SelectFileds
                                                registername={register('isBlocked')}
                                                errorName={errors.select?.message}
                                                onChange={e =>
                                                    setValue('isBlocked', e.target.value, { shouldValidate: true })
                                                }
                                                withFull
                                                defaultValue={user.isBlocked}
                                                options={isBlocked}
                                            />
                                        ) : user.isBlocked ? (
                                            'Blocked'
                                        ) : (
                                            'Actived'
                                        )}
                                    </td>
                                    <td className="sm:px-2 px-1 sm:py-4">
                                        {moment(user.updatedAt).format('DD/MM/YYYY')}
                                    </td>
                                    <td className="sm:px-2 px-1 sm:py-4">
                                        {!(editUser?._id === user?._id) ? (
                                            <>
                                                <span
                                                    onClick={() => {
                                                        setEditUser(user);
                                                        reset();
                                                    }}
                                                    className="text-blue-500 mr-[10px] cursor-pointer hover:underline"
                                                >
                                                    Edit
                                                </span>
                                                <span
                                                    onClick={() => handleDeleteUser(user?._id, user?.email)}
                                                    className="text-red-500 cursor-pointer hover:underline"
                                                >
                                                    Delete
                                                </span>
                                            </>
                                        ) : (
                                            <div className="flex">
                                                <button
                                                    type="submit"
                                                    className="text-blue-500 mr-[10px] cursor-pointer hover:underline"
                                                >
                                                    Update
                                                </button>
                                                <span
                                                    onClick={() => {
                                                        setEditUser(null);
                                                        reset();
                                                    }}
                                                    className="text-red-500 cursor-pointer hover:underline"
                                                >
                                                    Back
                                                </span>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>
            <div>
                <Pagination totalProduct={allUsers?.counts} textWhite />
            </div>
        </div>
    );
};

export default ManageUser;
