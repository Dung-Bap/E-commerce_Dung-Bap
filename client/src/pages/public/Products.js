import React, { useCallback, useEffect, useState } from 'react';
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Breadcrumb, Filter, InputSelect, Product } from '../../components';
import Masonry from 'react-masonry-css';
import { apiGetProducts } from '../../apis/getProducts';
import { sorts } from '../../ultils/contants';

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
        const response = await apiGetProducts({ ...queries, category });
        if (response.success) setProducts(response.products);
    };

    useEffect(() => {
        // filter color
        let param = [];
        for (let i of params.entries()) param.push(i);
        const queries = {};
        for (let i of params) queries[i[0]] = i[1];
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
                    {products?.map(product => (
                        <Product nomal={true} key={product._id} data={product} />
                    ))}
                </Masonry>
            </div>
        </div>
    );
};

export default Products;
