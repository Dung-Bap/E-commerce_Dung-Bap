import React, { useCallback, useEffect, useState } from 'react';
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Masonry from 'react-masonry-css';

import { Breadcrumb, Filter, Product } from '../../components';
import { apiGetProducts } from '../../apis/products';
import { sorts } from '../../ultils/contants';
import InputSelect from '../../components/filter/InputSelect';
import { Pagination } from '../../components/pagination';
import LoadingSkeleton from '../../components/loading/LoadingSkeleton';

const Products = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [activeFilter, setActiveFilter] = useState(null);
    const [params] = useSearchParams();
    const [sort, setSort] = useState('');
    const navigate = useNavigate();

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
    };

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort]);

    const changeActiveFilter = useCallback(
        name => {
            if (activeFilter === name) setActiveFilter(null);
            else setActiveFilter(name);
        },
        [activeFilter],
    );

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

        const fetchGetProducts = async q => {
            if (category && category !== 'products') q.category = category;
            const response = await apiGetProducts({ ...q, limit: process.env.REACT_APP_PAGE_SIZE });
            if (response?.success) setProducts(response);
        };

        fetchGetProducts(q);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, [category, params]);

    return (
        <div onClick={() => setActiveFilter(null)}>
            <div className="bg-[#f7f7f7] min-h-[81px] py-[15px] mb-[20px] w-full flex justify-center ">
                <div className="w-main px-[20px] lg:px-0">
                    <h2 className="text-[18px] font-medium mb-10px uppercase">{category}</h2>
                    <Breadcrumb category={category} />
                </div>
            </div>
            <div className="w-full flex justify-center">
                <div className="w-main px-[20px] lg:px-0">
                    <div className="flex border mb-[15px]">
                        <div className="w-3/5 sm:w-4/5 p-2">
                            <h2 className="text-[14px] font-medium mb-[10px]">Filter By</h2>
                            <div className="flex items-center mb-[10px]">
                                <Filter
                                    activeFilter={activeFilter}
                                    changeActiveFilter={changeActiveFilter}
                                    type="input"
                                    name={'price'}
                                />
                                <Filter
                                    activeFilter={activeFilter}
                                    changeActiveFilter={changeActiveFilter}
                                    name={'color'}
                                />
                            </div>
                        </div>
                        <div className="w-2/5 sm:w-1/5 p-2">
                            <h2 className="text-[14px] font-medium mb-[10px]">Sort By</h2>
                            <InputSelect options={sorts} value={sort} changeValue={changeValue} />
                        </div>
                    </div>
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                    >
                        {products?.counts > 0 &&
                            products?.products?.map(product => (
                                <Product nomal={true} key={product._id} data={product} />
                            ))}
                        {products.length === 0 &&
                            new Array(10).fill().map((item, index) => (
                                <div className="pr-5">
                                    <div className="flex flex-col p-[15px] mb-[20px] border h-[366px] cursor-pointer">
                                        <LoadingSkeleton className="h-[243px] w-full" />
                                        <LoadingSkeleton className={'w-[100px] my-[10px] h-[20px]'} />
                                        <LoadingSkeleton className={'w-[100px] mb-[10px] h-[20px]'} />
                                        <LoadingSkeleton className={'w-[100px] h-[20px]'} />
                                    </div>
                                </div>
                            ))}
                    </Masonry>
                    {products?.counts === 0 && (
                        <div className="min-h-[500px] flex justify-center items-center text-main font-semibold">
                            There are no matches for this information !!!
                        </div>
                    )}
                    {products?.counts > 0 && (
                        <div className="flex">
                            <Pagination totalProduct={products?.counts} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;
