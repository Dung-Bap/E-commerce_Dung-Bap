const User = require('../models/user');
const Order = require('../models/order');
const Coupon = require('../models/coupon');
const asyncHandler = require('express-async-handler');

const createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { products, total, status, address } = req.body;
    if (!(products || total || status || address)) throw new Error('Missing inputs');
    const response = await Order.create({ products, total, status, address, orderBy: _id });
    await User.findByIdAndUpdate(_id, { cart: [] });
    return res.status(200).json({
        success: response ? true : false,
        order: response ? response : 'Something went wrong !!!',
    });
});

const updateStatus = asyncHandler(async (req, res) => {
    const { oid } = req.params;
    const { status } = req.body;
    if (!status) throw new Error('Missing status');
    const response = await Order.findByIdAndUpdate(oid, { status }, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : 'Something went wrong',
    });
});

const getUserOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const response = await Order.find({ orderBy: _id });
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : 'Something went wrong',
    });
});

const getOrders = asyncHandler(async (req, res) => {
    const response = await Order.find();
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : 'Something went wrong',
    });
});

module.exports = {
    createOrder,
    updateStatus,
    getUserOrder,
    getOrders,
};
