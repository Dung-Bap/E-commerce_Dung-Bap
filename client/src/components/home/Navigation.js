import React, { memo, useEffect, useRef, useState } from 'react';
import { navigation } from '../../ultils/contants';
import { NavLink } from 'react-router-dom';
import { apiGetProducts } from '../../apis';
import useDebouce from '../../hook/useDebouce';
import HeadlessTippy from '@tippyjs/react/headless';
import { formatMoney } from '../../ultils/helpers';
import withBaseComponent from '../../hocs/withBaseComponent';
import icons from '../../ultils/icons';
import { showMenu } from '../../store/app/appSlice';

const Navigation = ({ navigate, dispatch }) => {
    const [valueInput, setValueInput] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(false);
    const debouceValue = useDebouce(valueInput, 800);
    const inputRef = useRef();
    const { IoIosClose, ImSpinner10, IoMenu } = icons;

    const fetchGetProducts = async debouceValue => {
        setLoading(true);
        const response = await apiGetProducts({ q: debouceValue, limit: 5 });
        setLoading(false);
        if (response?.success) setProducts(response.products);
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
        <div className="lg:w-main w-full flex md:justify-between justify-center sm:border-b h-[48px] sm:px-[20px] lg:px-0 py-2 items-center">
            <div className="text-[14px] hidden lg:block">
                {navigation.map(nav => (
                    <NavLink
                        key={nav.id}
                        to={nav.path}
                        className={({ isActive }) =>
                            isActive
                                ? 'pr-[30px] hover:text-main text-main font-semibold'
                                : 'pr-[30px] hover:text-main font-semibold'
                        }
                    >
                        {nav.value}
                    </NavLink>
                ))}
            </div>
            <div className="hidden sm:block lg:hidden cursor-pointer" onClick={() => dispatch(showMenu())}>
                <IoMenu size={26} color="red" />
            </div>
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
                                <div
                                    onClick={() => {
                                        navigate(`/${product.category?.toLowerCase()}/${product._id}/${product.title}`);
                                        setShowResult(false);
                                    }}
                                    key={product._id}
                                    className="flex items-center p-[10px] border-b-2 cursor-pointer"
                                >
                                    <img
                                        loading="lazy"
                                        className="w-[60px] h-[60px] object-cover mr-[20px]"
                                        alt=""
                                        src={product.thumbnail}
                                    />
                                    <div className="flex flex-col">
                                        <span className="line-clamp-1">{product.title}</span>
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
                            className="h-[43px] w-full bg-red-100 p-[10px] outline-none rounded-l-lg rounded-r-none placeholder:italic placeholder:text-main text-sm"
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
                            className="h-[43px] bg-red-100 p-[10px] rounded-r-lg rounded-l-none flex items-center cursor-pointer "
                        >
                            {loading ? (
                                <ImSpinner10 className="animate-spin" size={20} />
                            ) : (
                                valueInput && <IoIosClose size={20} />
                            )}
                        </span>
                    </div>
                </HeadlessTippy>
            </div>
        </div>
    );
};

export default withBaseComponent(memo(Navigation));
