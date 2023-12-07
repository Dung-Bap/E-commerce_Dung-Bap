import React from 'react';
import { Link } from 'react-router-dom';
import path from '../../ultils/path';

const Banner = () => {
    return (
        <Link to={`/${path.PRODUCTS}`} className="w-full">
            <img
                loading="lazy"
                className="w-full pt-[10px] sm:pt-0 lg:min-h-[480px] object-cover"
                alt="banner"
                src="https://img.freepik.com/free-vector/hand-drawn-black-friday-landing-page-template_23-2149703096.jpg?w=1800&t=st=1695791775~exp=1695792375~hmac=70cde388437e9083db14df1d66c53cb9b08898f64a3494713956951bddc60667"
            />
        </Link>
    );
};

export default Banner;
