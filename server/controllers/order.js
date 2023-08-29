const User = require('../models/user');
const Order = require('../models/order');
const asyncHandler = require('express-async-handler');

const createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.User;
    const userCart = await User.findById(_id).select('cart');
    return res.status(200).json({
        success: userCart ? true : false,
        createOrder: response ? response : 'Cannot create cart',
    });
});

module.exports = {
    createOrder,
};
