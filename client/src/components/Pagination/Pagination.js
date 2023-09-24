import React from 'react';
import usePagination from '../../hook/usePagination';
import { useSearchParams } from 'react-router-dom';
import { PaginationItem } from './index';

const Pagination = ({ totalProduct, textWhite }) => {
    const [params] = useSearchParams();
    const currentPage = params.get('page');
    const pagination = usePagination(totalProduct, 2); // 2 mặc định, để currentpage thì lỗi
    const pageSize = process.env.REACT_APP_PAGE_SIZE;

    const range = () => {
        const start = (currentPage - 1) * pageSize + 1;
        const end = Math.min(currentPage * pageSize, totalProduct);
        return `${start} - ${end}`;
    };

    return (
        <div className="flex w-full justify-between p-4">
            {!currentPage && (
                <span className={`font-light italic ${textWhite ? 'text-white' : ''} `}>{`Show product 1 - ${Math.min(
                    pageSize,
                    totalProduct,
                )} of ${totalProduct}`}</span>
            )}
            {currentPage && (
                <span
                    className={`font-light italic ${textWhite ? 'text-white' : ''} `}
                >{`Show product ${range()} of ${totalProduct}`}</span>
            )}
            <div className="flex gap-5 ">
                {pagination?.map((el, index) => (
                    <PaginationItem key={index}>{el}</PaginationItem>
                ))}
            </div>
        </div>
    );
};

export default Pagination;
