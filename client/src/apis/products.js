import axios from '../axios';

export const apiGetProducts = params =>
    axios({
        url: '/product/',
        method: 'get',
        params,
    });

export const aipGetProduct = pid =>
    axios({
        url: '/product/' + pid,
        method: 'get',
    });

export const apiRatings = data =>
    axios({
        url: '/product/ratings/',
        method: 'put',
        data,
    });

export const apiCreateProducts = data =>
    axios({
        url: '/product/',
        method: 'post',
        data,
    });

export const apiUpdateProduct = (data, pid) =>
    axios({
        url: '/product/' + pid,
        method: 'put',
        data,
    });

export const apiDeleteProduct = pid =>
    axios({
        url: '/product/' + pid,
        method: 'delete',
    });

export const apiAddVarriants = (data, pid) =>
    axios({
        url: '/product/varriants/' + pid,
        method: 'put',
        data,
    });
