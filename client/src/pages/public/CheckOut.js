import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import withBaseComponent from '../../hocs/withBaseComponent';
import { formatMoney } from '../../ultils/helpers';
import { Congratulation, PayPal } from '../../components';
import { getCurrent } from '../../store/user/asyncActions';

const CheckOut = ({ navigate, dispatch }) => {
    const { currentCart, userData } = useSelector(state => state.user);
    const [isSuccess, setIsSuccess] = useState(false);
    useEffect(() => {
        dispatch(getCurrent());
    }, [dispatch, isSuccess]);
    return (
        <div className="w-full h-full min-h-screen flex justify-center bg-[#f0f0f0]">
            {isSuccess && <Congratulation />}
            <div className="w-full px-[20px] sm:px-0 sm:w-[600px]">
                <div className="w-full bg-white py-[10px] rounded-xl overflow-hidden shadow-xl my-[50px] ">
                    {currentCart.map(el => (
                        <div key={el.product._id} className="w-full flex p-[10px] border-b-2">
                            <div className="w-1/2">
                                <div className="flex ">
                                    <img
                                        loading="lazy"
                                        onClick={() =>
                                            navigate(
                                                `/${el.product.category?.toLowerCase()}/${el.product._id}/${
                                                    el.product.title
                                                }`,
                                            )
                                        }
                                        className="w-[80px] h-[80px] object-cover mr-[30px] cursor-pointer"
                                        alt=""
                                        src={el.thumbnail}
                                    />
                                    <div className="flex flex-col ">
                                        <span
                                            className="line-clamp-1 font-medium capitalize mt-[5px] hover:text-main select-none cursor-pointer "
                                            onClick={() =>
                                                navigate(
                                                    `/${el.product.category?.toLowerCase()}/${el.product._id}/${
                                                        el.product.title
                                                    }`,
                                                )
                                            }
                                        >
                                            {el.title}
                                        </span>
                                        <span className="capitalize font-light text-gray-500 italic">{el.color}</span>
                                        <div className="flex items-center text-[14px] text-gray-500">
                                            <span>Quantity: </span>
                                            <span className="ml-[5px]">{el.quantity}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2 text-right">
                                <span className="text-[15px] font-medium italic">
                                    {formatMoney(el.price * el.quantity)}
                                </span>
                            </div>
                        </div>
                    ))}
                    <div className="flex items-center justify-between px-[20px] py-[10px]">
                        <span className="text-main font-semibold">
                            Subtotal:
                            <span className="m-[10px]">{`${currentCart.reduce(
                                (sum, el) => sum + el.quantity,
                                0,
                            )} items`}</span>
                        </span>
                        <span className="text-[16px] font-medium italic">
                            {formatMoney(currentCart.reduce((sum, el) => sum + el.price * el.quantity, 0))}
                        </span>
                    </div>
                    <div className="flex items-center justify-between px-[20px] pb-[10px]">
                        <span className="font-semibold italic">
                            Address:
                            <span className="m-[10px]">{userData?.address}</span>
                        </span>
                    </div>
                    <div className="flex items-center justify-between px-[20px] pb-[10px]">
                        <span className="font-semibold italic">
                            Phone Number:
                            <span className="m-[10px]">{userData?.phone}</span>
                        </span>
                    </div>
                    <PayPal
                        payload={{
                            products: currentCart,
                            total: Math.round(
                                +currentCart.reduce((sum, el) => sum + el.price * el.quantity, 0) / 23500,
                            ),
                            address: userData?.address,
                            phone: userData?.phone,
                        }}
                        setIsSuccess={setIsSuccess}
                        amount={Math.round(+currentCart.reduce((sum, el) => sum + el.price * el.quantity, 0) / 23500)}
                    />
                </div>
            </div>
        </div>
    );
};

export default withBaseComponent(memo(CheckOut));
