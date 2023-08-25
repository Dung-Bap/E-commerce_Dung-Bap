const { response } = require('express');
const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

//api/product/
const createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing Inputs');
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title);

    const newProduct = await Product.create(req.body);
    return res.status(200).json({
        success: newProduct ? true : false,
        CreateNewProduct: newProduct ? newProduct : 'Cannot create new product',
    });
});
//api/product/:pid
const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const product = await Product.findById(pid);
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : 'Cannot get product',
    });
});
//api/product/
const getProducts = asyncHandler(async (req, res) => {
    const queries = { ...req.query };
    // tách các trường đặc biệt ra khỏi query
    const excludeFields = ['limit', 'sort', 'page', 'fields'];
    excludeFields.forEach(el => delete queries[el]);

    //format lại các operators cho đúng cú pháp của mongoose
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    const formatedQueries = JSON.parse(queryString);

    //Filtering
    if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' };
    let queryCommand = Product.find(formatedQueries);

    //sorting
    //abc, xyz => [abc,xyz] => abc xyz
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        queryCommand = queryCommand.sort(sortBy);
    }

    //Excute query
    //Số lượng thoả điều kiện !== số lượng trả về trong 1 lần gọi API
    queryCommand.exec(async (err, response) => {
        if (err) throw new Error(err.message);
        const counts = await Product.find(formatedQueries).countDocuments();
        return res.status(200).json({
            success: response ? true : false,
            products: response ? response : 'Cannot get products',
            counts,
        });
    });
});

//api/product/
const updatedProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true });
    return res.status(200).json({
        success: updatedProduct ? true : false,
        updatedProduct: updatedProduct ? updatedProduct : 'Cannot update product',
    });
});

const deletedProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(pid, req.body, { new: true });
    return res.status(200).json({
        success: deletedProduct ? true : false,
        deletedProduct: deletedProduct ? deletedProduct : 'Cannot delete product',
    });
});

module.exports = { createProduct, getProduct, getProducts, updatedProduct, deletedProduct };
