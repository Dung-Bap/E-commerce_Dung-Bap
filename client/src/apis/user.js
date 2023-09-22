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

export const apiGetUsers = params =>
    axios({
        url: '/user',
        method: 'get',
        params,
    });
