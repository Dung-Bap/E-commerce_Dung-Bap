const router = require('express').Router();
const ctrls = require('../controllers/order');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', verifyAccessToken, ctrls.createOrder);
router.get('/admin', verifyAccessToken, isAdmin, ctrls.getOrders);
router.get('/', verifyAccessToken, ctrls.getUserOrder);
router.put('/status/:oid', verifyAccessToken, isAdmin, ctrls.updateStatus);
router.delete('/destroy/', ctrls.destroyOrder);

module.exports = router;
