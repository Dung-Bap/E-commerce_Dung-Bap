import React, { useCallback, useEffect, useState } from 'react';
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Masonry from 'react-masonry-css';

import { Breadcrumb, Filter, Product } from '../../components';
import { apiGetProducts } from '../../apis/products';
import { sorts } from '../../ultils/contants';
import InputSelect from '../../components/filter/InputSelect';
import { Pagination } from '../../components/pagination';

const Products = () => {
    const { category } = useParams();
    const [products, setProducts] = useState(null);
    const [activeFilter, setActiveFilter] = useState(null);
    const [params] = useSearchParams();
    const [sort, setSort] = useState('');
    const navigate = useNavigate();

    const changeValue = useCallback(
        value => {
            setSort(value);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [sort],
    );

    useEffect(() => {
        if (sort)
            navigate({
                pathname: `/${category}`,
                search: createSearchParams({ sort }).toString(),
            });
    }, [category, navigate, sort]);

    const changeActiveFilter = useCallback(
        name => {
            if (activeFilter === name) setActiveFilter(null);
            else setActiveFilter(name);
        },
        [activeFilter],
    );

    const fetchGetProducts = async queries => {
        const response = await apiGetProducts({ ...queries, limit: process.env.REACT_APP_PAGE_SIZE });
        if (response.success) setProducts(response);
    };

    useEffect(() => {
        // filter color
        const queries = Object.fromEntries([...params]);
        // filter price
        let priceQuery = {};
        if (queries.from && queries.to) {
            priceQuery = {
                $and: [{ price: { gte: queries.from } }, { price: { lte: queries.to } }],
            };
            delete queries.price;
        }
        if (queries.from) queries.price = { gte: queries.from };
        if (queries.to) queries.price = { lte: queries.to };
        delete queries.from;
        delete queries.to;
        const q = { ...priceQuery, ...queries };
        fetchGetProducts(q);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
    };

    return (
        <div onClick={() => setActiveFilter(null)}>
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
                <div className="w-1/5 p-2">
                    <h2 className="text-[14px] font-medium mb-[10px]">Sort By</h2>
                    <InputSelect options={sorts} value={sort} changeValue={changeValue} />
                </div>
            </div>
            <div>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {products?.products?.map(product => (
                        <Product nomal={true} key={product._id} data={product} />
                    ))}
                </Masonry>
            </div>
            <div className="flex">
                <Pagination totalProduct={products?.counts} />
            </div>
        </div>
    );
};

export default Products;
