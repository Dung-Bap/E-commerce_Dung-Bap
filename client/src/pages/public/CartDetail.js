import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { Breadcrumb } from '../../components';
import SelectQuantity from '../../components/SelectQuantity';
import withBaseComponent from '../../hocs/withBaseComponent';
import { formatMoney } from '../../ultils/helpers';
import icons from '../../ultils/icons';
import { apiDeleteProductInCart } from '../../apis';
import { getCurrent } from '../../store/user/asyncActions';

const CartDetail = ({ location, navigate, dispatch }) => {
    const titleCart = location.pathname.slice(1).split('-').join(' ');
    const { userData } = useSelector(state => state.user);
    const { BsArrowRight } = icons;
    const [quantity, setQuantity] = useState(1);

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
                                <div key={el._id} className="flex border rounded-lg mb-[20px] p-2 ">
                                    <div className="w-[20%]">
                                        <img
                                            onClick={() =>
                                                navigate(
                                                    `/${el.product.category?.toLowerCase()}/${el.product._id}/${
                                                        el.product.title
                                                    }`,
                                                )
                                            }
                                            className="w-[160px] h-[160px] object-cover select-none cursor-pointer"
                                            alt=""
                                            src={el.thumbnail}
                                        />
                                    </div>
                                    <div className="w-[30%]">
                                        <span
                                            onClick={() =>
                                                navigate(
                                                    `/${el.product.category?.toLowerCase()}/${el.product._id}/${
                                                        el.product.title
                                                    }`,
                                                )
                                            }
                                            className="line-clamp-1 font-medium capitalize my-[10px] hover:text-main select-none cursor-pointer "
                                        >
                                            {el.title}
                                        </span>
                                        <span className="capitalize font-light text-gray-500 italic">{el?.color}</span>
                                    </div>
                                    <div className="w-[25%]">
                                        <div className="my-[10px] mx-[20px] italic font-medium text-[18px] select-none">
                                            {formatMoney(el.price)}
                                        </div>
                                    </div>
                                    <div className="w-[25%] text-center">
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
                            ))}
                            <div className="flex flex-col items-end">
                                <div>
                                    <span className="text-main text-[18px] font-medium italic mr-2 select-none">
                                        Suptotal:
                                    </span>
                                    <span className="italic font-medium text-[20px] select-none">
                                        {formatMoney(userData?.cart?.reduce((sum, el) => sum + el.price, 0))}
                                    </span>
                                </div>
                                <span className="text-[14px] text-gray-500 select-none">
                                    Shipping, taxes, and discounts calculated at checkout.
                                </span>
                                <span
                                    to={'/'}
                                    className={
                                        'text-white bg-main p-2 rounded-md m-[10px] px-4 py-2 min-w-[150px] flex items-center justify-between cursor-pointer select-none'
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
