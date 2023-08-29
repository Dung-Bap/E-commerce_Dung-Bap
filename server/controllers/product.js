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

const ratings = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, comment, pid } = req.body;
    if (!star || !pid) throw new Error('Missing Inputs');
    const ratingProduct = await Product.findById(pid);
    // find sẽ trả về một object để match với $elemMatch
    const alreadyRating = ratingProduct?.ratings?.find(el => el.postedBy.toString() === _id);
    if (alreadyRating) {
        //update
        await Product.updateOne(
            {
                ratings: { $elemMatch: alreadyRating },
            },
            {
                $set: { 'ratings.$.star': star, 'ratings.$.comment': comment },
            },
            {
                new: true,
            }
        );
    } else {
        // add star and comment
        await Product.findByIdAndUpdate(pid, { $push: { ratings: { star, comment, postedBy: _id } } }, { new: true });
    }

    //sum ratings
    const updatedProduct = await Product.findById(pid);
    const ratingCount = updatedProduct.ratings.length;
    const sumRatings = updatedProduct.ratings.reduce((sum, el) => sum + +el.star, 0);
    updatedProduct.totalRatings = Math.round((sumRatings * 10) / ratingCount) / 10;

    await updatedProduct.save();

    return res.status(200).json({
        success: response ? 'Ratings success' : false,
        updatedProduct,
    });
});

const uploadImagesProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (!req.files) throw new Error('Missing input');
    const response = await Product.findByIdAndUpdate(
        pid,
        { $push: { images: { $each: req.files.map(el => el.path) } } }, // push từng link vào mảng
        { new: true }
    );
    return res.status(200).json({
        success: response ? true : false,
        updatedProduct: response ? response : 'Cannot upload images product',
    });
});

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updatedProduct,
    deletedProduct,
    ratings,
    uploadImagesProduct,
};
