const router = require('express').Router();
const ctrls = require('../controllers/brand');
const { isAdmin, verifyAccessToken } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], ctrls.createNewBrand);
router.get('/', ctrls.getBrands);

router.put('/:bid', [verifyAccessToken, isAdmin], ctrls.updateBrand);
router.delete('/:bid', [verifyAccessToken, isAdmin], ctrls.deleteBrand);

module.exports = router;
