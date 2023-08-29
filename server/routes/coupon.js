const router = require('express').Router();
const ctrls = require('../controllers/coupon');
const { isAdmin, verifyAccessToken } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], ctrls.createCoupon);
router.get('/', ctrls.getCoupons);

router.put('/:cid', [verifyAccessToken, isAdmin], ctrls.updateCoupon);
router.delete('/:cid', [verifyAccessToken, isAdmin], ctrls.deleteCoupon);

module.exports = router;
