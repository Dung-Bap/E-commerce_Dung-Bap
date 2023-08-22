/** @format */

const User = require("../models/user");
const asyncHandler = require("express-async-handler");

//api/user/register
const register = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    // kiem tra field, tranh truy van lien tuc vao db
    if (!firstname || !lastname || !email || !password)
        return res.status(400).json({
            success: false,
            message: "Missing Inputs",
        });
    // kiểm tra xem người dùng đã tồn tại từ trước hay chưa
    const user = await User.findOne({ email });
    if (user) throw new Error("Already exists user");
    else {
        // tao ra document user
        const newUser = await User.create(req.body);
        return res.status(200).json({
            success: newUser ? true : false,
            message: newUser
                ? "Register user successfully !!!"
                : "Something went wrong!!!",
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
            message: "Missing Inputs",
        });

    const response = await User.findOne({ email });
    if (response && (await response.isCorrectPassword(password))) {
        // ẩn field password and role bằng rest và object literals
        // do moongo không hỗ trợ nên phải toObject() để trở thành plain object
        const { password, role, ...userData } = response.toObject();
        return res.status(200).json({
            success: true,
            userData,
        });
    } else {
        throw new Error("Invalid authentication! ");
    }
});

module.exports = {
    register,
    login,
};
