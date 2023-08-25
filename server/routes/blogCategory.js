const router = require('express').Router();
const ctrls = require('../controllers/blogCategory');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], ctrls.createBlogCategory);
router.get('/', ctrls.getBlogCategory);
router.put('/:bcid', [verifyAccessToken, isAdmin], ctrls.updateBlogCategory);
router.delete('/:bcid', [verifyAccessToken, isAdmin], ctrls.deleteBlogCategory);

module.exports = router;
