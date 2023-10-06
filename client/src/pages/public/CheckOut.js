import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import withBaseComponent from '../../hocs/withBaseComponent';
import { formatMoney } from '../../ultils/helpers';
import { PayPal } from '../../components';

const CheckOut = ({ navigate }) => {
    const { currentCart } = useSelector(state => state.user);
    console.log(currentCart);
    return (
        <div className="w-full h-full min-h-screen flex justify-center bg-[#f0f0f0]">
            <div className="min-w-[600px]">
                <div className="w-full bg-white py-[10px] rounded-xl overflow-hidden shadow-xl my-[50px] ">
                    {currentCart.map(el => (
                        <div className="w-full flex p-[10px] border-b-2">
                            <div className="w-1/2">
                                <div className="flex ">
                                    <img
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
                    <div className="flex items-center justify-between p-[20px]">
                        <span className="text-main">
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
                    <PayPal amount={120} />
                </div>
            </div>
        </div>
    );
};

export default withBaseComponent(memo(CheckOut));
