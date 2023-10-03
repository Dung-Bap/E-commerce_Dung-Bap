import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

import { Breadcrumb } from 'components';
import withBaseComponent from 'hocs/withBaseComponent';
import { formatMoney } from 'ultils/helpers';
import icons from 'ultils/icons';

const CartDetail = ({ location, navigate }) => {
    const titleCart = location.pathname.slice(1).split('-').join(' ');
    const { userData } = useSelector(state => state.user);
    const { BsArrowRight } = icons;

    return (
        <>
            <div className="bg-[#f7f7f7] min-h-[81px] py-[15px] mb-[20px] w-full flex justify-center">
                <div className="w-main">
                    <h2 className="text-[18px] font-medium mb-10px capitalize">{titleCart}</h2>
                    <Breadcrumb category={titleCart} />
                </div>
            </div>
            {userData?.cart?.length > 0 && (
                <>
                    <div className="w-full flex justify-center">
                        <div className="w-main text-main text-[18px] font-medium italic">Your cart :</div>
                    </div>
                    <div className="w-full flex justify-center min-h-[500px]">
                        <div className="min-w-[960px] ">
                            {userData?.cart?.map(el => (
                                <div
                                    onClick={() =>
                                        navigate(
                                            `/${el?.product?.category?.toLowerCase()}/${el?.product?._id}/${
                                                el?.product?.title
                                            }`,
                                        )
                                    }
                                    key={el.product._id}
                                    className="flex border rounded-lg mb-[20px] p-2 cursor-pointer"
                                >
                                    <div className="w-[20%]">
                                        <img
                                            className="w-[160px] h-[160px] object-cover"
                                            alt=""
                                            src={el.product.thumbnail}
                                        />
                                    </div>
                                    <div className="w-[30%]">
                                        <span className="line-clamp-1 font-medium capitalize my-[10px] hover:text-main ">
                                            {el.product.title}
                                        </span>
                                        <span className="capitalize font-light text-gray-500 italic">{el.color}</span>
                                    </div>
                                    <div className="w-[25%]">
                                        <div className="my-[10px] mx-[20px] italic font-medium text-[18px]">
                                            {formatMoney(el.product.price)}
                                        </div>
                                    </div>
                                    <div className="w-[25%]">4</div>
                                </div>
                            ))}
                            <div className="flex flex-col items-end">
                                <div>
                                    <span className="text-main text-[18px] font-medium italic mr-2">Suptotal:</span>
                                    <span className="italic font-medium text-[20px]">
                                        {formatMoney(userData?.cart?.reduce((sum, el) => sum + el.product.price, 0))}
                                    </span>
                                </div>
                                <span className="text-[14px] text-gray-500">
                                    Shipping, taxes, and discounts calculated at checkout.
                                </span>
                                <span
                                    to={'/'}
                                    className={
                                        'text-white bg-main p-2 rounded-md m-[10px] px-4 py-2 min-w-[150px] flex items-center justify-between cursor-pointer'
                                    }
                                >
                                    Check out
                                    <span>
                                        <BsArrowRight />
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {userData?.cart?.length === 0 && (
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
