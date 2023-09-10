/** @format */

const router = require('express').Router();
const ctrls = require('../controllers/user');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

// de du lieu k bi lộ, gui qua post, put
router.put('/updateaddress', verifyAccessToken, ctrls.updateUserAddress);
router.put('/cart', verifyAccessToken, ctrls.updateCart);
router.post('/register', ctrls.register);
router.get('/finalregister/:token', ctrls.finalRegister);
router.post('/login', ctrls.login);
router.get('/current', verifyAccessToken, ctrls.getCurrent);
router.post('/refreshtoken', ctrls.refreshAccessToken);
router.get('/logout', ctrls.logout);
router.post('/forgotpassword', ctrls.forgotPassword);
router.put('/resetpassword', ctrls.resetPassword);
router.get('/', [verifyAccessToken, isAdmin], ctrls.getUsers);
router.delete('/', [verifyAccessToken, isAdmin], ctrls.deleteUser);
router.put('/currentupdate', [verifyAccessToken], ctrls.updateUser);
router.put('/:uid', [verifyAccessToken, isAdmin], ctrls.updateUserByAdmin);

module.exports = router;

//CRUD | Create , Read, Update, Delete | POST, GET, PUT/PATCH, DELETE
