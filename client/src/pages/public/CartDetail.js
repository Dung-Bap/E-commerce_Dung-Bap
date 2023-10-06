import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

import { Breadcrumb, CartItem } from '../../components';
import withBaseComponent from '../../hocs/withBaseComponent';
import { formatMoney } from '../../ultils/helpers';
import icons from '../../ultils/icons';
import path from '../../ultils/path';

const CartDetail = ({ location, dispatch }) => {
    const titleCart = location.pathname.slice(1).split('-').join(' ');
    const { currentCart } = useSelector(state => state.user);
    const { BsArrowRight } = icons;

    return (
        <>
            <div className="bg-[#f7f7f7] min-h-[81px] py-[15px] mb-[20px] w-full flex justify-center">
                <div className="w-main">
                    <h2 className="text-[18px] font-medium mb-10px capitalize">{titleCart}</h2>
                    <Breadcrumb category={titleCart} />
                </div>
            </div>
            {currentCart.length > 0 && (
                <>
                    <div className="w-full flex justify-center">
                        <div className="w-main text-main text-[18px] font-medium italic">Your cart :</div>
                    </div>
                    <div className="w-full flex justify-center min-h-[500px]">
                        <div className="min-w-[960px] ">
                            {currentCart.map(el => (
                                <CartItem key={el._id} el={el} defaultQuantity={el.quantity} />
                            ))}
                            <div className="flex flex-col items-end">
                                <div>
                                    <span className="text-main text-[18px] font-medium italic mr-2 select-none">
                                        Suptotal:
                                    </span>
                                    <span className="italic font-medium text-[20px] select-none">
                                        {formatMoney(currentCart.reduce((sum, el) => sum + el.price * el.quantity, 0))}
                                    </span>
                                </div>
                                <span className="text-[14px] text-gray-500 select-none">
                                    Shipping, taxes, and discounts calculated at checkout.
                                </span>
                                <Link
                                    target="_blank"
                                    to={`/${path.CHECKOUT}`}
                                    className={
                                        'text-white bg-main p-2 rounded-md m-[10px] px-4 py-2 min-w-[150px] flex items-center justify-between cursor-pointer select-none'
                                    }
                                >
                                    Check out
                                    <span>
                                        <BsArrowRight />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {currentCart.length === 0 && (
                <div className="w-full flex justify-center min-h-[500px]">
                    <div className="w-main flex flex-col justify-center items-center">
                        <span className="text-main text-[18px] font-medium italic py-[20px]">
                            Your cart is empty, please purchase !
                        </span>

                        <Link to={'/'} className={'text-white bg-main p-2 rounded-md mr-[10px] px-4 py-2 min-w-[88px]'}>
                            Go Home ?
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default withBaseComponent(CartDetail);
