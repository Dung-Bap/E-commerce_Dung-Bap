import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Tippy from '@tippyjs/react';
import { createSearchParams } from 'react-router-dom';

import { formatMoney, renderStars } from '../../ultils/helpers';
import labelnew from '../../assets/new.png';
import labeltrending from '../../assets/trending.png';
import icons from '../../ultils/icons';
import withBaseComponent from '../../hocs/withBaseComponent';
import { DetailProduct } from '../../pages/public';
import { showModal } from '../../store/app/appSlice';
import { apiUpdateCart, apiUpdateWishlist } from '../../apis';
import path from '../../ultils/path';
import { getCurrent } from '../../store/user/asyncActions';
import SelectOption from '../SelectOption';
import clsx from 'clsx';
import LoadingSkeleton from '../loading/LoadingSkeleton';

const { AiOutlineHeart, FaOpencart, AiFillEye, AiFillHeart } = icons;
const Product = ({ data, isLabel, nomal, navigate, dispatch, location, textWhite }) => {
    const [isSelectOption, setIsSelectOption] = useState(false);
    const { userData } = useSelector(state => state.user);
    const handleClickOptions = async (e, options, pid) => {
        e.stopPropagation();
        if (options === 'CART') {
            if (!userData)
                return Swal.fire({
                    title: 'Please log in first !',
                    confirmButtonText: 'Oki',
                    showCancelButton: true,
                    icon: 'error',
                }).then(rs => {
                    if (rs.isConfirmed)
                        navigate({
                            pathname: `/${path.LOGIN}`,
                            search: createSearchParams({ redirect: location.pathname }).toString(),
                        });
                });
            const response = await apiUpdateCart({
                pid: data._id,
                color: data.color,
                price: data.price,
                thumbnail: data.thumbnail,
                title: data.title,
                quantity: 1,
            });
            dispatch(getCurrent());
            if (response.success) {
                Swal.fire({
                    title: 'Add to cart successfully !',
                    text: `Move to shopping cart ?`,
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Oki',
                }).then(async result => {
                    if (result.isConfirmed) {
                        navigate(`/${path.CART_DETAIL}`);
                        dispatch(getCurrent());
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1000,
                });
            }
        }
        if (options === 'WISHLIST') {
            const response = await apiUpdateWishlist(pid);
            dispatch(getCurrent());
            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1000,
                });
            }
        }

        if (options === 'QUICK_VIEW') {
            dispatch(
                showModal({
                    isShowModal: true,
                    childrenModal: (
                        <DetailProduct isShowQuickView category={data?.category} pid={data?._id} color={data?.color} />
                    ),
                }),
            );
        }
    };

    return !data ? (
        <div className="pr-5">
            <div className="flex flex-col p-[15px] mb-[20px] border h-[366px] cursor-pointer">
                <div className="w-full relative ">
                    <LoadingSkeleton className="h-[243px] w-full " />
                </div>
                <LoadingSkeleton className="flex w-[100px] my-[10px] h-[14px] " />
                <LoadingSkeleton className="w-full h-[20px] mb-[10px] ">{data?.title}</LoadingSkeleton>
                <LoadingSkeleton className="w-full h-[20px] mb-[10px] ">{data?.title}</LoadingSkeleton>
            </div>
        </div>
    ) : (
        <div className="pr-5">
            <div
                onClick={() => {
                    navigate(`/${data?.category?.toLowerCase()}/${data?._id}/${data.title}`);
                }}
                className="flex flex-col p-[15px] mb-[20px] border h-[366px] cursor-pointer"
            >
                <div
                    className="w-full relative "
                    onMouseEnter={() => setIsSelectOption(true)}
                    onMouseLeave={() => setIsSelectOption(false)}
                >
                    {isSelectOption && (
                        <div className=" animate-slide-top w-full absolute bottom-0 flex justify-center gap-2">
                            {userData?.wishlist.some(el => el?._id === data?._id) ? (
                                <Tippy content="Add wishlist" placement="bottom">
                                    <span onClick={e => handleClickOptions(e, 'WISHLIST', data?._id)}>
                                        <SelectOption border icon={<AiFillHeart color="red" />} />
                                    </span>
                                </Tippy>
                            ) : (
                                <Tippy content="Add wishlist" placement="bottom">
                                    <span onClick={e => handleClickOptions(e, 'WISHLIST', data?._id)}>
                                        <SelectOption icon={<AiOutlineHeart />} />
                                    </span>
                                </Tippy>
                            )}
                            {userData?.cart.some(el => el.product?._id === data?._id) ? (
                                <Tippy content="Add Cart" placement="bottom">
                                    <span onClick={e => e.stopPropagation()}>
                                        <SelectOption border icon={<FaOpencart color="red" />} />
                                    </span>
                                </Tippy>
                            ) : (
                                <Tippy content="Add Cart" placement="bottom">
                                    <span onClick={e => handleClickOptions(e, 'CART')}>
                                        <SelectOption icon={<FaOpencart />} />
                                    </span>
                                </Tippy>
                            )}
                            <Tippy content="Quick View" placement="bottom">
                                <span onClick={e => handleClickOptions(e, 'QUICK_VIEW')}>
                                    <SelectOption icon={<AiFillEye />} />
                                </span>
                            </Tippy>
                        </div>
                    )}
                    <img
                        loading="lazy"
                        className="h-[243px] object-contain w-full"
                        alt=""
                        src={
                            data?.thumbnail ||
                            'https://orangeheatingsupplies.co.uk/wp-content/uploads/2023/02/image-coming-soon-placeholder.png'
                        }
                    />
                    {!nomal && (
                        <img
                            loading="lazy"
                            className="absolute top-0 right-0 w-[70px] h-[25px]"
                            alt=""
                            src={isLabel ? labelnew : labeltrending}
                        />
                    )}
                </div>
                <span className=" flex text-[14px] font-light my-[10px] h-[14px] ">
                    {renderStars(data?.totalRatings, 14)?.map((el, index) => (
                        <span key={index}>{el}</span>
                    ))}
                </span>
                <span
                    className={clsx(
                        textWhite && 'text-white',
                        'text-[16px] font-light mb-[10px] line-clamp-1 hover:text-main',
                    )}
                >
                    {data?.title}
                </span>
                <span className={clsx(textWhite && 'text-white', `text-[16px] font-light`)}>{`${formatMoney(
                    data?.price,
                )}`}</span>
            </div>
        </div>
    );
};

export default withBaseComponent(memo(Product));
