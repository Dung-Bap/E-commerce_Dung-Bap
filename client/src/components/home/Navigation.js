import React, { memo, useEffect, useRef, useState } from 'react';
import { navigation } from '../../ultils/contants';
import { NavLink } from 'react-router-dom';
import { apiGetProducts } from '../../apis';
import useDebouce from '../../hook/useDebouce';
import HeadlessTippy from '@tippyjs/react/headless';
import { formatMoney } from '../../ultils/helpers';
import withBaseComponent from '../../hocs/withBaseComponent';
import icons from '../../ultils/icons';

const Navigation = ({ navigate }) => {
    const [valueInput, setValueInput] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [products, setProducts] = useState(null);
    const debouceValue = useDebouce(valueInput, 800);
    const inputRef = useRef();
    const { IoIosClose } = icons;

    console.log(products);

    const fetchGetProducts = async debouceValue => {
        const response = await apiGetProducts({ q: debouceValue, limit: 5 });
        if (response.success) setProducts(response.products);
    };

    const handleClear = () => {
        setValueInput('');
        setProducts(null);
    };

    useEffect(() => {
        if (debouceValue.trim() === '') {
            setProducts(null);
        }
    }, [debouceValue]);

    useEffect(() => {
        if (debouceValue) fetchGetProducts(debouceValue);
    }, [debouceValue]);

    return (
        <div className="w-main flex justify-between border-b h-[48px] py-2 items-center">
            <div className="text-[14px]">
                {navigation.map(nav => (
                    <NavLink
                        key={nav.id}
                        to={nav.path}
                        className={({ isActive }) =>
                            isActive ? 'pr-[30px] hover:text-main text-main' : 'pr-[30px] hover:text-main'
                        }
                    >
                        {nav.value}
                    </NavLink>
                ))}
            </div>
            <div className="flex justify-end">
                <div>
                    <HeadlessTippy
                        placement="bottom"
                        visible={showResult && products?.length > 0}
                        interactive
                        render={attrs => (
                            <div
                                tabIndex="-1"
                                {...attrs}
                                className="w-[300px] bg-white shadow-xl rounded-md overflow-hidden border"
                            >
                                {products?.map(product => (
                                    <div key={product._id} className="flex items-center p-[10px] border-b-2">
                                        <img
                                            onClick={() => {
                                                navigate(
                                                    `/${product.category?.toLowerCase()}/${product._id}/${
                                                        product.title
                                                    }`,
                                                );
                                                setShowResult(false);
                                            }}
                                            className="w-[60px] h-[60px] object-cover mr-[20px] cursor-pointer"
                                            alt=""
                                            src={product.thumbnail}
                                        />
                                        <div className="flex flex-col">
                                            <span
                                                onClick={() => {
                                                    navigate(
                                                        `/${product.category?.toLowerCase()}/${product._id}/${
                                                            product.title
                                                        }`,
                                                    );
                                                    setShowResult(false);
                                                }}
                                                className="line-clamp-1 cursor-pointer"
                                            >
                                                {product.title}
                                            </span>
                                            <span className="text-main text-sm font-medium">
                                                {formatMoney(product.price)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        onClickOutside={() => setShowResult(false)}
                    >
                        <div className="flex items-center w-[300px]">
                            <input
                                className="h-[43px] w-full bg-red-100 p-[10px] outline-none rounded-l-lg placeholder:italic placeholder:text-main text-sm"
                                placeholder="What are you looking for..."
                                value={valueInput}
                                onChange={e => {
                                    let value = e.target.value;
                                    if (value.trim() === '') {
                                        setValueInput('');
                                    } else {
                                        setValueInput(value);
                                    }
                                }}
                                ref={inputRef}
                                onFocus={() => setShowResult(true)}
                            />
                            <span
                                onClick={handleClear}
                                className="h-[43px] bg-red-100 p-[10px] rounded-r-lg flex items-center cursor-pointer"
                            >
                                {valueInput && <IoIosClose size={20} />}
                            </span>
                        </div>
                    </HeadlessTippy>
                </div>
            </div>
        </div>
    );
};

export default withBaseComponent(memo(Navigation));
