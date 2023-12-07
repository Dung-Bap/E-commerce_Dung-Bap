import React, { memo, useCallback, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { Button, InputFileds, Loading, SelectFileds } from '../../components';
import { MarkDownEditor } from '../../components/inputs/MarkDownEditor';
import { validate, convertToBase64 } from '../../ultils/helpers';
import { apiUpdateProduct } from '../../apis';
import { showModal } from '../../store/app/appSlice';

const UpdateProduct = ({ setEditProduct, editProduct, setUpdated, updated }) => {
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.app);
    const [invalidFields, setInvalidFields] = useState([]);
    const [payload, setPayload] = useState({
        description: '',
    });
    const [previewImage, setPreviewImage] = useState({
        thumbnail: null,
        images: [],
    });

    const updateProductSchema = yup.object({
        title: yup.string().required('Please enter name product'),
        price: yup.number().required('Please enter price product'),
        quantity: yup.number().required('Please enter quantity product'),
        color: yup.string().required('Please enter color product'),
        category: yup.string().required('Please select your use case !'),
        brand: yup.string().required('Please select your use case !'),
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
        resolver: yupResolver(updateProductSchema),
    });

    useEffect(() => {
        reset({
            category: editProduct?.category || '',
            brand: editProduct?.brand?.toLowerCase() || '',
        });
        setPayload({
            description:
                typeof editProduct.description === 'object'
                    ? editProduct.description.join(',')
                    : editProduct.description,
        });
        setPreviewImage({
            thumbnail: editProduct?.thumbnail,
            images: editProduct?.images,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editProduct]);

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
                Swal.fire('Something went wrong', 'Please choose image with type: jpg or png !', 'error');
            } else {
                const response = await convertToBase64(file);
                reviewImages.push(response);
            }
        }
        setPreviewImage(prev => ({ ...prev, images: reviewImages }));
    };

    useEffect(() => {
        if (watch('thumbnail') instanceof FileList && watch('thumbnail').length > 0)
            handleReviewThumb(watch('thumbnail')[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('thumbnail')]);
    useEffect(() => {
        if (watch('images')?.length > 0) handleReviewImages(watch('images'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('images')]);

    const onSubmit = async data => {
        const invalid = validate(payload, setInvalidFields);
        if (invalid === 0) {
            if (data) data.category = categories?.find(category => category.title === data.category)?.title;
            const finalPayload = { ...data, ...payload };
            const formData = new FormData();

            finalPayload.thumbnail = data.thumbnail.length === 0 ? previewImage.thumbnail : data.thumbnail[0];
            finalPayload.images = data.images.length === 0 ? previewImage.images : data.images;
            // check xem data có length thì mới push không formdata sẽ bị duplicate field images á
            for (let image of finalPayload.images) if (finalPayload.images.length > 0) formData.append('images', image);
            delete finalPayload.images;

            for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);

            dispatch(showModal({ isShowModal: true, childrenModal: <Loading /> }));
            const response = await apiUpdateProduct(formData, editProduct._id);
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
                        setEditProduct(false);
                        setUpdated(!updated);
                    }
                });
            } else Swal.fire('Opps!', response.message, 'error');
        }
    };
    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <div className=" font-semibold text-white text-lg py-2 uppercase ">Update Product</div>
                <span onClick={() => setEditProduct(false)} className="text-red-500 cursor-pointer hover:underline">
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
                    defaultValue={editProduct.title}
                />
                <div className="flex items-center justify-between mt-4">
                    <div className="flex-1 mr-4">
                        <InputFileds
                            withFull
                            label={'Price Product'}
                            registername={register('price')}
                            errorName={errors.price?.message}
                            invalidRed
                            defaultValue={editProduct.price}
                        />
                    </div>
                    <div className="flex-1 mr-4">
                        <InputFileds
                            withFull
                            label={'Quantity Product'}
                            registername={register('quantity')}
                            errorName={errors.quantity?.message}
                            invalidRed
                            defaultValue={editProduct.quantity}
                        />
                    </div>
                    <div className="flex-1">
                        <InputFileds
                            withFull
                            label={'Color Product'}
                            registername={register('color')}
                            errorName={errors.color?.message}
                            invalidRed
                            defaultValue={editProduct.color}
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
                            options={categories?.map(category => ({ code: category.title, value: category.title }))}
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
                                ?.find(category => category?.title === watch('category'))
                                ?.brand?.map(el => ({ code: el?.toLowerCase(), value: el }))}
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
                    value={payload.description}
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
                                    className="w-1/2 h-[200px] mb-[20px] object-contain"
                                ></img>
                            ))}
                        </div>
                    </div>
                </div>

                <Button className="text-white bg-main p-2 rounded-md mr-[10px] px-4 py-2 min-w-[88px] mt-4">
                    Update
                </Button>
            </form>
        </div>
    );
};

export default memo(UpdateProduct);
