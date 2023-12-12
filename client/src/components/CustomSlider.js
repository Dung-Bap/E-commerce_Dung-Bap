import React, { memo, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Product } from './';
import LoadingSkeleton from './loading/LoadingSkeleton';

const CustomSlider = ({ activedTab, products, nomal }) => {
    const [resize, setResize] = useState(3);
    const [deviceSize, changeDeviceSize] = useState(window.innerWidth);

    useEffect(() => {
        const resizeW = () => changeDeviceSize(window.innerWidth);

        window.addEventListener('resize', resizeW); // Update the width on resize

        return () => window.removeEventListener('resize', resizeW);
    });

    useEffect(() => {
        if (deviceSize <= 980) setResize(2);
        if (deviceSize >= 980) setResize(3);
        if (deviceSize <= 768) setResize(1);
    }, [deviceSize]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: resize,
        slidesToScroll: 1,
    };
    return (
        <Slider {...settings} className="md:mr-[-20px] w-full md:w-auto">
            {products?.length === 0 &&
                new Array(10).fill().map((item, index) => (
                    <div className="md:pr-5" key={index}>
                        <div className="flex flex-col p-[15px] mb-[20px] border h-[366px] cursor-pointer">
                            <div className="w-full relative ">
                                <LoadingSkeleton className="h-[243px] w-full " />
                            </div>
                            <LoadingSkeleton className="flex w-[100px] my-[10px] h-[14px] " />
                            <LoadingSkeleton className="w-full h-[20px] mb-[10px] " />
                            <LoadingSkeleton className="w-full h-[20px] mb-[10px] " />
                        </div>
                    </div>
                ))}
            {products?.length > 0 &&
                products?.map(bestSeller => (
                    <Product
                        nomal={nomal}
                        key={bestSeller._id}
                        data={bestSeller}
                        isLabel={activedTab === 1 ? true : false}
                    />
                ))}
        </Slider>
    );
};

export default memo(CustomSlider);
