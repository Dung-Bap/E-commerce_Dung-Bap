import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import Breadcrumb from '../../components/detailProduct/Breadcrumb';
import Slider from 'react-slick';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { createSearchParams, useParams } from 'react-router-dom';
import clsx from 'clsx';
import DOMPurify from 'dompurify';

import { aipGetProduct } from '../../apis/products';
import { renderStars, formatMoney } from '../../ultils/helpers';
import icons from '../../ultils/icons';
import { Button, ProductExtrainfo, ProductEXtrainfoTabs, SelectQuantity } from '../../components';
import withBaseComponent from '../../hocs/withBaseComponent';
import path from '../../ultils/path';
import { apiUpdateCart } from '../../apis';
import { getCurrent } from '../../store/user/asyncActions';

const DetailProduct = ({ isShowQuickView, category, pid, navigate, dispatch, location }) => {
    const { PiDotDuotone } = icons;
    const params = useParams();
    const { userData } = useSelector(state => state.user);
    const titleRef = useRef();

    // Select quantity
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

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

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
        _id: '',
    });

    const fetchDetailProduct = async () => {
        const response = await aipGetProduct(params?.pid || pid);
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
                _id: dataProducts?.varriants.find(el => el.sku === varriants)?._id,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [varriants]);

    useEffect(() => {
        if (params.pid || pid) fetchDetailProduct();
        if (!isShowQuickView)
            titleRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, pid, params.pid, update]);

    useEffect(() => {
        if (params.pid || pid) fetchDetailProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [update]);

    const rerender = useCallback(() => {
        setUpdate(!update);
    }, [update]);

    const handleClickImage = (e, image) => {
        e.stopPropagation();
        setCurrentImage(image);
    };

    const handleAddToCart = async () => {
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
            pid: params?.pid || pid,
            color: currentProduct?.color || dataProducts.color,
            price: currentProduct?.price || dataProducts.price,
            thumbnail: currentProduct?.thumbnail || dataProducts.thumbnail,
            title: currentProduct?.title || dataProducts.title,
            quantity,
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
    };
    return (
        <>
            {!isShowQuickView && (
                <div className="bg-[#f7f7f7] min-h-[81px] py-[15px] mb-[20px] w-full flex justify-center">
                    <div ref={titleRef} className="w-main px-[20px] lg:px-0">
                        <h2 className="text-[18px] font-medium mb-10px uppercase">
                            {currentProduct?.title || dataProducts?.title}
                        </h2>
                        <Breadcrumb
                            title={currentProduct?.title || dataProducts?.title}
                            category={params.category || category}
                        />
                    </div>
                </div>
            )}
            <div className="w-full flex justify-center">
                <div
                    className={`w-full px-[10px] sm:px-[20px] lg:px-0 ${
                        isShowQuickView ? 'flex justify-center' : 'lg:w-main'
                    }`}
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        className={clsx(
                            'sm:flex bg-white gap-2 lg:gap-0 ',
                            isShowQuickView &&
                                'rounded-md overflow-hidden gap-6 p-4 max-w-[700px] max-h-[600px] overflow-y-auto',
                        )}
                    >
                        <div className={`${isShowQuickView ? 'w-1/2' : 'sm:w-2/5'} flex flex-col gap-6`}>
                            <img
                                loading="lazy"
                                className={clsx(
                                    'w-[448px] h-[448px] border object-contain',
                                    isShowQuickView && 'max-w-[310px] h-[320px]',
                                )}
                                alt=""
                                src={currentImage}
                            />
                            <div className={clsx(!isShowQuickView && 'w-[320px] lg:w-[458px]', 'w-[320px] mr-[10px]')}>
                                <Slider {...settings}>
                                    {currentProduct?.images?.length === 0 &&
                                        dataProducts?.images?.map((image, index) => (
                                            <div key={index} className="pr-[10px] ">
                                                <img
                                                    loading="lazy"
                                                    onClick={e => {
                                                        handleClickImage(e, image);
                                                    }}
                                                    className={clsx(
                                                        'w-[143px] h-[143px] border object-contain cursor-pointer',
                                                        isShowQuickView && 'w-[100px] h-[100px]',
                                                    )}
                                                    alt=""
                                                    src={image}
                                                />
                                            </div>
                                        ))}
                                    {currentProduct?.images?.length > 0 &&
                                        currentProduct?.images?.map((image, index) => (
                                            <div key={index} className="pr-[10px] ">
                                                <img
                                                    loading="lazy"
                                                    onClick={e => {
                                                        handleClickImage(e, image);
                                                    }}
                                                    className={clsx(
                                                        !isShowQuickView && 'w-[143px] h-[143px]',
                                                        'w-[100px] h-[100px] border object-contain cursor-pointer',
                                                    )}
                                                    alt=""
                                                    src={image}
                                                />
                                            </div>
                                        ))}
                                </Slider>
                            </div>
                        </div>
                        <div className={`${isShowQuickView ? 'w-1/2' : 'sm:w-2/5'}`}>
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
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(dataProducts?.description[0]),
                                        }}
                                    ></div>
                                )}
                            </ul>
                            <div className="w-full flex gap-4 mb-[20px] cursor-pointer">
                                <div className="w-full flex flex-wrap justify-between">
                                    <div
                                        onClick={() => {
                                            setVarriants(null);
                                            setCurrentImage(dataProducts?.thumbnail);
                                            setCurrentProduct({
                                                title: dataProducts?.title,
                                                thumbnail: dataProducts?.thumbnail,
                                                images: dataProducts?.images,
                                                price: dataProducts?.price,
                                                color: dataProducts?.color,
                                            });
                                            setUpdate(!update);
                                        }}
                                        className={`flex p-3 border w-[240px] mb-[5px] ${!varriants && 'border-main'}`}
                                    >
                                        <img
                                            loading="lazy"
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
                                            onClick={() => {
                                                setVarriants(varriant.sku);
                                                setCurrentImage(varriant.thumbnail);
                                                setUpdate(!update);
                                            }}
                                            key={varriant.sku}
                                            className={`flex p-3 border w-[240px] mb-[5px] ${
                                                varriants === varriant.sku && 'border-main'
                                            }`}
                                        >
                                            <img
                                                loading="lazy"
                                                alt=""
                                                src={varriant.thumbnail}
                                                className="w-[40px] h-[40px] object-contain"
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-[14px] line-clamp-1">{varriant.title}</span>
                                                <span className="text-[12px]">{varriant.color}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center mb-[20px] text-[14px]">
                                <span className="mr-[20px]">Quantity:</span>
                                <SelectQuantity
                                    handleQuantity={handleQuantity}
                                    handleChangeQuantity={handleChangeQuantity}
                                    quantity={quantity}
                                />
                            </div>
                            <Button
                                onClick={handleAddToCart}
                                styles={
                                    'mb-[20px] sm:mb-[0] w-full text-white bg-main p-2  hover:bg-[#333333] mr-[10px] px-4 py-2 min-w-[88px] select-none'
                                }
                            >
                                ADD TO CART
                            </Button>
                        </div>
                        {!isShowQuickView && (
                            <div className="sm:w-1/5 pl-0 lg:pl-[20px]">
                                <ProductExtrainfo />
                            </div>
                        )}
                    </div>
                    {!isShowQuickView && (
                        <div className="w-full mt-[30px]">
                            <ProductEXtrainfoTabs
                                userRating={dataProducts?.ratings}
                                titleProduct={dataProducts?.title}
                                totalRatings={dataProducts?.totalRatings}
                                pid={dataProducts?._id}
                                rerender={rerender}
                                description={dataProducts?.description}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default withBaseComponent(memo(DetailProduct));
