import React, { useEffect, useState } from 'react';
import { apiDestroyOrder, apiGetOrderById } from '../../apis';
import useDebouce from '../../hook/useDebouce';
import { Pagination } from '../../components/pagination';
import { Link, useSearchParams } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';
import withBaseComponent from '../../hocs/withBaseComponent';
import { showModal } from '../../store/app/appSlice';
import { Button, Loading } from '../../components';
import path from '../../ultils/path';
import icons from '../../ultils/icons';

const BuyHistory = ({ dispatch }) => {
    const { AiFillHome } = icons;
    const [params] = useSearchParams();
    const [valueInput, setValueInput] = useState('');
    const debouceValue = useDebouce(valueInput, 800);
    const [AllOrder, setAllOrder] = useState(null);
    const currentPage = +params.get('page') || 1;

    const [selected, setSelected] = useState([]);
    const [updated, setUpdated] = useState(false);

    const handleChange = (e, data) => {
        const { name, checked } = e.target;
        if (checked) {
            if (name === 'allSelect') {
                setSelected(AllOrder?.orders);
            } else {
                setSelected([...selected, data]);
            }
        } else {
            if (name === 'allSelect') {
                setSelected([]);
            } else {
                let temppost = selected.filter(item => item._id !== data._id);
                setSelected(temppost);
            }
        }
    };

    // console.log(AllOrder?.orders);
    useEffect(() => {
        const fetchApiOrder = async () => {
            const response = await apiGetOrderById({ q: debouceValue });
            if (response.success) setAllOrder(response);
        };

        fetchApiOrder();
    }, [debouceValue, updated]);

    const handleDestroyBuyHistory = async () => {
        const _id = selected.map(item => item._id);
        Swal.fire({
            title: 'Are you sure ?',
            text: 'Deleted purchase history cannot be restored !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete !',
        }).then(async result => {
            if (result.isConfirmed) {
                dispatch(showModal({ isShowModal: true, childrenModal: <Loading /> }));
                const response = await apiDestroyOrder(_id);
                dispatch(showModal({ isShowModal: false, childrenModal: null }));
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: response.message,
                        showConfirmButton: false,
                        timer: 1000,
                    });
                    setUpdated(prev => !prev);
                    setSelected([]);
                }
            }
        });
    };

    return (
        <div className="w-full p-4 ">
            <div className="p-4">
                <div className="absolute right-[10px] top-[10px] lg:hidden">
                    <Link to={`/${path.HOME}`}>
                        <AiFillHome size={20} color="white" />
                    </Link>
                </div>
                <div className="flex justify-center font-semibold text-white text-lg py-2 uppercase ">Buy History</div>
            </div>
            <div className="flex justify-between p-5">
                {selected?.length > 0 && (
                    <Button
                        onClick={handleDestroyBuyHistory}
                        className={'text-white bg-[red] rounded-md mr-[10px] min-w-[88px]'}
                    >
                        Delete
                    </Button>
                )}
                {selected?.length === 0 && <div></div>}
                <input
                    className="form-input w-full md:w-[500px] placeholder:italic placeholder:text-sm"
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
                                <th scope="col" className="lg:p-4 p-2">
                                    <div className="flex items-center">
                                        <input
                                            name="allSelect"
                                            checked={selected?.length === AllOrder?.orders?.length}
                                            onChange={e => handleChange(e, AllOrder?.orders)}
                                            id="checkbox-all-search"
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500-600-800-gray-800 focus:ring-2 "
                                        />
                                        <label htmlFor="checkbox-all-search" className="sr-only">
                                            checkbox
                                        </label>
                                    </div>
                                </th>
                                <th scope="col" className="lg:px-2 px-1 lg:py-3">
                                    #
                                </th>
                                <th scope="col" className="lg:px-2 px-1 lg:py-3">
                                    Name Product
                                </th>
                                <th scope="col" className="lg:px-2 px-1 lg:py-3">
                                    Color
                                </th>
                                <th scope="col" className="lg:px-2 px-1 lg:py-3">
                                    Quantity
                                </th>
                                <th scope="col" className="lg:px-2 px-1 lg:py-3">
                                    Total Price
                                </th>
                                <th scope="col" className="lg:px-2 px-1 lg:py-3">
                                    Status
                                </th>
                                <th scope="col" className="lg:px-2 px-1 lg:py-3">
                                    Purchase Date
                                </th>
                                <th scope="col" className="lg:px-2 px-1 lg:py-3">
                                    Infomation
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {AllOrder?.orders.map((order, index) => (
                                <tr
                                    key={order?._id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <td className="w-4 lg:p-4 p-2">
                                        <div className="flex items-center">
                                            <input
                                                checked={selected.some(item => item?._id === order?._id)}
                                                onChange={e => handleChange(e, order)}
                                                id="checkbox-table-search-1"
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
                                            />
                                            <label htmlFor="checkbox-table-search-1" className="sr-only">
                                                checkbox
                                            </label>
                                        </div>
                                    </td>
                                    <th scope="row" className="lg:px-2 px-1 lg:py-4">
                                        {(currentPage - 1) * process.env.REACT_APP_PAGE_SIZE + index + 1}
                                    </th>
                                    <td className="lg:px-2 px-1 lg:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="flex flex-col">
                                            {order.products.map((product, index) => (
                                                <span key={index}>{product.title}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="lg:px-2 px-1 lg:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="flex flex-col">
                                            {order.products.map((product, index) => (
                                                <span key={index}>{product.color}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="lg:px-2 px-1 lg:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="flex flex-col">
                                            {order.products.map((product, index) => (
                                                <span key={index}>{product.quantity}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="lg:px-2 px-1 lg:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {`${order.total}$`}
                                    </td>
                                    <td className="lg:px-2 px-1 lg:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {order.status}
                                    </td>
                                    <td className="lg:px-2 px-1 lg:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {moment(order.createdAt).format('DD/MM/YYYY')}
                                    </td>
                                    <td className="lg:px-2 px-1 lg:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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

export default withBaseComponent(BuyHistory);
