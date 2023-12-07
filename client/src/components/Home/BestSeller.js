import React, { useEffect, useState } from 'react';
import { apiGetProducts } from '../../apis/products';
import { CustomSlider } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../store/products/asyncActions';
import { Link } from 'react-router-dom';

const BestSeller = () => {
    const dispath = useDispatch();
    const { newArrivals } = useSelector(state => state.products);
    const tabs = [
        {
            id: 1,
            name: 'Best Seller',
            border: 'border-r',
        },
        {
            id: 2,
            name: 'New Arrivals',
        },
    ];

    const [bestSellers, setBestSellers] = useState([]);
    const [products, setProducts] = useState([]);
    const [activedTab, setActivedTab] = useState(1);

    const getAllProducts = async () => {
        const response = await apiGetProducts({ sort: '-sold', limit: 10 });
        if (response?.success) setBestSellers(response?.products);
    };

    useEffect(() => {
        getAllProducts();
        dispath(getProducts());
    }, [dispath]);

    useEffect(() => {
        if (activedTab === 1) setProducts(bestSellers);
        if (activedTab === 2) setProducts(newArrivals);
    }, [activedTab, bestSellers, newArrivals]);
    return (
        <div>
            <div className="flex text-center text-[20px] text-[#808080] font-medium uppercase border-b-2 border-main pb-[15px] mb-5 mt-[30px]">
                {tabs.map(tab => (
                    <span
                        key={tab.id}
                        onClick={() => setActivedTab(tab.id)}
                        className={` ${tab.border} mr-5 pr-5 cursor-pointer ${
                            activedTab === tab.id ? 'text-black' : ''
                        } `}
                    >
                        {tab.name}
                    </span>
                ))}
            </div>
            <div>
                <CustomSlider products={products} activedTab={activedTab} />
            </div>
            <div className="w-full sm:flex gap-5 ">
                <Link to={`/laptop`}>
                    <img
                        loading="lazy"
                        className="flex-1 cursor-pointer mb-[10px] sm:mb-0"
                        alt=""
                        src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
                    />
                </Link>
                <Link to={`/laptop`}>
                    <img
                        loading="lazy"
                        className="flex-1 cursor-pointer"
                        alt=""
                        src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
                    />
                </Link>
            </div>
        </div>
    );
};

export default BestSeller;
