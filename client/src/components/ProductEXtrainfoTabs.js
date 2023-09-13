import React, { useEffect, useState } from 'react';
import { productEXtrainfoTabs } from '../ultils/contants';
import { CustomSlider } from '../components';
import { apiGetProducts } from '../apis';
import { useParams } from 'react-router-dom';

const ProductEXtrainfoTabs = () => {
    const { category } = useParams();

    const [ProductCategories, setProductCategories] = useState(null);

    const fetchProductCategory = async () => {
        const response = await apiGetProducts({ category });
        if (response.success) setProductCategories(response.products);
    };
    useEffect(() => {
        fetchProductCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [activeTab, setActiveTab] = useState(1);
    const productDes = productEXtrainfoTabs.filter(el => el.id === activeTab);
    return (
        <div className="mb-[30px]">
            <div className="relative bottom-2">
                {productEXtrainfoTabs.map(el => (
                    <span
                        onClick={() => setActiveTab(el.id)}
                        className={`py-[10px] px-[10px] border border-b-0 cursor-pointer ${
                            activeTab === el.id ? 'bg-[#f1f1f1] ' : 'bg-white'
                        } mr-2 `}
                        key={el.id}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className="border p-5">
                {productDes.map((el, index) => (
                    <span key={index} className="text-[14px] font-light">
                        {el.des}
                    </span>
                ))}
            </div>
            <div className="w-full mt-[20px]">
                <h2 className="w-full font-semibold text-[20px] py-[15px] border-b-2 border-main mb-[20px]">
                    OTHER CUSTOMERS ALSO BUY:
                </h2>
                <CustomSlider products={ProductCategories} nomal />
            </div>
        </div>
    );
};

export default ProductEXtrainfoTabs;
