import React, { useCallback, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Button, InputFileds, Loading, SelectFileds } from '../../components';
import { MarkDownEditor } from '../../components/inputs/MarkDownEditor';
import { validate, convertToBase64 } from '../../ultils/helpers';
import { apiCreateProducts } from '../../apis';
import { showModal } from '../../store/app/appSlice';
import path from '../../ultils/path';
import icons from '../../ultils/icons';

const CreateProducts = () => {
    const { AiFillHome } = icons;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categories } = useSelector(state => state.app);
    const [invalidFields, setInvalidFields] = useState([]);
    const [payload, setPayload] = useState({
        description: '',
    });
    const [previewImage, setPreviewImage] = useState({
        thumbnail: null,
        images: [],
    });

    const createProductsSchema = yup.object({
        title: yup.string().required('Please enter name product'),
        price: yup.number().required('Please enter price product'),
        quantity: yup.number().required('Please enter quantity product'),
        color: yup.string().required('Please enter color product'),

        category: yup.string().required('Please select your use case !'),
        brand: yup.string().required('Please select your use case !'),

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
        setValue,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(createProductsSchema),
    });

    const changeValue = useCallback(e => {
        setPayload(e);
    }, []);

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
        handleReviewThumb(watch('thumbnail')[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('thumbnail')]);
    useEffect(() => {
        handleReviewImages(watch('images'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('images')]);

    const onSubmit = async data => {
        const invalid = validate(payload, setInvalidFields);
        if (invalid === 0) {
            if (data) data.category = categories?.find(category => category._id === data.category)?.title;
            const finalPayload = { ...data, ...payload };
            const formData = new FormData();
            for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
            if (finalPayload.thumbnail) formData.append('thumbnail', finalPayload.thumbnail[0]);
            if (finalPayload.images) {
                for (let image of finalPayload.images) formData.append('images', image);
            }
            dispatch(showModal({ isShowModal: true, childrenModal: <Loading /> }));
            const response = await apiCreateProducts(formData);
            dispatch(showModal({ isShowModal: false, childrenModal: null }));
            if (response.success) {
                Swal.fire({
                    title: 'Congratulation !',
                    text: response.message,
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Go Home',
                }).then(result => {
                    if (result.isConfirmed) {
                        navigate(`/${path.HOME}`);
                    }
                });
            } else Swal.fire('Opps!', response.message, 'error');
        }
        reset();
    };
    return (
        <div className="p-4">
            <div className="absolute right-[10px] top-[10px] lg:hidden">
                <Link to={`/${path.HOME}`}>
                    <AiFillHome size={20} color="white" />
                </Link>
            </div>
            <div className="flex justify-center font-semibold text-white text-lg py-2 uppercase ">Create Products</div>
            <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                <InputFileds
                    withFull
                    label={'Name Product'}
                    registername={register('title')}
                    errorName={errors.title?.message}
                    placeholder={'Name product'}
                    invalidRed
                />
                <div className="flex items-center justify-between mt-4">
                    <div className="flex-1 mr-4">
                        <InputFileds
                            withFull
                            label={'Price Product'}
                            registername={register('price')}
                            errorName={errors.price?.message}
                            placeholder={'Price'}
                            invalidRed
                        />
                    </div>
                    <div className="flex-1 mr-4">
                        <InputFileds
                            withFull
                            label={'Quantity Product'}
                            registername={register('quantity')}
                            errorName={errors.quantity?.message}
                            placeholder={'Quantity'}
                            invalidRed
                        />
                    </div>
                    <div className="flex-1">
                        <InputFileds
                            withFull
                            label={'Color Product'}
                            registername={register('color')}
                            errorName={errors.color?.message}
                            placeholder={'Color'}
                            invalidRed
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex-1 mr-4">
                        <SelectFileds
                            label={'Category'}
                            registername={register('category')}
                            errorName={errors.category?.message}
                            onChange={e => setValue('category', e.target.value, { shouldValidate: true })}
                            withFull
                            options={categories?.map(category => ({ code: category._id, value: category.title }))}
                            invalidRed
                        />
                    </div>
                    <div className="flex-1">
                        <SelectFileds
                            label={'Brand (Options)'}
                            registername={register('brand')}
                            errorName={errors.brand?.message}
                            onChange={e => setValue('brand', e.target.value, { shouldValidate: true })}
                            withFull
                            options={categories
                                ?.find(category => category._id === watch('category'))
                                ?.brand?.map(el => ({ code: el, value: el }))}
                            invalidRed
                        />
                    </div>
                </div>
                <MarkDownEditor
                    label={'Description'}
                    name={'description'}
                    changeValue={changeValue}
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                />
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
                                    className="w-1/2 h-[200px] object-contain"
                                ></img>
                            ))}
                        </div>
                    </div>
                </div>

                <Button className="text-white bg-main p-2 rounded-md mr-[10px] px-4 py-2 min-w-[88px] mt-4">
                    Create New Product
                </Button>
            </form>
        </div>
    );
};

export default CreateProducts;
