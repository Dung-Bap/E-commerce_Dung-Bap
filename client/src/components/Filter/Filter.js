import React, { useEffect, useState } from 'react';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';
import icons from '../../ultils/icons';
import { colors } from '../../ultils/contants';
import { apiGetProducts } from '../../apis';
import { formatMoney } from '../../ultils/helpers';
import useDebouce from '../../hook/useDebouce';

const Filter = ({ name, activeFilter, changeActiveFilter, type = 'checkbox' }) => {
    const { BiChevronDown } = icons;
    const [selected, setSelected] = useState([]);
    const [highestPrice, setHighestPrice] = useState(null);
    const [price, setPrice] = useState({
        from: '',
        to: '',
    });
    const deboucePriceFrom = useDebouce(price.from, 500);
    const debouceToFrom = useDebouce(price.to, 500);

    useEffect(() => {
        const data = {};
        if (Number(price.from > 0)) data.from = price.from;
        if (Number(price.to > 0)) data.to = price.to;
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(data).toString(),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deboucePriceFrom, debouceToFrom]);

    const fetchHighestPrice = async () => {
        const response = await apiGetProducts({ sort: '-price', limit: 1 });
        if (response.success) setHighestPrice(response.products[0]?.price);
    };
    useEffect(() => {
        if (type === 'input') fetchHighestPrice();
        // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
    }, [type]);

    useEffect(() => {
        if (price.from && price.to && price.from > price.to)
            alert(`The 'From: ${price.from}' price must be less than the 'To: ${price.to}' price`);
    }, [price]);

    const handleReset = () => {
        changeActiveFilter(null);
        setSelected([]);
        navigate(`/${category}`);
        setPrice({ form: '', to: '' });
    };

    const handleSubmit = () => {
        changeActiveFilter(null);
        if (selected.length > 0) {
            navigate({
                pathname: `/${category}`,
                search: createSearchParams({
                    color: selected.join(','), //Gửi query thành chuỗi, bên server sẽ tách ra thành mảng
                }).toString(),
            });
        } else {
            navigate(`/${category}`);
        }
    };

    const handleChecked = value => {
        const alreadyChecked = selected.find(el => el === value);
        if (alreadyChecked) setSelected(prev => prev.filter(el => el !== value));
        else setSelected(prev => [...prev, value]);
    };

    const navigate = useNavigate();
    const { category } = useParams();

    return (
        <div className="relative">
            <div
                onClick={e => {
                    changeActiveFilter(name);
                    e.stopPropagation();
                }}
                className="flex items-center justify-between sm:min-w-[100px] p-3 border mr-[10px] cursor-pointer"
            >
                <span className="text-[12px] font-light capitalize">{name}</span>
                {type === 'checkbox' && (
                    <span className=" items-center flex justify-center text-white text-[10px] w-[14px] h-[14px] font-light rounded-[50%] bg-main">
                        {selected.length}
                    </span>
                )}
                <BiChevronDown />
            </div>
            {activeFilter === name && (
                <div
                    onClick={e => e.stopPropagation()}
                    className="absolute z-10 top-[calc(100%+4px)] bg-white border min-w-[250px] sm:min-w-[350px]"
                >
                    {type === 'checkbox' && (
                        <>
                            <div className="text-[14px] border-b font-light flex items-center justify-center py-[10px] px-[20px]">
                                <span>{selected.length} selected</span>
                            </div>
                            <div className="py-[5px] px-[20px] flex flex-wrap justify-between ">
                                {colors.map((el, index) => (
                                    <div key={index} className="flex items-center gap-6">
                                        <input
                                            className="form-checkbox"
                                            type="checkbox"
                                            name={el}
                                            value={el}
                                            id={el}
                                            onChange={e => handleChecked(e.target.value)}
                                            checked={selected.some(select => select === el)}
                                        />
                                        <label className="capitalize text-[16px] font-light w-[50px] " htmlFor={el}>
                                            {el}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="text-[14px] border-t font-light flex items-center justify-between py-[10px] px-[20px]">
                                <span onClick={handleReset} className="hover:text-main underline cursor-pointer">
                                    Reset
                                </span>
                                <span onClick={handleSubmit} className="hover:text-main underline cursor-pointer">
                                    Search
                                </span>
                            </div>
                        </>
                    )}
                    {type === 'input' && (
                        <>
                            <div className="flex justify-between py-[10px] px-[20px] text-[14px] border-b font-light">
                                <span>{`The highest price is ${formatMoney(highestPrice)}`}</span>
                                <span onClick={handleReset} className="hover:text-main underline cursor-pointer ">
                                    Reset
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-[10px] px-[20px] text-[14px] font-light">
                                <div>
                                    <label className="font-normal" htmlFor="from">
                                        From
                                    </label>
                                    <input
                                        value={price.form}
                                        onChange={e => setPrice(prev => ({ ...prev, from: e.target.value }))}
                                        className="form-input w-[100px] sm:w-full"
                                        id="from"
                                        type="number"
                                    />
                                </div>
                                <div className="ml-[20px]">
                                    <label className="font-normal" htmlFor="to">
                                        To
                                    </label>
                                    <input
                                        value={price.to}
                                        onChange={e => setPrice(prev => ({ ...prev, to: e.target.value }))}
                                        className="form-input w-[100px] sm:w-full"
                                        id="to"
                                        type="number"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Filter;
