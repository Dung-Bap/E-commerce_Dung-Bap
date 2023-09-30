import React, { useCallback, useEffect, useState } from 'react';
import Breadcrumb from '../../components/detailProduct/Breadcrumb';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';

import { aipGetProduct } from '../../apis/products';
import { renderStars, formatMoney } from '../../ultils/helpers';
import icons from '../../ultils/icons';
import { Button, ProductExtrainfo, ProductEXtrainfoTabs } from '../../components';
import DOMPurify from 'dompurify';

const DetailProduct = () => {
    const { PiDotDuotone } = icons;

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    const { category, pid } = useParams();
    const [currentImage, setCurrentImage] = useState(null);
    const [dataProducts, setDataProducts] = useState(null);
    const [update, setUpdate] = useState(false);
    const [varriants, setVarriants] = useState(null);
    const [currentProduct, setCurrentProduct] = useState({
        title: '',
        thumbnail: '',
        images: [],
        price: '',
        color: '',
    });

    const fetchDetailProduct = async () => {
        const response = await aipGetProduct(pid);
        if (response.success) {
            setDataProducts(response.productData);
            setCurrentImage(response.productData?.thumbnail || response.productData?.images[0]);
        }
    };

    useEffect(() => {
        if (varriants) {
            setCurrentProduct({
                title: dataProducts?.varriants.find(el => el.sku === varriants)?.title,
                thumbnail: dataProducts?.varriants.find(el => el.sku === varriants)?.thumbnail,
                images: dataProducts?.varriants.find(el => el.sku === varriants)?.images,
                price: dataProducts?.varriants.find(el => el.sku === varriants)?.price,
                color: dataProducts?.varriants.find(el => el.sku === varriants)?.color,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [varriants]);

    useEffect(() => {
        if (pid) fetchDetailProduct();
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, pid]);

    useEffect(() => {
        if (pid) fetchDetailProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [update]);

    const rerender = useCallback(() => {
        setUpdate(!update);
    }, [update]);

    const handleClickImage = (e, image) => {
        e.stopPropagation();
        setCurrentImage(image);
    };

    return (
        <>
            <div className="bg-[#f7f7f7] min-h-[81px] py-[15px] mb-[20px]">
                <h2 className="text-[18px] font-medium mb-10px uppercase">
                    {currentProduct?.title || dataProducts?.title}
                </h2>
                <Breadcrumb title={currentProduct?.title || dataProducts?.title} category={category} />
            </div>
            <div className="flex">
                <div className="w-2/5 flex flex-col gap-6 ">
                    <img className="w-[458px] h-[458px] border object-contain" alt="" src={currentImage} />
                    <div className="w-[458px] mr-[10px]">
                        <Slider {...settings}>
                            {currentProduct?.images?.length === 0 &&
                                dataProducts?.images?.map((image, index) => (
                                    <div key={index} className="pr-[10px] ">
                                        <img
                                            onClick={e => handleClickImage(e, image)}
                                            className="w-[143px] h-[143px] border object-contain cursor-pointer"
                                            alt=""
                                            src={image}
                                        />
                                    </div>
                                ))}
                            {currentProduct?.images?.length > 0 &&
                                currentProduct?.images?.map((image, index) => (
                                    <div key={index} className="pr-[10px] ">
                                        <img
                                            onClick={e => handleClickImage(e, image)}
                                            className="w-[143px] h-[143px] border object-contain cursor-pointer"
                                            alt=""
                                            src={image}
                                        />
                                    </div>
                                ))}
                        </Slider>
                    </div>
                </div>
                <div className="w-2/5 ">
                    <span className={`text-[30px] font-medium`}>{`${formatMoney(
                        currentProduct?.price || dataProducts?.price,
                    )}`}</span>
                    <div className="flex mt-[10px] mb-[20px] items-center  h-[24px]">
                        <div className=" flex text-[14px] font-light ">
                            {renderStars(currentProduct?.totalRatings || dataProducts?.totalRatings, 18)?.map(
                                (el, index) => (
                                    <span key={index}>{el}</span>
                                ),
                            )}
                        </div>
                        <div className="text-[14px] text-main italic ml-[10px]">{`(Sold: ${
                            currentProduct?.sold || dataProducts?.sold
                        })`}</div>
                    </div>
                    <ul className="mb-[20px]">
                        {dataProducts?.description?.length > 1 &&
                            dataProducts?.description?.map((des, index) => (
                                <li className="text-[14px] font-light" key={index}>
                                    <div className="flex items-center">
                                        <span className="pr-[14px]">
                                            <PiDotDuotone />
                                        </span>
                                        {des}
                                    </div>
                                </li>
                            ))}
                        {dataProducts?.description?.length === 1 && (
                            <div
                                className="text-[14px] font-light pr-[14px] line-clamp-[10]"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(dataProducts?.description[0]) }}
                            ></div>
                        )}
                    </ul>
                    <div className="w-full flex gap-4 mb-[20px] cursor-pointer">
                        <span className="text-[14px]">Varriants:</span>
                        <div className="w-full flex flex-wrap justify-between">
                            <div
                                onClick={() => {
                                    setVarriants(null);
                                    setCurrentProduct({
                                        title: dataProducts?.title,
                                        thumbnail: dataProducts?.thumbnail,
                                        images: dataProducts?.images,
                                        price: dataProducts?.price,
                                        color: dataProducts?.color,
                                    });
                                }}
                                className={`flex gap-4 p-3 border w-[200px] mb-[5px] ${!varriants && 'border-main'}`}
                            >
                                <img
                                    alt=""
                                    src={dataProducts?.thumbnail}
                                    className="w-[40px] h-[40px] object-contain"
                                />
                                <div className="flex flex-col">
                                    <span className="text-[14px] line-clamp-1">{dataProducts?.title}</span>
                                    <span className="text-[12px]">{dataProducts?.color}</span>
                                </div>
                            </div>

                            {dataProducts?.varriants?.map(varriant => (
                                <div
                                    onClick={() => setVarriants(varriant.sku)}
                                    key={varriant.sku}
                                    className={`flex gap-4 p-3 border w-[200px] mb-[5px] ${
                                        varriants === varriant.sku && 'border-main'
                                    }`}
                                >
                                    <img alt="" src={varriant.thumbnail} className="w-[40px] h-[40px] object-contain" />
                                    <div className="flex flex-col">
                                        <span className="text-[14px] line-clamp-1">{varriant.title}</span>
                                        <span className="text-[12px]">{varriant.color}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
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
                <ProductEXtrainfoTabs
                    userRating={dataProducts?.ratings}
                    titleProduct={dataProducts?.title}
                    totalRatings={dataProducts?.totalRatings}
                    pid={dataProducts?._id}
                    rerender={rerender}
                />
            </div>
        </>
    );
};

export default DetailProduct;
