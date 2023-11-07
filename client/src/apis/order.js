import axios from '../axios';

export const apiCreateOrder = data =>
    axios({
        url: '/order/',
        method: 'post',
        data,
    });

export const apiGetOrderById = params =>
    axios({
        url: '/order/',
        method: 'get',
        params,
    });

export const apiDestroyOrder = data =>
    axios({
        url: '/order/destroy',
        method: 'delete',
        data,
    });
