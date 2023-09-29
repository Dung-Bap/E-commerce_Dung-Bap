const router = require('express').Router();
const ctrls = require('../controllers/product');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const uploader = require('../config/cloudinary.config');

router.post(
    '/',
    [verifyAccessToken, isAdmin],
    uploader.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'images', maxCount: 10 },
    ]),
    ctrls.createProduct
);
router.get('/', ctrls.getProducts);
router.put('/ratings', verifyAccessToken, ctrls.ratings);
//Lưu ý params để sau cùng
router.delete('/:pid', [verifyAccessToken, isAdmin], ctrls.deletedProduct);
router.put(
    '/varriants/:pid',
    [verifyAccessToken, isAdmin],
    uploader.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'images', maxCount: 10 },
    ]),
    ctrls.addVarriants
);
router.put('/uploadimage/:pid', [verifyAccessToken, isAdmin], uploader.array('images', 10), ctrls.uploadImagesProduct);
router.put(
    '/:pid',
    [verifyAccessToken, isAdmin],
    uploader.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'images', maxCount: 10 },
    ]),
    ctrls.updatedProduct
);
router.get('/:pid', ctrls.getProduct);

module.exports = router;
