import { apiGetUsers } from 'apis';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { roles } from 'ultils/contants';

const ManageUser = () => {
    const [allUsers, setAllUsers] = useState(null);

    const fetchGetUsers = async params => {
        const response = await apiGetUsers(params);
        if (response.success) setAllUsers(response);
    };

    useEffect(() => {
        fetchGetUsers();
    }, []);

    return (
        <div>
            <div className="flex justify-center font-semibold text-white text-lg py-9 uppercase ">Manage Users</div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                #
                            </th>
                            <th scope="col" class="px-6 py-3">
                                User Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email Adress
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Role
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Date Created
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers?.users?.map((user, index) => (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="px-6 py-4">
                                    {index + 1}
                                </th>
                                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {`${user.firstname} ${user.lastname}`}
                                </td>
                                <td class="px-6 py-4">{user.email}</td>
                                <td class="px-6 py-4">{roles.find(role => +role.code === +user.role).value}</td>
                                <td class="px-6 py-4">{user.isBlocked ? 'Blocked' : 'Actived'}</td>
                                <td class="px-6 py-4">{moment(user.updatedAt).format('DD/MM/YYYY')}</td>
                                <td class="px-6 py-4">
                                    <span className="text-blue-500 mr-[10px] cursor-pointer hover:underline">Edit</span>
                                    <span className="text-red-500 cursor-pointer hover:underline">Delete</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;
