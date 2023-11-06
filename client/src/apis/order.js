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
