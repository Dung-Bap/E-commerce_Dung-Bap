/** @format */

const userRouter = require('./user');
const productRouter = require('./product');
const productCategoryRouter = require('./productCategory');
const blogCategoryRouter = require('./blogCategory');
const { notFound, errHandler } = require('../middlewares/errHandler');

const initRoutes = app => {
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
    app.use('/api/productCategory', productCategoryRouter);
    app.use('/api/blogCategory', blogCategoryRouter);

    // hứng lỗi ở cuối cùng
    app.use(notFound);
    app.use(errHandler);
};

module.exports = initRoutes;
