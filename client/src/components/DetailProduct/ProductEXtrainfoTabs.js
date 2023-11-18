import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { memo } from 'react';
import DOMPurify from 'dompurify';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PiDotDuotone } from 'react-icons/pi';

import { productEXtrainfoTabs } from '../../ultils/contants';
import { Button, CustomSlider } from '..';
import { apiGetProducts, apiRatings } from '../../apis';
import { renderStars } from '../../ultils/helpers';
import { showModal } from '../../store/app/appSlice';
import VoteModal from '../modal/VoteModal';
import path from '../../ultils/path';
import VoteBar from './VoteBar';
import Comment from './Comment';
import withBaseComponent from '../../hocs/withBaseComponent';

const ProductEXtrainfoTabs = ({ titleProduct, totalRatings, pid, userRating, rerender, description, location }) => {
    const { category } = useParams();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(1);
    const productDes = productEXtrainfoTabs.filter(el => el.id === activeTab);
    const [ProductCategories, setProductCategories] = useState(null);
    const { isLoggedIn } = useSelector(state => state.user);
    const navigate = useNavigate();

    const fetchProductCategory = async () => {
        const response = await apiGetProducts({ category });
        if (response.success) setProductCategories(response.products);
    };

    useEffect(() => {
        fetchProductCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleVoteSubmit = async (score, comment) => {
        if (!score || !comment || !pid) {
            alert('Please vote before submitting');
            return;
        }

        await apiRatings({ star: score, comment, pid, updatedAt: Date.now() });
        dispatch(showModal({ isShowModal: false, childrenModal: null }));
        rerender();
    };

    const handleVoteNow = () => {
        if (isLoggedIn) {
            dispatch(
                showModal({
                    isShowModal: true,
                    childrenModal: <VoteModal nameProduct={titleProduct} handleVoteSubmit={handleVoteSubmit} />,
                }),
            );
        } else {
            Swal.fire({
                title: 'Please log in to your account to rate !',
                confirmButtonText: 'Oki',
                showCancelButton: true,
                icon: 'error',
            }).then(rs => {
                if (rs.isConfirmed) {
                    navigate({
                        pathname: `/${path.LOGIN}`,
                        search: createSearchParams({ redirect: location.pathname }).toString(),
                    });
                }
            });
        }
    };
    return (
        <div className="mb-[30px]">
            <div>
                <div className="relative bottom-2 ">
                    {productEXtrainfoTabs.map(el => (
                        <span
                            onClick={() => setActiveTab(el.id)}
                            className={`py-[10px] px-[10px] border border-b-0 cursor-pointer ${
                                activeTab === el.id ? 'bg-[#f1f1f1] ' : 'bg-white'
                            } mr-2 `}
                            key={el.id}
                        >
                            {el.name}
                        </span>
                    ))}
                </div>
                <div className="border p-5">
                    {productDes.map(
                        (el, index) =>
                            el.id === 1 && (
                                <ul key={index} className="mb-[20px]">
                                    {description?.length > 1 &&
                                        description.map((des, index) => (
                                            <li className="text-[14px] font-light" key={index}>
                                                <div className="flex items-center">
                                                    <span className="pr-[14px]">
                                                        <PiDotDuotone />
                                                    </span>
                                                    {des}
                                                </div>
                                            </li>
                                        ))}
                                    {description?.length === 1 && (
                                        <div
                                            className="text-[14px] font-light pr-[14px] "
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description[0]) }}
                                        ></div>
                                    )}
                                </ul>
                            ),
                    )}
                    {productDes.map((el, index) => (
                        <span key={index} className="text-[14px] font-light">
                            {el.des}
                        </span>
                    ))}
                </div>
            </div>
            <div className="mt-[30px]">
                <div className="w-full">
                    <h2 className="mb-[30px]">{`Review and comments ${titleProduct} `}</h2>
                    <div className="text-[14px] w-full font-light flex ">
                        <div className="w-[30%] sm:w-[40%] flex flex-col justify-center items-center border-r-2 border-main mr-10">
                            <span className="text-[24px] font-medium">{`${totalRatings} / 5`}</span>
                            <div className=" flex text-[14px] my-2 font-light ">
                                {renderStars(totalRatings, 18)?.map((el, index) => (
                                    <span key={index}>{el}</span>
                                ))}
                            </div>
                            <span className="hover:text-main">{`${userRating?.length} review`}</span>
                        </div>
                        <div className=" w-[70%] sm:w-[60%] flex flex-col">
                            {Array.from(Array(5).keys())
                                .reverse()
                                .map(el => (
                                    <VoteBar
                                        totalRatings={userRating?.length}
                                        userRating={userRating?.filter(item => item.star === el + 1)?.length}
                                        key={el}
                                        number={el + 1}
                                    />
                                ))}
                        </div>
                    </div>
                    <div className="w-full border-t-2 mt-6 mb-4 border-main flex flex-col items-center justify-center">
                        <span className="py-6">{`How do you rate this product?`}</span>
                        <Button
                            onClick={handleVoteNow}
                            className="text-white bg-main p-2 rounded-md mr-[10px] px-4 py-2 min-w-[88px]"
                        >
                            Vote now !
                        </Button>
                    </div>
                </div>

                {userRating?.map((el, index) => (
                    <Comment
                        key={index}
                        score={el?.star}
                        comment={el?.comment}
                        name={`${el?.postedBy?.firstname} ${el?.postedBy?.lastname}`}
                        time={el?.updatedAt}
                        avatar={el?.postedBy?.avatar}
                    />
                ))}
            </div>
            <div className="w-full mt-[20px]">
                <h2 className="w-full font-semibold text-[20px] py-[15px] border-b-2 border-main mb-[20px]">
                    OTHER CUSTOMERS ALSO BUY:
                </h2>
                <CustomSlider products={ProductCategories} nomal />
            </div>
        </div>
    );
};

export default withBaseComponent(memo(ProductEXtrainfoTabs));
