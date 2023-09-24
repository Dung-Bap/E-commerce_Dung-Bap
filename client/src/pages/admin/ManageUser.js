import { apiGetUsers } from 'apis';
import { Pagination } from 'components/pagination';
import useDebouce from 'hook/useDebouce';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { roles } from 'ultils/contants';
import { useSearchParams } from 'react-router-dom';
import { InputFileds } from 'components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const ManageUser = () => {
    const [allUsers, setAllUsers] = useState(null);
    const [valueInput, setValueInput] = useState('');
    const [params] = useSearchParams();
    const [editUser, setEditUser] = useState(null);
    const debouceValue = useDebouce(valueInput, 400);

    const fetchGetUsers = async params => {
        const response = await apiGetUsers({ ...params, limit: process.env.REACT_APP_PAGE_SIZE });
        if (response?.success) setAllUsers(response);
    };

    useEffect(() => {
        const queries = Object.fromEntries([...params]);
        queries.q = debouceValue;
        fetchGetUsers(queries);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, [debouceValue, params]);

    const editUserSchema = yup.object({
        firstname: yup.string().required('Please enter "First Name"'),
        lastname: yup.string().required('Please enter "Last Name"'),
        email: yup.string().required('Please enter "Email"').email('Invalid email !'),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(editUserSchema),
    });

    const onSubmit = data => {
        reset();
        console.log(data);
    };

    return (
        <div className="h-full">
            <div className="flex justify-center font-semibold text-white text-lg py-2 uppercase ">Manage Users</div>
            <div className="flex justify-end p-5">
                <input
                    className="form-input min-w-[500px] placeholder:italic placeholder:text-sm"
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
                                <th scope="col" className="px-6 py-3">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    First Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Last Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email Adress
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date Created
                                </th>
                                <th scope="col" className="px-6 py-3">
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
                                    <th scope="row" className="px-6 py-4">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {editUser?._id === user?._id ? (
                                            <InputFileds
                                                withFull
                                                placeholder={editUser.firstname}
                                                registername={register('firstname')}
                                                errorName={errors.firstname?.message}
                                            />
                                        ) : (
                                            user.firstname
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {editUser?._id === user?._id ? (
                                            <InputFileds
                                                withFull
                                                placeholder={editUser.lastname}
                                                registername={register('lastname')}
                                                errorName={errors.lastname?.message}
                                            />
                                        ) : (
                                            user.lastname
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editUser?._id === user?._id ? (
                                            <InputFileds
                                                withFull
                                                placeholder={editUser.email}
                                                registername={register('email')}
                                                errorName={errors.email?.message}
                                            />
                                        ) : (
                                            user.email
                                        )}
                                    </td>
                                    <td className="px-6 py-4">{roles.find(role => +role.code === +user.role).value}</td>
                                    <td className="px-6 py-4">{user.isBlocked ? 'Blocked' : 'Actived'}</td>
                                    <td className="px-6 py-4">{moment(user.updatedAt).format('DD/MM/YYYY')}</td>
                                    <td className="px-6 py-4">
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
                                                <span className="text-red-500 cursor-pointer hover:underline">
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
