import React from 'react';
import usePagination from '../../hook/usePagination';
import PaginationItem from './PaginationItem';
import { useSearchParams } from 'react-router-dom';

const Pagination = ({ totalProduct }) => {
    const pagination = usePagination(totalProduct, 2);
    const [params] = useSearchParams();
    const currentPage = params.get('page');
    const pageSize = process.env.REACT_APP_LIMIT_PRODUCT_PAGE || 10;

    const range = () => {
        const start = (currentPage - 1) * pageSize + 1;
        const end = Math.min(currentPage * pageSize, totalProduct);
        return `${start} - ${end}`;
    };

    return (
        <div className="flex w-full justify-between">
            {!currentPage && (
                <span className="font-light italic ">{`Show product 1 - ${pageSize} of ${totalProduct}`}</span>
            )}
            {currentPage && <span className="font-light italic ">{`Show product ${range()} of ${totalProduct}`}</span>}
            <div className="flex gap-5 ">
                {pagination?.map((el, index) => (
                    <PaginationItem key={index}>{el}</PaginationItem>
                ))}
            </div>
        </div>
    );
};

export default Pagination;
