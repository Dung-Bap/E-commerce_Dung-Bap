import { apiDeleteProduct, apiGetProducts } from 'apis';
import { UpdateProduct } from 'components';
import { Pagination } from 'components/pagination';
import useDebouce from 'hook/useDebouce';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { formatMoney } from 'ultils/helpers';

const ManageProduct = () => {
    const [valueInput, setValueInput] = useState('');
    const [totalProducts, setTotalProducts] = useState(null);
    const [editProduct, setEditProduct] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [params] = useSearchParams();
    const currentPage = +params.get('page') || 1;

    const fetchApiGetProducts = async queries => {
        const response = await apiGetProducts({ ...queries, limit: process.env.REACT_APP_PAGE_SIZE });
        if (response?.success) setTotalProducts(response);
    };

    const debouceValue = useDebouce(valueInput, 800);
    useEffect(() => {
        const queries = Object.fromEntries([...params]);
        queries.q = debouceValue;
        fetchApiGetProducts(queries);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, [debouceValue, params, updated]);

    const handleDeleteProduct = (pid, title) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Product '${title}' delete ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async result => {
            if (result.isConfirmed) {
                const response = await apiDeleteProduct(pid);
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: response.message,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setUpdated(!updated);
                }
            }
        });
    };

    return (
        <>
            {!editProduct && (
                <div className="p-4">
                    <div className="flex justify-center font-semibold text-white text-lg py-2 uppercase ">
                        Manage Products
                    </div>
                    <div className="flex justify-end p-5">
                        <input
                            className="form-input min-w-[500px] placeholder:italic placeholder:text-sm"
                            placeholder="Search title and description..."
                            value={valueInput}
                            onChange={e => setValueInput(e.target.value)}
                        />
                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-2 py-3">
                                        #
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Thumbnail
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Title
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Brand
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Quantity
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Sold
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Color
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Ratings
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Date Created
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {totalProducts?.products.map((product, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <th scope="row" className="px-2 py-4">
                                            {(currentPage - 1) * process.env.REACT_APP_PAGE_SIZE + index + 1}
                                        </th>
                                        <td className="px-2 py-4">
                                            <img
                                                className="w-[50px] h-[50px] object-contain"
                                                alt=""
                                                src={product.thumbnail}
                                            />
                                        </td>
                                        <td className="px-2 py-4 ">{product.title}</td>
                                        <td className="px-2 py-4 ">{product.brand}</td>
                                        <td className="px-2 py-4 ">{product.category}</td>
                                        <td className="px-2 py-4 ">{formatMoney(product.price)}</td>
                                        <td className="px-2 py-4 ">{product.quantity}</td>
                                        <td className="px-2 py-4 ">{product.sold}</td>
                                        <td className="px-2 py-4 ">{product.color}</td>
                                        <td className="px-2 py-4 ">{product.totalRatings}</td>
                                        <td className="px-2 py-4 ">{moment(product.updatedAt).format('DD/MM/YYYY')}</td>
                                        <td className="px-2 py-4 ">
                                            {
                                                <>
                                                    <span
                                                        onClick={() => {
                                                            setEditProduct(product);
                                                        }}
                                                        className="text-blue-500 mr-[10px] cursor-pointer hover:underline"
                                                    >
                                                        Edit
                                                    </span>
                                                    <span
                                                        onClick={() => handleDeleteProduct(product._id, product.title)}
                                                        className="text-red-500 cursor-pointer hover:underline"
                                                    >
                                                        Delete
                                                    </span>
                                                </>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <Pagination totalProduct={totalProducts?.counts} textWhite />
                    </div>
                </div>
            )}
            {editProduct && (
                <UpdateProduct
                    setEditProduct={setEditProduct}
                    editProduct={editProduct}
                    setUpdated={setUpdated}
                    updated={updated}
                />
            )}
        </>
    );
};

export default ManageProduct;
