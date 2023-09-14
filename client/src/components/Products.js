import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb, Filter, Product } from '../components';
import Masonry from 'react-masonry-css';
import { apiGetProducts } from '../apis/getProducts';

const Products = () => {
    const { category } = useParams();
    const [products, setProducts] = useState(null);
    const [activeFilter, setActiveFilter] = useState(null);

    const changeActiveFilter = useCallback(
        name => {
            if (activeFilter === name) setActiveFilter(null);
            else setActiveFilter(name);
        },
        [activeFilter],
    );

    const getProducts = async () => {
        const response = await apiGetProducts({ category });
        if (response.success) setProducts(response.products);
    };

    useEffect(() => {
        getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
    };

    return (
        <>
            <div className="bg-[#f7f7f7] min-h-[81px] py-[15px] mb-[20px]">
                <h2 className="text-[18px] font-medium mb-10px capitalize">{category}</h2>
                <Breadcrumb category={category} />
            </div>
            <div className="flex items-center border mb-[15px]">
                <div className="w-4/5 p-2">
                    <h2 className="text-[14px] font-medium mb-[10px]">Filter By</h2>
                    <div className="flex items-center mb-[10px]">
                        <Filter
                            activeFilter={activeFilter}
                            changeActiveFilter={changeActiveFilter}
                            type="input"
                            name={'price'}
                        />
                        <Filter activeFilter={activeFilter} changeActiveFilter={changeActiveFilter} name={'color'} />
                    </div>
                </div>
                <div className="w-1/5">Sort</div>
            </div>
            <div>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {products?.map(product => (
                        <Product nomal={true} key={product._id} data={product} />
                    ))}
                </Masonry>
            </div>
        </>
    );
};

export default Products;
