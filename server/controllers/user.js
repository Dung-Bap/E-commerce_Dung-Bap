/** @format */

const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const crypto = require('crypto');

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
        const { password, role, refreshToken, ...userData } = response.toObject();
        const accessToken = generateAccessToken(response._id, role);
        const newRefreshToken = generateRefreshToken(response._id);
        // lưu refresh token vào db
        await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true });
        // Lưu refreshToken vào Cookie (dùng để cấp mới acceccToken)
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
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
        success: user ? true : false,
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

// Client gửi mail
// Server check mail có hợp lệ hay không => gửi mail + kèm theo link (password change token)
// Client check mail => cick link
// Client gửi api kèm token
// Check token có giống với token mà server gửi mail hay không
// Change password
//api/user/forgotpassord
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.query;
    if (!email) throw new Error('Missing Email');
    const user = await User.findOne({ email });
    if (!user) throw new Error('User Not Found');
    const resetToken = user.createPasswordChangeToken();
    // khi định nghĩa ra một hàm thì phải save lại
    await user.save();

    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu.
     Link này sẽ hết hạn trong 15 phút kể từ bây giờ !
    <a href="${process.env.URL_SERVER}/user/reset-password/${resetToken}">Click here</a>`;

    const data = {
        email,
        html,
    };

    const result = await sendMail(data);
    return res.status(200).json({
        success: true,
        result,
    });
});
//api/user/resetpassord
const resetPassword = asyncHandler(async (req, res) => {
    const { token, password } = req.body;
    if (!token || !password) throw new Error('Missing inputs');
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
    // gt: phải nằm trong khoảng 15 phút kể từ khi gửi mail
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } });
    if (!user) throw new Error('Invalid resetToken');
    user.password = password;
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;
    user.passwordChangedAt = Date.now();
    await user.save();
    return res.status(200).json({
        success: user ? true : false,
        message: user ? 'Update password successfully!' : 'Something went wrong !',
    });
});
//api/user/
const getUsers = asyncHandler(async (req, res) => {
    const response = await User.find().select('-password -role -refreshToken'); // .select để không lấy field "-password -role -refreshToken"
    return res.status(200).json({
        success: response ? true : false,
        users: response,
    });
});
//api/user/
const deleteUser = asyncHandler(async (req, res) => {
    const { _id } = req.query;
    if (!_id) throw new Error('Missing Inputs');
    const response = await User.findByIdAndDelete({ _id });
    return res.status(200).json({
        success: response ? true : false,
        deleteUser: response ? `User with email: '${response.email}' deleted` : 'No user delete',
    });
});
//api/user/currentupdate
const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    // Object.keys(req.body).length === 0 'kiểm tra req.body (oject) nếu nó rỗng'
    if (!_id || Object.keys(req.body).length === 0) throw new Error('Missing Inputs');
    const response = await User.findByIdAndUpdate(_id, req.body, { new: true }).select(
        ' -password -role -refreshToken'
    );
    return res.status(200).json({
        success: response ? true : false,
        updateUser: response ? response : 'Something went wrong',
    });
});
//api/user/
const updateUserByAdmin = asyncHandler(async (req, res) => {
    const { uid } = req.params;
    if (Object.keys(req.body).length === 0) throw new Error('Missing Inputs');
    const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select(
        ' -password -role -refreshToken'
    );
    return res.status(200).json({
        success: response ? true : false,
        updateUserByAdmin: response ? response : 'Something went wrong',
    });
});

module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getUsers,
    deleteUser,
    updateUser,
    updateUserByAdmin,
};
