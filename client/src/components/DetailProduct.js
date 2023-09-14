import React, { useEffect, useState } from 'react';
import Breadcrumb from './Breadcrumb';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';

import { aipGetProduct } from '../apis/getProducts';
import { renderStars, formatMoney } from '../ultils/helpers';
import icons from '../ultils/icons';
import { Button, ProductExtrainfo, ProductEXtrainfoTabs } from '../components';

const DetailProduct = () => {
    const { PiDotDuotone } = icons;

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    const { category, title, pid } = useParams();
    const [dataProducts, setDataProducts] = useState(null);
    // console.log(dataProducts);
    const fetchDetailProduct = async () => {
        const response = await aipGetProduct(pid);
        if (response.success) setDataProducts(response.productData);
    };

    useEffect(() => {
        fetchDetailProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, title, pid]);

    return (
        <>
            <div className="bg-[#f7f7f7] min-h-[81px] py-[15px] mb-[20px]">
                <h2 className="text-[18px] font-medium mb-10px">{title}</h2>
                <Breadcrumb title={title} category={category} />
            </div>
            <div className="flex">
                <div className="w-2/5 flex flex-col gap-6 ">
                    <img
                        className="w-[458px] h-[458px] border object-cover"
                        alt=""
                        src={dataProducts?.images[0] || dataProducts?.thumbnail}
                    />
                    <div className="w-[458px] mr-[10px]">
                        <Slider {...settings}>
                            {dataProducts?.images?.map((image, index) => (
                                <div key={index} className="pr-[10px] ">
                                    <img className="w-[143px] h-[143px] border object-contain" alt="" src={image} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className="w-2/5 ">
                    <span className={`text-[30px] font-medium`}>{`${formatMoney(dataProducts?.price)}`}</span>
                    <div className="flex mt-[10px] mb-[20px] items-center  h-[24px]">
                        <div className=" flex text-[14px] font-light ">
                            {renderStars(dataProducts?.totalRatings, 18)?.map((el, index) => (
                                <span key={index}>{el}</span>
                            ))}
                        </div>
                        <div className="text-[14px] text-main italic ml-[10px]">{`(Sold: ${dataProducts?.sold})`}</div>
                    </div>
                    <ul className="mb-[20px]">
                        {dataProducts?.description?.map((des, index) => (
                            <li className="text-[14px] font-light" key={index}>
                                <div className="flex items-center">
                                    <span className="pr-[14px]">
                                        <PiDotDuotone />
                                    </span>
                                    {des}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Button
                        styles={'w-full text-white bg-main p-2  hover:bg-[#333333] mr-[10px] px-4 py-2 min-w-[88px]'}
                    >
                        ADD TO CART
                    </Button>
                </div>
                <div className="w-1/5 pl-[20px] ">
                    <ProductExtrainfo />
                </div>
            </div>
            <div className="w-full mt-[30px]">
                <ProductEXtrainfoTabs />
            </div>
        </>
    );
};

export default DetailProduct;
