import React, { memo, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

import { Button, InputFileds, Loading } from '../../components';
import { convertToBase64 } from '../../ultils/helpers';
import { apiAddVarriants } from '../../apis';
import { showModal } from '../../store/app/appSlice';

const CustomizeVarriants = ({ varriants, setVarriants, setUpdated, updated }) => {
    const dispatch = useDispatch();
    const [previewImage, setPreviewImage] = useState({
        thumbnail: null,
        images: [],
    });

    const varriantsSchema = yup.object({
        title: yup.string().required('Please enter name product'),
        price: yup.number().required('Please enter price product'),
        color: yup.string().required('Please enter color product'),

        thumbnail: yup.mixed().test('file', 'You need to provide a file', value => {
            if (value.length > 0) {
                return true;
            }
            return false;
        }),
        images: yup.mixed().test('file', 'You need to provide a file', value => {
            if (value.length > 0) {
                return true;
            }
            return false;
        }),
    });

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(varriantsSchema),
    });

    useEffect(() => {
        reset(
            setPreviewImage({
                thumbnail: null,
                images: [],
            }),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [varriants]);

    const handleReviewThumb = async file => {
        const response = await convertToBase64(file);
        setPreviewImage(prev => ({ ...prev, thumbnail: response }));
    };

    const handleReviewImages = async files => {
        const reviewImages = [];
        for (let file of files) {
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                return;
            } else {
                const response = await convertToBase64(file);
                reviewImages.push(response);
            }
        }
        setPreviewImage(prev => ({ ...prev, images: reviewImages }));
    };

    useEffect(() => {
        if (watch('thumbnail')) {
            handleReviewThumb(watch('thumbnail')[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('thumbnail')]);
    useEffect(() => {
        if (watch('images')?.length > 0) handleReviewImages(watch('images'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('images')]);

    const onSubmit = async data => {
        const finalPayload = data;

        finalPayload.thumbnail = data.thumbnail.length === 0 ? previewImage.thumbnail : data.thumbnail[0];
        const formData = new FormData();
        for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
        finalPayload.images = data.images.length === 0 ? previewImage.images : data.images;
        for (let image of finalPayload.images) formData.append('images', image);

        dispatch(showModal({ isShowModal: true, childrenModal: <Loading /> }));
        const response = await apiAddVarriants(formData, varriants._id);
        dispatch(showModal({ isShowModal: false, childrenModal: null }));

        if (response.success) {
            Swal.fire({
                title: 'Congratulation !',
                text: response.message,
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Go Manage Products',
            }).then(result => {
                if (result.isConfirmed) {
                    setVarriants(false);
                    setUpdated(!updated);
                }
            });
        } else Swal.fire('Opps!', response.message, 'error');
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <div className=" font-semibold text-white text-lg py-2 uppercase ">Customize Varriants</div>
                <span onClick={() => setVarriants(false)} className="text-red-500 cursor-pointer hover:underline">
                    Back
                </span>
            </div>
            <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                <InputFileds
                    withFull
                    label={'Name Product'}
                    registername={register('title')}
                    errorName={errors.title?.message}
                    invalidRed
                    defaultValue={varriants.title}
                />
                <div className="flex items-center justify-between mt-4">
                    <div className="flex-1 mr-4">
                        <InputFileds
                            withFull
                            label={'Price Product'}
                            registername={register('price')}
                            errorName={errors.price?.message}
                            invalidRed
                            defaultValue={varriants.price}
                        />
                    </div>
                    <div className="flex-1">
                        <InputFileds
                            withFull
                            label={'Color Product'}
                            registername={register('color')}
                            errorName={errors.color?.message}
                            invalidRed
                            defaultValue={varriants.color}
                        />
                    </div>
                </div>

                <div className="flex justify-between mt-4 items-start">
                    <div className="w-1/2 mr-4">
                        <div className="flex-1 mb-[20px]">
                            <InputFileds
                                label={'Thumbnail Product'}
                                registername={register('thumbnail')}
                                errorName={errors.thumbnail?.message}
                                invalidRed
                                type={'file'}
                                withFull
                            />
                        </div>
                        {previewImage?.thumbnail && (
                            <img
                                loading="lazy"
                                src={previewImage?.thumbnail}
                                alt=""
                                className="w-1/2 h-[200px] object-contain"
                            ></img>
                        )}
                    </div>
                    <div className="w-1/2">
                        <div className="flex-1 mb-[20px]">
                            <InputFileds
                                label={'Images Product'}
                                registername={register('images')}
                                errorName={errors.images?.message}
                                invalidRed
                                type={'file'}
                                multiple
                                withFull
                            />
                        </div>
                        <div className="flex flex-wrap">
                            {previewImage?.images?.map((image, index) => (
                                <img
                                    loading="lazy"
                                    key={index}
                                    src={image}
                                    alt=""
                                    className="w-1/2 h-[200px] mb-[20px] object-contain"
                                ></img>
                            ))}
                        </div>
                    </div>
                </div>

                <Button className="text-white bg-main p-2 rounded-md mr-[10px] px-4 py-2 min-w-[88px] mt-4">
                    Update Varriants
                </Button>
            </form>
        </div>
    );
};

export default memo(CustomizeVarriants);
