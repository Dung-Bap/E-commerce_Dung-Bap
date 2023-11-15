const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const data = require('../data/ecomerce.json');
const ProductCategory = require('../models/productCategory');
const dataCategory = require('../data/cate_brand');

const fn = async product => {
    await Product.create({
        title: product?.name,
        slug: slugify(product?.name) + Math.round(Math.random() * 1000) + '',
        description: product?.description,
        brand: product?.brand,
        price: Math.round(Number(product?.price.match(/\d/g).join('') / 100)),
        category: product?.category[1],
        quantity: Math.round(Math.random() * 1000),
        sold: Math.round(Math.random() * 100),
        images: product?.images,
        color: product?.variants?.find(el => el.label === 'Color')?.variants[1],
        thumbnail: product?.thumb,
        totalRatings: 0,
    });
};
// Khi add nhiều phần tử trong mảng thì nên làm cách này, promise.all sẽ giúp không bị bất đồng bộ
const insertProduct = asyncHandler(async (req, res) => {
    const promise = [];
    for (let product of data) promise.push(fn(product));
    await Promise.all(promise);
    return res.json('Done hihi');
});

const fns = async category => {
    await ProductCategory.create({
        title: category?.cate,
        brand: category?.brand,
        image: category?.image,
    });
};

const insertCategory = asyncHandler(async (req, res) => {
    const promises = [];
    for (let category of dataCategory) promises.push(fns(category));
    await Promise.all(promises);
    return res.json('Done hihi');
});

module.exports = { insertProduct, insertCategory };
