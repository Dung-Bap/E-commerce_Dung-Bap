import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';

import { apiDeleteProduct, apiGetProducts } from '../../apis';
import { UpdateProduct } from '../../components';
import { Pagination } from '../../components/pagination';
import useDebouce from '../../hook/useDebouce';
import { formatMoney } from '../../ultils/helpers';
import CustomizeVarriants from './CustomizeVarriants';
import path from '../../ultils/path';
import icons from '../../ultils/icons';

const ManageProduct = () => {
    const { AiFillHome } = icons;
    const [valueInput, setValueInput] = useState('');
    const [totalProducts, setTotalProducts] = useState(null);
    const [editProduct, setEditProduct] = useState(false);
    const [varriants, setVarriants] = useState(null);
    const [updated, setUpdated] = useState(false);
    const [params] = useSearchParams();
    const currentPage = +params.get('page') || 1;
    const refForm = useRef();

    const fetchApiGetProducts = async queries => {
        const response = await apiGetProducts({ ...queries, limit: process.env.REACT_APP_PAGE_SIZE });
        if (response?.success) setTotalProducts(response);
    };

    const debouceValue = useDebouce(valueInput, 800);
    useEffect(() => {
        const queries = Object.fromEntries([...params]);
        queries.q = debouceValue;
        fetchApiGetProducts(queries);
        refForm.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
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
                        timer: 1000,
                    });
                    setUpdated(!updated);
                }
            }
        });
    };

    return (
        <>
            {!editProduct && !varriants && (
                <div className="p-4">
                    <div className="absolute right-[10px] top-[10px] lg:hidden">
                        <Link to={`/${path.HOME}`}>
                            <AiFillHome size={20} color="white" />
                        </Link>
                    </div>
                    <div ref={refForm} className="flex justify-center font-semibold text-white text-lg py-2 uppercase ">
                        Manage Products
                    </div>
                    <div className="flex justify-end p-5">
                        <input
                            className="form-input w-full md:w-[500px] placeholder:italic placeholder:text-sm"
                            placeholder="Search title and description..."
                            value={valueInput}
                            onChange={e => setValueInput(e.target.value)}
                        />
                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="lg:px-2 lg:py-3 text-center">
                                        #
                                    </th>
                                    <th scope="col" className="lg:px-2 lg:py-3 text-center">
                                        Thumbnail
                                    </th>
                                    <th scope="col" className="lg:px-2 lg:py-3 text-center">
                                        Name Product
                                    </th>
                                    <th scope="col" className="lg:px-2 lg:py-3 text-center">
                                        Brand
                                    </th>
                                    <th scope="col" className="lg:px-2 lg:py-3 text-center">
                                        Category
                                    </th>
                                    <th scope="col" className="lg:px-2 lg:py-3 text-center">
                                        Price
                                    </th>
                                    <th scope="col" className="lg:px-2 lg:py-3 text-center">
                                        Quantity
                                    </th>
                                    <th scope="col" className="lg:px-2 lg:py-3 text-center">
                                        Sold
                                    </th>
                                    <th scope="col" className="lg:px-2 lg:py-3 text-center">
                                        Color
                                    </th>
                                    <th scope="col" className="lg:px-2 lg:py-3 text-center">
                                        Ratings
                                    </th>
                                    <th scope="col" className="lg:px-2 lg:py-3 text-center">
                                        Date Created
                                    </th>
                                    <th scope="col" className="lg:px-2 lg:py-3 text-center">
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
                                        <th scope="row" className="lg:px-3 lg:py-4 text-center">
                                            {(currentPage - 1) * process.env.REACT_APP_PAGE_SIZE + index + 1}
                                        </th>
                                        <td className="lg:px-3 lg:py-4 text-center">
                                            <img
                                                loading="lazy"
                                                className="w-[50px] h-[50px] object-contain"
                                                alt=""
                                                src={product.thumbnail}
                                            />
                                        </td>
                                        <td className="lg:px-3 lg:py-4 text-center ">{product.title}</td>
                                        <td className="lg:px-3 lg:py-4 text-center ">{product.brand}</td>
                                        <td className="lg:px-3 lg:py-4 text-center ">{product.category}</td>
                                        <td className="lg:px-3 lg:py-4 text-center ">{formatMoney(product.price)}</td>
                                        <td className="lg:px-3 lg:py-4 text-center ">{product.quantity}</td>
                                        <td className="lg:px-3 lg:py-4 text-center ">{product.sold}</td>
                                        <td className="lg:px-3 lg:py-4 text-center ">{product.color}</td>
                                        <td className="lg:px-3 lg:py-4 text-center ">{product.totalRatings}</td>
                                        <td className="lg:px-3 lg:py-4 text-center ">
                                            {moment(product.updatedAt).format('DD/MM/YYYY')}
                                        </td>
                                        <td className="lg:px-3 lg:py-4 text-center flex flex-col">
                                            {
                                                <>
                                                    <span
                                                        onClick={() => {
                                                            setEditProduct(product);
                                                        }}
                                                        className="text-blue-500 mb-[10px] cursor-pointer hover:underline"
                                                    >
                                                        Edit
                                                    </span>
                                                    <span
                                                        onClick={() => setVarriants(product)}
                                                        className="text-green-500 mb-[10px]  cursor-pointer hover:underline"
                                                    >
                                                        Varriants
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
            {varriants && (
                <CustomizeVarriants
                    setVarriants={setVarriants}
                    varriants={varriants}
                    setUpdated={setUpdated}
                    updated={updated}
                />
            )}
        </>
    );
};

export default ManageProduct;
