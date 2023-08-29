const Blog = require('../models/blog');
const asyncHandler = require('express-async-handler');

const createNewBlog = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body;
    if (!title || !description || !category) throw new Error('Missing Inputs');
    const response = await Blog.create(req.body);
    return res.status(200).json({
        success: response ? true : false,
        newBlog: response ? response : ' Cannot create new blog',
    });
});

const getBlogs = asyncHandler(async (req, res) => {
    const response = await Blog.find();
    return res.status(200).json({
        success: response ? true : false,
        result: response ? response : ' Cannot get blog',
    });
});

const updateBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (Object.keys(req.body).length === 0) throw new Error('Missing Inputs');
    const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        updateBlog: response ? response : 'Cannot update blog',
    });
});

const likeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { bid } = req.params;
    if (!bid) throw new Error('Missing Inputs');
    const blog = await Blog.findById(bid);
    const alreadyDisliked = blog?.dislikes?.find(el => el.toString() === _id);
    if (alreadyDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            result: response,
        });
    }
    const isLiked = blog?.likes?.find(el => el.toString() === _id);
    if (isLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            result: response,
        });
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { likes: _id } }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            result: response,
        });
    }
});

const dislikeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { bid } = req.params;
    if (!bid) throw new Error('Missing Inputs');
    const blog = await Blog.findById(bid);
    const alreadyLike = blog?.likes?.find(el => el.toString() === _id);
    if (alreadyLike) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            result: response,
        });
    }
    const isDislike = blog?.dislikes?.find(el => el.toString() === _id);
    if (isDislike) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            result: response,
        });
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { dislikes: _id } }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            result: response,
        });
    }
});

const getBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params; //$inc để update field numberViews
    const response = await Blog.findByIdAndUpdate(bid, { $inc: { numberViews: 1 } }, { new: true })
        // .populate để lấy thông tin của id trong mảng like và dislike
        .populate('likes', 'firstname lastname')
        .populate('dislikes', 'firstname lastname');
    return res.status(200).json({
        success: response ? true : false,
        result: response,
    });
});

const deleteBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    const response = await Blog.findByIdAndDelete(bid);
    res.status(200).json({
        success: response ? true : false,
        deleteBlog: response ? response : 'Cannot delete blog',
    });
});

const uploadImageBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (!req.file) throw new Error('Missing Inputs');
    const response = await Blog.findByIdAndUpdate(bid, { image: req.file.path }, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        uploadImageBlog: response ? response : 'Cannot upload image blog',
    });
});

module.exports = {
    createNewBlog,
    getBlogs,
    updateBlog,
    likeBlog,
    dislikeBlog,
    getBlog,
    deleteBlog,
    uploadImageBlog,
};
