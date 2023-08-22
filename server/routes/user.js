/** @format */

const router = require("express").Router();
const ctrls = require("../controllers/user");
const { verifyAccessToken } = require("../middlewares/verifyToken");

// de du lieu k bi lộ, gui qua post, put
router.post("/register", ctrls.register);
router.post("/login", ctrls.login);
router.get("/current", verifyAccessToken, ctrls.getCurrent);

module.exports = router;

//CRUD | Create , Read, Update, Delete | POST, GET, PUT/PATCH, DELETE
