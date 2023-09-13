import React, { memo } from 'react';
import Slider from 'react-slick';
import { Product } from './';

const CustomSlider = ({ activedTab, products, nomal }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
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
