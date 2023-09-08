const ProductCategory = require('../models/productCategory');
const asyncHandler = require('express-async-handler');

const createCategory = asyncHandler(async (req, res) => {
    const response = await ProductCategory.create(req.body);
    return res.status(200).json({
        success: response ? true : false,
        createCategory: response ? response : 'Cannot create category',
    });
});

const getCategories = asyncHandler(async (req, res) => {
    const response = await ProductCategory.find();
    return res.status(200).json({
        success: response ? true : false,
        getCategories: response ? response : ' Cannot get category',
    });
});

const updateCategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params;
    const response = await ProductCategory.findByIdAndUpdate(pcid, req.body, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        updateCategory: response ? response : 'Cannot update category',
    });
});

const deleteCategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params;
    const response = await ProductCategory.findByIdAndDelete(pcid);
    return res.status(200).json({
        success: response ? true : false,
        deleteCategory: response ? response : 'Cannot delete category',
    });
});

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
};
