/** @format */

const router = require("express").Router();
const ctrls = require("../controllers/user");
// de du lieu k bi lộ, gui qua post, put

router.post("/register", ctrls.register);
router.post("/login", ctrls.login);

module.exports = router;

//CRUD | Create , Read, Update, Delete | POST, GET, PUT/PATCH, DELETE
