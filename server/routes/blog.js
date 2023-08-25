const router = require('express').Router();
const ctrls = require('../controllers/blog');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], ctrls.createNewBlog);
router.get('/', ctrls.getBlog);
router.put('/:bid', [verifyAccessToken, isAdmin], ctrls.updateBlog);
router.put('/like/:bid', [verifyAccessToken, isAdmin], ctrls.likeBlog);
router.put('/dislike/:bid', [verifyAccessToken, isAdmin], ctrls.dislikeBlog);

module.exports = router;
