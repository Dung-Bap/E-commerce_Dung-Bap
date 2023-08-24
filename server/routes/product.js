const router = require('express').Router();
const ctrls = require('../controllers/product');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], ctrls.createProduct);
router.get('/', ctrls.getProducts);
//Lưu ý params để sau cùng
router.delete('/:pid', [verifyAccessToken, isAdmin], ctrls.deletedProduct);
router.put('/:pid', [verifyAccessToken, isAdmin], ctrls.updatedProduct);
router.get('/:pid', ctrls.getProduct);

module.exports = router;
