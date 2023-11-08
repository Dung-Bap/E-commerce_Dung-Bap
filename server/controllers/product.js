const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const makeSku = require('uniqid');

//api/product/
const createProduct = asyncHandler(async (req, res) => {
    const { title, price, quantity, color, category, brand, description } = req.body;
    const thumbnail = req?.files?.thumbnail[0].path;
    const images = req?.files?.images?.map(el => el.path);
    if (!(title && price && quantity && color && category && brand && description)) throw new Error('Missing Inputs');
    req.body.slug = slugify(title);
    if (thumbnail) req.body.thumbnail = thumbnail;
    if (images) req.body.images = images;
    const newProduct = await Product.create(req.body);
    return res.status(200).json({
        success: newProduct ? true : false,
        message: newProduct ? 'Create Products Successfully !!!' : 'Cannot create new product',
    });
});
//api/product/:pid
const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const product = await Product.findById(pid).populate({
        // lấy thông tin fistname and lastname cho ratings
        path: 'ratings',
        populate: {
            path: 'postedBy',
            select: 'firstname lastname avatar',
        },
    });
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : 'Cannot get product',
    });
});
//api/product/
const getProducts = asyncHandler(async (req, res) => {
    const queries = { ...req.query };
    // tách các trường đặc biệt ra khỏi query
    const excludeFields = ['limit', 'sort', 'page', 'fields', 'totalRatings'];
    excludeFields.forEach(el => delete queries[el]);

    //format lại các operators cho đúng cú pháp của mongoose
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    const formatedQueries = JSON.parse(queryString);
    //Filtering
    let queryColorObject = {};
    if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' };
    if (queries?.category) formatedQueries.category = { $regex: queries.category, $options: 'i' };
    if (queries?.brand) formatedQueries.brand = { $regex: queries.brand, $options: 'i' };
    if (queries?.color) {
        delete formatedQueries.color;
        const colorArr = queries.color?.split(',');
        const colorQuery = colorArr.map(el => ({ color: { $regex: el, $options: 'i' } }));
        queryColorObject = { $or: colorQuery };
    }

    let objectQuery = {};
    if (queries?.q) {
        delete formatedQueries.q;
        objectQuery = {
            $or: [
                { color: { $regex: queries.q, $options: 'i' } },
                { title: { $regex: queries.q, $options: 'i' } },
                { brand: { $regex: queries.q, $options: 'i' } },
                { description: { $regex: queries.q, $options: 'i' } },
                { category: { $regex: queries.q, $options: 'i' } },
            ],
        };
    }

    const qr = { ...queryColorObject, ...formatedQueries, ...objectQuery };
    let queryCommand = Product.find(qr);

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
        const counts = await Product.find(qr).countDocuments();
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
    const files = req?.files;
    if (files?.thumbnail) req.body.thumbnail = files?.thumbnail[0].path;
    if (files?.images) req.body.images = files?.images?.map(el => el.path);
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true });
    return res.status(200).json({
        success: updatedProduct ? true : false,
        message: updatedProduct ? 'Update Successfully' : 'Cannot update product',
    });
});

const deletedProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(pid);
    return res.status(200).json({
        success: deletedProduct ? true : false,
        message: deletedProduct ? 'Delete Successfully !' : 'Cannot delete product',
    });
});

const ratings = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, comment, pid, updatedAt } = req.body;
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
                $set: { 'ratings.$.star': star, 'ratings.$.comment': comment, 'ratings.$.updatedAt': updatedAt },
            },
            {
                new: true,
            }
        );
    } else {
        // add star and comment
        await Product.findByIdAndUpdate(
            pid,
            { $push: { ratings: { star, comment, postedBy: _id, updatedAt } } },
            { new: true }
        );
    }

    //sum ratings
    const updatedProduct = await Product.findById(pid);
    const ratingCount = updatedProduct.ratings.length;
    const sumRatings = updatedProduct.ratings.reduce((sum, el) => sum + +el.star, 0);
    updatedProduct.totalRatings = Math.round((sumRatings * 10) / ratingCount) / 10;

    await updatedProduct.save();

    return res.status(200).json({
        success: updatedProduct ? 'Ratings success' : false,
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

const addVarriants = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const { title, color, price } = req.body;
    const thumbnail = req.files.thumbnail[0].path;
    const images = req.files.images.map(el => el.path);
    if (!title || !color || !price) throw new Error('Missing inputs');
    const response = await Product.findByIdAndUpdate(
        pid,
        { $push: { varriants: { title, color, price, thumbnail, images, sku: makeSku().toUpperCase() } } },
        { new: true }
    );
    return res.status(200).json({
        success: response ? true : false,
        message: response ? 'Update Varriants Successfully !' : 'Something went wrong !',
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
    addVarriants,
};
