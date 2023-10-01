import React, { memo, useState } from 'react';
import { formatMoney, renderStars } from '../../ultils/helpers';
import labelnew from '../../assets/new.png';
import labeltrending from '../../assets/trending.png';
import icons from '../../ultils/icons';
import SelectOption from '../home/SelectOption';
import withBaseComponent from 'hocs/withBaseComponent';
import { DetailProduct } from 'pages/public';
import { showModal } from 'store/app/appSlice';

const { AiOutlineHeart, AiOutlineMenu, AiFillEye } = icons;

const Product = ({ data, isLabel, nomal, navigate, dispatch }) => {
    const [isSelectOption, setIsSelectOption] = useState(false);

    const handleClickOptions = (e, options) => {
        e.stopPropagation();
        if (options === 'DETAIL') navigate(`/${data?.category?.toLowerCase()}/${data._id}/${data.title}`);
        if (options === 'WISHLIST') console.log('WISHLIST');
        if (options === 'QUICK_VIEW') {
            dispatch(
                showModal({
                    isShowModal: true,
                    childrenModal: <DetailProduct isShowQuickView category={data?.category} pid={data?._id} />,
                }),
            );
        }
    };

    return (
        <div className="pr-5">
            <div
                onClick={() => {
                    navigate(`/${data?.category?.toLowerCase()}/${data._id}/${data.title}`);
                }}
                className="flex flex-col p-[15px] mb-[20px] border h-[366px] cursor-pointer "
            >
                <div
                    className="w-full relative "
                    onMouseEnter={() => setIsSelectOption(true)}
                    onMouseLeave={() => setIsSelectOption(false)}
                >
                    {isSelectOption && (
                        <div className=" animate-slide-top w-full absolute bottom-0 flex justify-center gap-2">
                            <span onClick={e => handleClickOptions(e, 'WISHLIST')}>
                                <SelectOption icon={<AiOutlineHeart />} />
                            </span>
                            <span onClick={e => handleClickOptions(e, 'DETAIL')}>
                                <SelectOption icon={<AiOutlineMenu />} />
                            </span>
                            <span onClick={e => handleClickOptions(e, 'QUICK_VIEW')}>
                                <SelectOption icon={<AiFillEye />} />
                            </span>
                        </div>
                    )}
                    <img
                        className="h-[243px] object-contain w-full"
                        alt=""
                        src={
                            data?.thumbnail ||
                            'https://orangeheatingsupplies.co.uk/wp-content/uploads/2023/02/image-coming-soon-placeholder.png'
                        }
                    />
                    {!nomal && (
                        <img
                            className="absolute top-0 right-0 w-[70px] h-[25px]"
                            alt=""
                            src={isLabel ? labelnew : labeltrending}
                        />
                    )}
                </div>
                <span className=" flex text-[14px] font-light my-[10px] h-[14px] ">
                    {renderStars(data.totalRatings, 14)?.map((el, index) => (
                        <span key={index}>{el}</span>
                    ))}
                </span>
                <span className="text-[16px] font-light mb-[10px] line-clamp-1 hover:text-main">{data?.title}</span>
                <span className={`text-[16px] font-light`}>{`${formatMoney(data?.price)}`}</span>
            </div>
        </div>
    );
};

export default withBaseComponent(memo(Product));
