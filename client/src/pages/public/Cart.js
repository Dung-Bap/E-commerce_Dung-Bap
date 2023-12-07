import React from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { apiDeleteProductInCart } from '../../apis';
import { Button } from '../../components';
import withBaseComponent from '../../hocs/withBaseComponent';
import { showCart } from '../../store/app/appSlice';
import { getCurrent } from '../../store/user/asyncActions';
import { formatMoney } from '../../ultils/helpers';
import icons from '../../ultils/icons';
import path from '../../ultils/path';

const Cart = ({ dispatch, navigate }) => {
    const { currentCart } = useSelector(state => state.user);
    const { AiOutlineCloseCircle } = icons;

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
    return (
        <div
            onClick={e => e.stopPropagation()}
            className={`bg-gray-800 min-h-screen w-[400px] text-white p-4 grid grid-rows-10 animate-slide-left`}
        >
            <div className="flex justify-between items-center border-b border-blue-50 row-span-1 h-full">
                <span className="text-[18px] uppercase">Your Cart</span>
                <span onClick={() => dispatch(showCart())} className="p-4 cursor-pointer">
                    X
                </span>
            </div>
            {currentCart.length > 0 && (
                <div className="row-span-7 h-full overflow-y-auto overflow-hidden">
                    {currentCart.map(el => (
                        <div
                            key={el._id}
                            className="flex justify-between items-center border border-[#343535] my-3 relative "
                        >
                            <div className="flex gap-4 ">
                                <img
                                    loading="lazy"
                                    className="w-[85px] h-[85px] object-cover"
                                    alt=""
                                    src={el.thumbnail}
                                />
                                <div className="flex flex-col gap-2 max-w-[230px]">
                                    <span className="line-clamp-1 text-[14px]">{el.title}</span>
                                    <span>{formatMoney(el.price)}</span>
                                    <div className="flex items-center text-[14px] text-gray-500">
                                        <span>Quantity: </span>
                                        <span className="ml-[5px]">{el.quantity}</span>
                                    </div>
                                </div>
                                <span
                                    onClick={() => handleDeleteProductInCart(el.product._id, el.color)}
                                    className="absolute top-[10px] right-[10px] hover:text-main cursor-pointer"
                                >
                                    <AiOutlineCloseCircle />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {currentCart.length === 0 && (
                <div className="flex items-center justify-center row-span-7 h-full overflow-y-auto">
                    <span>Your cart is empty, please purchase !</span>
                </div>
            )}
            <div className="row-span-2 h-full pt-6">
                <div className="flex items-center gap-6">
                    <span className="uppercase ">Subtotal : </span>
                    <span>{formatMoney(currentCart.reduce((sum, el) => sum + el.price * el.quantity, 0))}</span>
                </div>
                <span className="flex justify-center text-center text-[14px] text-gray-500 p-2">
                    Shipping, taxes, and discounts calculated at checkout.
                </span>
                <Button
                    onClick={() => {
                        navigate(`/${path.CART_DETAIL}`);
                        dispatch(showCart());
                    }}
                    className={'text-white bg-main p-2 rounded-md mr-[10px] px-4 py-2 w-full'}
                >
                    Shopping Cart
                </Button>
            </div>
        </div>
    );
};

export default withBaseComponent(Cart);
