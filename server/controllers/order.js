const User = require('../models/user');
const Order = require('../models/order');
const asyncHandler = require('express-async-handler');

const createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { products, total, status, address, phone } = req.body;
    if (!(products || total || status || address || !phone)) throw new Error('Missing inputs');
    const response = await Order.create({ products, total, status, address, phone, orderBy: _id });
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
            // { total: { $regex: req.query.q, $options: 'i' } },
            { address: { $regex: req.query.q, $options: 'i' } },
            { phone: { $regex: req.query.q, $options: 'i' } },
            { status: { $regex: req.query.q, $options: 'i' } },
        ];
    }

    //Filterin
    let queryCommand = Order.find(formatedQueries);
    // if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' };

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
        const counts = await Order.find({ orderBy: _id, ...formatedQueries }).countDocuments();
        return res.status(200).json({
            success: response ? true : false,
            orders: response ? response : 'Cannot get products',
            counts,
        });
    });
});

const getOrders = asyncHandler(async (req, res) => {
    const response = await Order.find();
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : 'Something went wrong',
    });
});

const destroyOrder = asyncHandler(async (req, res) => {
    const _id = req.body;
    const response = await Order.remove({ _id: { $in: _id } });
    return res.status(200).json({
        success: response ? true : false,
        message: response ? 'Detete completed !' : 'Something went wrong !',
    });
});

module.exports = {
    createOrder,
    updateStatus,
    getUserOrder,
    getOrders,
    destroyOrder,
};
