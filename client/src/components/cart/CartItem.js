import React, { memo, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import withBaseComponent from '../../hocs/withBaseComponent';
import { formatMoney } from '../../ultils/helpers';
import SelectQuantity from './SelectQuantity';
import { apiDeleteProductInCart } from '../../apis';
import { getCurrent } from '../../store/user/asyncActions';
import { updateCart } from '../../store/user/userSlice';

const CartItem = ({ navigate, dispatch, el, defaultQuantity = 1 }) => {
    const [quantity, setQuantity] = useState(() => defaultQuantity);

    const handleQuantity = value => {
        if (!+value || +value < 1) return;
        else setQuantity(value);
    };

    const handleChangeQuantity = flag => {
        if (flag === 'minus' && quantity === 1) return;
        if (flag === 'minus') setQuantity(prev => +prev - 1);
        if (flag === 'plus') setQuantity(prev => +prev + 1);
    };

    const handleDeleteProductInCart = async (pid, color) => {
        const response = await apiDeleteProductInCart(pid, color);
        dispatch(getCurrent());
        if (response.success) {
            Swal.fire({
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 1000,
            });
            dispatch(getCurrent());
        } else {
            Swal.fire({
                icon: 'error',
                title: response.message,
                showConfirmButton: false,
                timer: 1000,
            });
        }
    };

    useEffect(() => {
        dispatch(updateCart({ pid: el.product._id, quantity, color: el.color }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantity]);
    return (
        <div key={el._id} className="flex gap-4 border rounded-lg mb-[20px] p-2 ">
            <div className="w-[30%] md:w-[20%]">
                <img
                    loading="lazy"
                    onClick={() =>
                        navigate(`/${el.product.category?.toLowerCase()}/${el.product._id}/${el.product.title}`)
                    }
                    className="w-[160px] h-[160px] object-contain select-none cursor-pointer"
                    alt=""
                    src={el.thumbnail}
                />
            </div>
            <div className="w-[70%] flex flex-col md:w-[30%]">
                <span
                    onClick={() =>
                        navigate(`/${el.product.category?.toLowerCase()}/${el.product._id}/${el.product.title}`)
                    }
                    className="line-clamp-1 font-medium capitalize mt-[10px] hover:text-main select-none cursor-pointer "
                >
                    {el.title}
                </span>
                <span className="capitalize font-light text-gray-500 italic">{el?.color}</span>

                <div className="my-[10px] italic font-medium md:text-[18px] select-none sm:hidden">
                    {formatMoney(el.price * quantity)}
                </div>
                <div className="sm:hidden">
                    <div className="py-[10px]">
                        <SelectQuantity
                            quantity={quantity}
                            handleQuantity={handleQuantity}
                            handleChangeQuantity={handleChangeQuantity}
                        />
                    </div>
                    <div
                        onClick={e => {
                            e.stopPropagation();
                            handleDeleteProductInCart(el.product._id, el.color);
                        }}
                        className="text-main text-[14px] mt-[10px] select-none cursor-pointer"
                    >
                        Remove
                    </div>
                </div>
            </div>
            <div className="hidden md:w-[25%] md:block">
                <div className="my-[10px] mx-[20px] italic font-medium md:text-[18px] select-none">
                    {formatMoney(el.price * quantity)}
                </div>
            </div>
            <div className="hidden md:w-[25%] md:block text-center">
                <div className="flex justify-center p-[10px]">
                    <SelectQuantity
                        quantity={quantity}
                        handleQuantity={handleQuantity}
                        handleChangeQuantity={handleChangeQuantity}
                    />
                </div>
                <div
                    onClick={e => {
                        e.stopPropagation();
                        handleDeleteProductInCart(el.product._id, el.color);
                    }}
                    className="text-main text-[14px] mt-[30px] select-none cursor-pointer"
                >
                    Remove
                </div>
            </div>
        </div>
    );
};

export default withBaseComponent(memo(CartItem));
