import axios from '../axios';

export const apiRegister = data =>
    axios({
        url: '/user/register',
        method: 'post',
        data,
        credentials: 'include', //credentials khi đăng ký tài khoản thì lưu vào cookie trình duyệt
        withCredentials: true,
    });

export const apiLogin = data =>
    axios({
        url: '/user/login',
        method: 'post',
        data,
    });

export const apiForgotPassword = data =>
    axios({
        url: '/user/forgotpassword',
        method: 'post',
        data,
    });

export const aipResetPassword = data =>
    axios({
        url: '/user/resetpassword',
        method: 'put',
        data,
    });
export const aipGetCurrent = () =>
    axios({
        url: '/user/current',
        method: 'get',
    });

// Admin
export const apiGetUsers = params =>
    axios({
        url: '/user',
        method: 'get',
        params,
    });

export const apiUpdateUsers = (data, uid) =>
    axios({
        url: '/user/' + uid,
        method: 'put',
        data,
    });

export const apiDeleteUser = uid =>
    axios({
        url: '/user/' + uid,
        method: 'delete',
    });
// Member and Admin
export const apiUpdateUser = data =>
    axios({
        url: '/user/currentupdate/',
        method: 'put',
        data,
    });
// Cart
export const apiUpdateCart = data =>
    axios({
        url: '/user/cart/',
        method: 'put',
        data,
    });

export const apiDeleteProductInCart = (pid, color) =>
    axios({
        url: `/user/delete-product-incart/${pid}/${color}`,
        method: 'delete',
    });

export const apiUpdateWishlist = pid =>
    axios({
        url: `/user/update-wishlist/` + pid,
        method: 'put',
    });
