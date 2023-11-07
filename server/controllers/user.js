/** @format */

const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const crypto = require('crypto');
const makeToken = require('uniqid');
const users = require('../utils/contants');

// api/user/register
// const register = asyncHandler(async (req, res) => {
//     const { firstname, lastname, email, password } = req.body;
//     // kiem tra field, tranh truy van lien tuc vao db
//     if (!firstname || !lastname || !email || !password)
//         return res.status(400).json({
//             success: false,
//             message: 'Missing Inputs',
//         });
//     // kiểm tra xem người dùng đã tồn tại từ trước hay chưa
//     const user = await User.findOne({ email });
//     if (user) throw new Error('Already exists user');
//     else {
//         // tao ra document user
//         const newUser = await User.create(req.body);
//         return res.status(200).json({
//             success: newUser ? true : false,
//             message: newUser ? 'Register user successfully, Go Loginnn !!!' : 'Something went wrong!!!',
//         });
//     }
// });

// api/user/register
const register = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password, phone } = req.body;
    // kiem tra field, tranh truy van lien tuc vao db
    if (!firstname || !lastname || !email || !password || !phone)
        return res.status(400).json({
            success: false,
            message: 'Missing Inputs',
        });

    //kiểm tra xem người dùng đã tồn tại từ trước hay chưa
    const user = await User.findOne({ email });
    if (user) throw new Error('Already exists user');
    else {
        const token = makeToken();
        res.cookie('dataregister', { ...req.body, token }, { httpOnly: true, maxAge: 15 * 60 * 1000 });
        const html = `Xin vui lòng click vào link dưới đây để xác thực email trước khi đăng ký.
                Link này sẽ hết hạn trong 15 phút kể từ bây giờ !
               <a href="${process.env.URL_SERVER}/api/user/finalregister/${token}">Click here</a>`;
        const data = {
            email,
            html,
            subject: 'Email Authentication "E-commerce_Dung-Bap"',
        };

        await sendMail(data);
        return res.json({
            success: true,
            message: 'Please check your email to active account',
        });
    }
});

