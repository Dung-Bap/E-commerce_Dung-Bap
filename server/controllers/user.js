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
    // tao ra tung doc user
    const response = await User.create(req.body);
    return res.status(200).json({
        success: response ? true : false,
    });
});

module.exports = {
    register,
};
