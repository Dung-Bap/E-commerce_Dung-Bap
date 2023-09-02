import axios from '../axios';

export const apiProductCategory = () =>
    axios({
        url: '/productCategory/',
        method: 'get',
    });
