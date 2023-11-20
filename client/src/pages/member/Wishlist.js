import React from 'react';
import { Product } from '../../components';
import { useSelector } from 'react-redux';
import Masonry from 'react-masonry-css';
import { Link } from 'react-router-dom';
import path from '../../ultils/path';
import icons from '../../ultils/icons';

const Wishlist = () => {
    const { AiFillHome } = icons;
    const { userData } = useSelector(state => state.user);
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
    };

    return (
        <div className="w-full p-4 ">
            <div className="p-4">
                <div className="absolute right-[10px] top-[10px] lg:hidden">
                    <Link to={`/${path.HOME}`}>
                        <AiFillHome size={20} color="white" />
                    </Link>
                </div>
                <div className="flex justify-center font-semibold text-white text-lg py-2 uppercase ">My WishList</div>
            </div>
            {userData?.wishlist?.length === 0 && (
                <span className="flex justify-center text-white">There are no favorite products yet !!!</span>
            )}
            <div>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {userData?.wishlist?.map(product => (
                        <Product nomal={true} key={product._id} data={product} textWhite />
                    ))}
                </Masonry>
            </div>
        </div>
    );
};

export default Wishlist;
