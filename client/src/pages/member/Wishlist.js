import React from 'react';
import { Product } from '../../components';
import { useSelector } from 'react-redux';
import Masonry from 'react-masonry-css';

const Wishlist = () => {
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
