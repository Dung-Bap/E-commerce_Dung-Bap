/** @format */

const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');
const jwt = require('jsonwebtoken');

//api/user/register
const register = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    // kiem tra field, tranh truy van lien tuc vao db
    if (!firstname || !lastname || !email || !password)
        return res.status(400).json({
            success: false,
            message: 'Missing Inputs',
        });
    // kiểm tra xem người dùng đã tồn tại từ trước hay chưa
    const user = await User.findOne({ email });
    if (user) throw new Error('Already exists user');
    else {
        // tao ra document user
        const newUser = await User.create(req.body);
        return res.status(200).json({
            success: newUser ? true : false,
            message: newUser ? 'Register user successfully !!!' : 'Something went wrong!!!',
        });
    }
});
//api/user/login
const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    // kiem tra field, tranh truy van lien tuc vao db
    if (!email || !password)
        return res.status(400).json({
            success: false,
            message: 'Missing Inputs',
        });

    const response = await User.findOne({ email });
    if (response && (await response.isCorrectPassword(password))) {
        // ẩn field password and role bằng rest và object literals
        // do moongo không hỗ trợ nên phải toObject() để trở thành plain object
        const { password, role, ...userData } = response.toObject();
        const accessToken = generateAccessToken(response._id, role);
        const refreshToken = generateRefreshToken(response._id);
        // Lưu refreshToken vào Cookie (dùng để cấp mới acceccToken)
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        await User.findByIdAndUpdate(response._id, { refreshToken }, { new: true });
        return res.status(200).json({
            success: true,
            accessToken,
            userData,
        });
    } else {
        throw new Error('Invalid authentication! ');
    }
});
//api/user/curent
const getCurrent = asyncHandler(async (req, res, next) => {
    // Do khi verify có thêm field user nên lấy nó thành id luôn
    const { _id } = req.user;
    const user = await User.findById(_id).select('-password -role -refreshToken'); // .select để không lấy field "-password -role -refreshToken"
    return res.status(200).json({
        success: true,
        result: user ? user : 'User not found',
    });
});
//api/user/refreshtoken
const refreshAccessToken = asyncHandler(async (req, res) => {
    //Lấy token từ cookie
    const cookie = req.cookies;
    //check xem có token hay không
    if (!cookie && !cookie.refreshToken) throw new Error('No Refresh Token in cookie');
    //check token có hợp lệ hay không
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
    const response = await User.findOne({
        _id: rs._id,
        refreshToken: cookie.refreshToken,
    });
    return res.status(200).json({
        success: response ? true : false,
        newRefreshToken: response ? generateAccessToken(response._id, response.role) : 'Refresh token not macthed',
    });
});
//api/user/logout
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie || !cookie.refreshToken) throw new Error('No Refresh Token in cookie');
    // xoá refresh token ở db
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true });
    // xoá refresh token ở cookie trình duyệt
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
    });
    return res.status(200).json({
        success: true,
        message: 'Logout done',
    });
});

module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
};
