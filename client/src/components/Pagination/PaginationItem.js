import React from 'react';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import clsx from 'clsx';

const PaginationItem = ({ children }) => {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const currentPage = +params.get('page') || 1;
    const location = useLocation();

    const handleOnclickPagination = () => {
        const queries = Object.fromEntries([...params]);
        if (Number(children)) queries.page = children;
        navigate({
            pathname: location.pathname,
            search: createSearchParams(queries).toString(),
        });
    };

    return (
        <button
            onClick={handleOnclickPagination}
            type="button"
            disabled={!Number(children)}
            className={clsx(
                `flex items-end px-2 w-[30px] h-[30px] rounded-full  `,
                Number(children) && `flex items-center justify-center hover:text-main bg-slate-100 border  `,
                currentPage === +children &&
                    'w-[30px] h-[30px] rounded-full flex items-center justify-center text-main border-main',
            )}
        >
            {children}
        </button>
    );
};

export default PaginationItem;
