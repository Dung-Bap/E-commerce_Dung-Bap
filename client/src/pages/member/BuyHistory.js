import React, { useEffect, useState } from 'react';
import { apiGetOrderById } from '../../apis';
import useDebouce from '../../hook/useDebouce';
import { Pagination } from '../../components/pagination';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';

const BuyHistory = () => {
    const [params] = useSearchParams();

    const [valueInput, setValueInput] = useState('');
    const debouceValue = useDebouce(valueInput, 800);
    const [AllOrder, setAllOrder] = useState(null);
    const currentPage = +params.get('page') || 1;
    console.log(AllOrder?.orders);
    useEffect(() => {
        const fetchApiOrder = async () => {
            const response = await apiGetOrderById({ q: debouceValue });
            if (response.success) setAllOrder(response);
        };

        fetchApiOrder();
    }, [debouceValue]);

    return (
        <div className="w-full ">
            <div className="p-4">
                <div className="flex justify-center font-semibold text-white text-lg py-2 uppercase ">Buy History</div>
            </div>
            <div className="flex justify-end p-5">
                <input
                    className="form-input min-w-[500px] placeholder:italic placeholder:text-sm"
                    placeholder="Search phone, address and status"
                    value={valueInput}
                    onChange={e => setValueInput(e.target.value)}
                />
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <form method="POST">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-2 py-3">
                                    #
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    Name Product
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    Color
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    Quantity
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    Total Price
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    Purchase Date
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    Infomation
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {AllOrder?.orders.map((order, index) => (
                                <tr
                                    key={index}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <th scope="row" className="px-2 py-4">
                                        {(currentPage - 1) * process.env.REACT_APP_PAGE_SIZE + index + 1}
                                    </th>
                                    <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="flex flex-col">
                                            {order.products.map(product => (
                                                <span>{product.title}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="flex flex-col">
                                            {order.products.map(product => (
                                                <span>{product.color}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="flex flex-col">
                                            {order.products.map(product => (
                                                <span>{product.quantity}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {`${order.total}$`}
                                    </td>
                                    <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {order.status}
                                    </td>
                                    <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {moment(order.createdAt).format('DD/MM/YYYY')}
                                    </td>
                                    <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="flex flex-col">
                                            <span>{order.phone}</span>
                                            <span>{order.address}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>
            <div>
                <Pagination totalProduct={AllOrder?.counts} textWhite />
            </div>
        </div>
    );
};

export default BuyHistory;
