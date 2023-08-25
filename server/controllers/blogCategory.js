const asyncHandler = require('express-async-handler');
const BlogCategory = require('../models/blogCategory');

const createBlogCategory = asyncHandler(async (req, res) => {
    const response = await BlogCategory.create(req.body);
    return res.status(200).json({
        success: response ? true : false,
        createBlogCategory: response ? response : 'Cannot create blog category',
    });
});

const getBlogCategory = asyncHandler(async (req, res) => {
    const response = await BlogCategory.find().select('title _id');
    return res.status(200).json({
        success: response ? true : false,
        getBlogCategory: response ? response : 'Cannot get blog category',
    });
});

const updateBlogCategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params;
    const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        updateBlogCategory: response ? response : ' Cannot update blog category',
    });
});

const deleteBlogCategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params;
    const response = await BlogCategory.findByIdAndDelete(bcid);
    return res.status(200).json({
        success: response ? true : false,
        deleteBlogCategory: response ? response : 'Cannot delete blog category',
    });
});

module.exports = {
    createBlogCategory,
    getBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
};
