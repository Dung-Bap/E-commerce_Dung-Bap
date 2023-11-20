import { useSelector } from 'react-redux';
import { Link, createSearchParams } from 'react-router-dom';
import React from 'react';

import { Breadcrumb, Button, CartItem } from '../../components';
import withBaseComponent from '../../hocs/withBaseComponent';
import { formatMoney } from '../../ultils/helpers';
import icons from '../../ultils/icons';
import Swal from 'sweetalert2';
import path from '../../ultils/path';

const CartDetail = ({ location, navigate, dispatch }) => {
    const titleCart = location.pathname.slice(1).split('-').join(' ');
    const { currentCart, userData } = useSelector(state => state.user);
    const { BsArrowRight } = icons;

    const handleCheckout = () => {
        if (!userData?.address) {
            Swal.fire({
                title: 'Please update your address before payment !',
                confirmButtonText: 'Oki',
                showCancelButton: true,
                icon: 'error',
            }).then(rs => {
                if (rs.isConfirmed)
                    navigate({
                        pathname: `/${path.MEMBER}/${path.PERSONAL}`,
                        search: createSearchParams({ redirect: location.pathname }).toString(),
                    });
            });
        } else {
            window.open(`/${path.CHECKOUT}`, '_blank');
        }
    };

    return (
        <>
            <div className="bg-[#f7f7f7] min-h-[81px] py-[15px] mb-[20px] w-full flex justify-center">
                <div className="w-main px-[20px] lg:px-0">
                    <h2 className="text-[18px] font-medium mb-10px capitalize">{titleCart}</h2>
                    <Breadcrumb category={titleCart} />
                </div>
            </div>
            {currentCart.length > 0 && (
                <>
                    <div className="w-full pl-[20px] lg:pl-0 flex justify-center">
                        <div className="w-main text-main text-[18px] font-medium italic">Your cart :</div>
                    </div>
                    <div className="w-full px-[20px] sm:px-0 flex justify-center min-h-screen">
                        <div className="lg:min-w-[960px] ">
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
                                <Button
                                    onClick={handleCheckout}
                                    rightIcon={<BsArrowRight />}
                                    className={
                                        'text-white bg-main p-2 rounded-md m-[10px] px-4 py-2 min-w-[150px] flex items-center justify-between cursor-pointer select-none'
                                    }
                                >
                                    Check out
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {currentCart.length === 0 && (
                <div className="w-full px-[20px] sm:px-0 flex justify-center min-h-screen">
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
