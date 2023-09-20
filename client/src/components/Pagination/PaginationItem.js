import React from 'react';
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import clsx from 'clsx';

const PaginationItem = ({ children }) => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const { category } = useParams();
    const currentPage = +params.get('page') || 1;

    const handleOnclickPagination = () => {
        let param = [];
        for (let i of params.entries()) param.push(i);
        const queries = {};
        for (let i of params) queries[i[0]] = i[1];
        if (Number(children)) queries.page = children;
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(queries).toString(),
        });
    };

    return (
        <button
            onClick={handleOnclickPagination}
            type="button"
            disabled={!Number(children)}
            className={clsx(
                'flex items-end px-2 ',
                Number(children) && ' flex items-center justify-center hover:text-main',
                currentPage === +children &&
                    'w-[30px] h-[30px] rounded-full flex items-center justify-center bg-slate-100 text-main',
            )}
        >
            {children}
        </button>
    );
};

export default PaginationItem;
