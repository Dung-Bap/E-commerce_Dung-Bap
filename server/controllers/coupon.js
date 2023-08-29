const asyncHandler = require('express-async-handler');
const Coupon = require('../models/coupon');

const createCoupon = asyncHandler(async (req, res) => {
    const { name, discount, expriy } = req.body;
    if (!name || !discount || !expriy) throw new Error('Missing inputs');

    const response = await Coupon.create({
        ...req.body,
        expriy: Date.now() + +expriy * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
        cuccess: response ? true : false,
        createCoupon: response ? response : 'Cannot create coupon',
    });
});

const getCoupons = asyncHandler(async (req, res) => {
    const response = await Coupon.find().select('-createdAt -updatedAt');
    return res.status(200).json({
        success: response ? true : false,
        getCoupons: response ? response : ' Cannot get coupons',
    });
});

const updateCoupon = asyncHandler(async (req, res) => {
    const { cid } = req.params;
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
    if (req.body.expriy) req.body.expriy = Date.now() + req.body.expriy * 24 * 60 * 60 * 1000;
    const response = await Coupon.findByIdAndUpdate(cid, req.body, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        updateCoupon: response ? response : 'Cannot update coupon',
    });
});

const deleteCoupon = asyncHandler(async (req, res) => {
    const { cid } = req.params;
    const response = await Coupon.findByIdAndDelete(cid);
    return res.status(200).json({
        success: response ? true : false,
        getCoupons: response ? response : ' Cannot delete coupons',
    });
});

module.exports = {
    createCoupon,
    getCoupons,
    updateCoupon,
    deleteCoupon,
};