//api/user/finalregister
const finalRegister = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    const { token } = req.params;
    if (!cookie || cookie?.dataregister?.token !== token) {
        res.clearCookie('dataregister');
        return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`);
    }

    // tao ra document user
    const newUser = await User.create({
        firstname: cookie?.dataregister?.firstname,
        lastname: cookie?.dataregister?.lastname,
        email: cookie?.dataregister?.email,
        password: cookie?.dataregister?.password,
        phone: cookie?.dataregister?.phone,
    });
    res.clearCookie('dataregister');
    if (newUser) return res.redirect(`${process.env.CLIENT_URL}/finalregister/success`);
    else return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`);
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
    const user = await User.findById(_id)
        .select('-password -refreshToken')
        .populate({
            path: 'cart',
            populate: {
                path: 'product',
                select: 'thumbnail title price category ',
            },
        })
        .populate('wishlist', 'title thumbnail price color'); // .select để không lấy field "-password -refreshToken"
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
    const { email } = req.body;
    if (!email) throw new Error('Missing Email !');
    const user = await User.findOne({ email });
    if (!user) throw new Error('User Not Found !');
    const resetToken = user.createPasswordChangeToken();
    // khi định nghĩa ra một hàm thì phải save lại
    await user.save();

    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu.
     Link này sẽ hết hạn trong 15 phút kể từ bây giờ !
    <a href="${process.env.CLIENT_URL}/reset-password/${resetToken}">Click here</a>`;

    const data = {
        email,
        html,
        subject: 'Forgot Password "E-commerce_Dung-Bap"',
    };

    const result = await sendMail(data);
    return res.status(200).json({
        success: result?.response.includes('OK') ? true : false,
        message: result?.response.includes('OK')
            ? 'Please check your email to reset your password !'
            : 'Something went wrong, Please try again !',
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
        message: user ? 'Update password successfully, Please log in again !!!' : 'Something went wrong !',
    });
});
//api/user/
const getUsers = asyncHandler(async (req, res) => {
    // const response = await User.find().select('-password -role -refreshToken'); // .select để không lấy field "-password -role -refreshToken"
    // return res.status(200).json({
    //     success: response ? true : false,
    //     users: response,
    // });

    const queries = { ...req.query };
    // tách các trường đặc biệt ra khỏi query
    const excludeFields = ['limit', 'sort', 'page', 'fields'];
    excludeFields.forEach(el => delete queries[el]);

    //format lại các operators cho đúng cú pháp của mongoose
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    const formatedQueries = JSON.parse(queryString);

    if (req.query.q) {
        delete formatedQueries.q;
        formatedQueries['$or'] = [
            { firstname: { $regex: req.query.q, $options: 'i' } },
            { lastname: { $regex: req.query.q, $options: 'i' } },
            { email: { $regex: req.query.q, $options: 'i' } },
        ];
    }

    //Filterin
    let queryCommand = User.find(formatedQueries);
    if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' };

    //sorting
    //abc, xyz => [abc,xyz] => abc xyz
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        queryCommand = queryCommand.sort(sortBy);
    }

    //field limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        queryCommand.select(fields);
    }

    //Pagination
    //limit: số object lấy về khi goi api
    //1 2 3...10 skip = 2 sẽ bỏ 2 object đầu
    //'1' : 1 = +'1', 'adsfhjkfdh' => NaN
    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
    const skip = (page - 1) * limit;
    queryCommand.skip(skip).limit(limit);

    //Excute query
    //Số lượng thoả điều kiện !== số lượng trả về trong 1 lần gọi API
    queryCommand.exec(async (err, response) => {
        if (err) throw new Error(err.message);
        const counts = await User.find(formatedQueries).countDocuments();
        return res.status(200).json({
            success: response ? true : false,
            users: response ? response : 'Cannot get products',
            counts,
        });
    });
});
//api/user/
const deleteUser = asyncHandler(async (req, res) => {
    const { uid } = req.params;
    const response = await User.findByIdAndDelete(uid);
    return res.status(200).json({
        success: response ? true : false,
        message: response ? `User with email: '${response.email}' deleted` : 'No user delete',
    });
});
//api/user/currentupdate
const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { firstname, lastname, email, address } = req.body;
    const data = { firstname, lastname, email, address };
    if (req.file) data.avatar = req.file.path;
    if (!_id || Object.keys(req.body) === 0) throw new Error('Missing inputs');
    const response = await User.findByIdAndUpdate(_id, data, { new: true }).select(' -password -role -refreshToken');
    return res.status(200).json({
        success: response ? true : false,
        message: response ? 'Update Successfully !' : 'Something went wrong',
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
        message: response ? 'Update successful' : 'Something went wrong',
    });
});

const updateUserAddress = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    if (!req.body.address) throw new Error('Missing Inputs');
    const response = await User.findByIdAndUpdate(_id, { $push: { address: req.body.address } }, { new: true }).select(
        ' -password -role -refreshToken'
    );
    return res.status(200).json({
        success: response ? true : false,
        updateUserAddress: response ? response : 'Something went wrong',
    });
});

const updateCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { pid, quantity = 1, color, price, thumbnail, title } = req.body;
    if ((!pid, !color)) throw new Error('Missing Inputs');
    const user = await User.findById(_id).select('cart');
    const alreadyProduct = user?.cart?.find(el => el.product.toString() === pid && el.color === color);
    if (alreadyProduct) {
        const response = await User.updateOne(
            { cart: { $elemMatch: alreadyProduct } },
            {
                $set: { 'cart.$.quantity': quantity, 'cart.$.price': price },
                'cart.$.thumbnail': thumbnail,
                'cart.$.title': title,
            },
            { new: true }
        );
        return res.status(200).json({
            success: response ? true : false,
            message: response ? 'Add to cart successfully, please go to cart !' : 'Something went wrong',
        });
    } else {
        const response = await User.findByIdAndUpdate(
            _id,
            { $push: { cart: { product: pid, quantity, color, price, thumbnail, title } } },
            { new: true }
        );
        return res.status(200).json({
            success: response ? true : false,
            message: response ? 'Add to cart successfully, please go to cart !' : 'Something went wrong',
        });
    }
});

const deleteProductInCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { pid, color } = req.params;
    const user = await User.findById(_id).select('cart');
    const alreadyProduct = user?.cart?.find(el => el.product.toString() === pid && el.color === color);
    if (!alreadyProduct) {
        return res.status(200).json({
            success: true,
            message: 'Update Cart Success',
        });
    }
    const response = await User.findByIdAndUpdate(_id, { $pull: { cart: { product: pid, color } } }, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        message: response ? 'Update Cart Success' : 'Something went wrong',
    });
});

const insertUsers = asyncHandler(async (req, res) => {
    const response = await User.create(users);
    return res.status(200).json({
        success: response ? true : false,
        message: response ? 'Done !!!' : 'Something went wrong!!!',
    });
});

const updateWishList = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const { _id } = req.user;
    const wishlist = await User.findById(_id);
    const alreadyAddWishlist = wishlist?.wishlist?.find(el => el.toString() === pid);
    if (alreadyAddWishlist) {
        const response = await User.findByIdAndUpdate(_id, { $pull: { wishlist: pid } }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            message: response ? 'Successfully removed from wishlist !' : 'Something went wrong !',
        });
    } else {
        const response = await User.findByIdAndUpdate(_id, { $push: { wishlist: pid } }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            message: response ? 'Successfully added product to wishlist !' : 'Something went wrong !',
        });
    }
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
    updateUserAddress,
    updateCart,
    finalRegister,
    insertUsers,
    deleteProductInCart,
    updateWishList,
};
