import { clsx } from 'clsx';
import React from 'react';
import LoadingSkeleton from './LoadingSkeleton';
import Slider from 'react-slick';
import ProductExtrainfo from '../detailProduct/ProductExtrainfo';

const LoadingDetailProduct = ({ isShowQuickView }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };
    return (
        <div
            className={clsx(
                'sm:flex bg-white gap-2 lg:gap-0 ',
                isShowQuickView && 'rounded-md overflow-hidden gap-6 p-4 max-w-[700px] max-h-[600px] overflow-y-auto',
            )}
        >
            <div className={`${isShowQuickView ? 'w-1/2' : 'sm:w-2/5'} flex flex-col gap-6`}>
                <LoadingSkeleton
                    className={clsx(
                        'w-full lg:w-[448px] h-[448px] border object-contain',
                        isShowQuickView && 'max-w-[310px] h-[320px]',
                    )}
                />
                <div className={clsx(!isShowQuickView && 'w-[320px] lg:w-[458px]', 'w-[320px] mr-[10px]')}>
                    <Slider {...settings}>
                        {new Array(3).fill().map((item, index) => (
                            <div key={index} className="pr-[10px] ">
                                <LoadingSkeleton
                                    className={clsx(
                                        'lg:w-[143px] h-[143px] border object-contain cursor-pointer',
                                        isShowQuickView && 'w-[100px] h-[100px]',
                                    )}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            <div className={`${isShowQuickView ? 'w-1/2' : 'sm:w-2/5'}`}>
                <LoadingSkeleton className={'w-[100px] h-[20px]'} />
                <div className="flex mt-[10px] mb-[20px] items-center  h-[24px]">
                    <LoadingSkeleton className={'w-[100px] h-[20px]'} />
                </div>
                <ul className="mb-[20px]">
                    {new Array(10).fill().map((item, index) => (
                        <LoadingSkeleton className={'w-1/2 h-[20px] mb-[10px]'} />
                    ))}
                </ul>
            </div>
            {!isShowQuickView && (
                <div className="sm:w-1/5 pl-0 lg:pl-[20px]">
                    <ProductExtrainfo />
                </div>
            )}
        </div>
    );
};

export default LoadingDetailProduct;
