/** @format */

const router = require('express').Router();
const ctrls = require('../controllers/user');
const { verifyAccessToken } = require('../middlewares/verifyToken');

// de du lieu k bi lộ, gui qua post, put
router.post('/register', ctrls.register);
router.post('/login', ctrls.login);
router.get('/current', verifyAccessToken, ctrls.getCurrent);
router.post('/refreshtoken', ctrls.refreshAccessToken);
router.get('/logout', ctrls.logout);
router.get('/forgotpassword', ctrls.forgotPassword);
router.put('/resetpassword', ctrls.resetPassword);

module.exports = router;

//CRUD | Create , Read, Update, Delete | POST, GET, PUT/PATCH, DELETE
