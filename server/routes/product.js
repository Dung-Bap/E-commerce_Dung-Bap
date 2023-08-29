const router = require('express').Router();
const ctrls = require('../controllers/product');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const uploader = require('../config/cloudinary.config');

router.post('/', [verifyAccessToken, isAdmin], ctrls.createProduct);
router.get('/', ctrls.getProducts);
router.put('/ratings', verifyAccessToken, ctrls.ratings);
//Lưu ý params để sau cùng
router.delete('/:pid', [verifyAccessToken, isAdmin], ctrls.deletedProduct);
router.put('/uploadimage/:pid', [verifyAccessToken, isAdmin], uploader.single('images'), ctrls.uploadImagesProduct);
router.put('/:pid', [verifyAccessToken, isAdmin], ctrls.updatedProduct);
router.get('/:pid', ctrls.getProduct);

module.exports = router;
