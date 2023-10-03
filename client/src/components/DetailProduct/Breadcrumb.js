import React from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link } from 'react-router-dom';
import icons from '../../ultils/icons';

const Breadcrumb = ({ title, category }) => {
    const { MdOutlineNavigateNext } = icons;
    const routes = [
        { path: '/', breadcrumb: 'Home' },
        { path: '/:category', breadcrumb: category },
        { path: '/:category/:id/:title', breadcrumb: title },
    ];

    const breadcrumbs = useBreadcrumbs(routes);
    return (
        <div className="flex items-center">
            {breadcrumbs
                .filter(el => el?.match?.route)
                .map(({ match, breadcrumb }, index, self) => (
                    <Link key={match.pathname} to={match.pathname}>
                        <span className="flex items-center text-[14px] hover:text-main capitalize">
                            {breadcrumb} {index !== self.length - 1 && <MdOutlineNavigateNext />}
                        </span>
                    </Link>
                ))}
        </div>
    );
};

export default Breadcrumb;
