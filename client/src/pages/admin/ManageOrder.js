import React from 'react';
import { Link } from 'react-router-dom';
import path from '../../ultils/path';
import icons from '../../ultils/icons';

const ManageOrder = () => {
    const { AiFillHome } = icons;

    return (
        <div className="p-4">
            <div className="absolute right-[10px] top-[10px] lg:hidden">
                <Link to={`/${path.HOME}`}>
                    <AiFillHome size={20} color="white" />
                </Link>
            </div>
            <div className="flex justify-center font-semibold text-white text-lg py-2 uppercase ">ManageOrder</div>
        </div>
    );
};

export default ManageOrder;
