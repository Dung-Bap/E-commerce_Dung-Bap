const router = require('express').Router();
const ctrls = require('../controllers/blog');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const uploader = require('../config/cloudinary.config');

router.post('/', ctrls.createNewBlog);
router.get('/', ctrls.getBlogs);

router.get('/:bid', ctrls.getBlog);
router.put('/:bid', [verifyAccessToken, isAdmin], ctrls.updateBlog);
router.put('/uploadimage/:bid', [verifyAccessToken, isAdmin], uploader.single('image'), ctrls.uploadImageBlog);
router.delete('/:bid', [verifyAccessToken, isAdmin], ctrls.deleteBlog);
router.put('/like/:bid', [verifyAccessToken], ctrls.likeBlog);
router.put('/dislike/:bid', [verifyAccessToken], ctrls.dislikeBlog);

module.exports = router;
