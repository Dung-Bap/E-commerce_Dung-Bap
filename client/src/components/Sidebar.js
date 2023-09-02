import React, { useState, useEffect } from 'react';
import { apiProductCategory } from '../apis/app';

const Sidebar = () => {
    const [category, setCategory] = useState(null);

    const getcategory = async () => {
        const response = await apiProductCategory();
        if (response.success) setCategory(response.getCategory);
    };

    useEffect(() => {
        getcategory();
    }, []);

    console.log(category);

    return <div>Sidebar</div>;
};

export default Sidebar;
