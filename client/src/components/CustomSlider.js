import React, { memo, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Product } from './';

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
        <>
            {products && (
                <Slider {...settings} className="mr-[-20px]">
                    {products?.map(bestSeller => (
                        <Product
                            nomal={nomal}
                            key={bestSeller._id}
                            data={bestSeller}
                            isLabel={activedTab === 1 ? true : false}
                        />
                    ))}
                </Slider>
            )}
        </>
    );
};

export default memo(CustomSlider);
