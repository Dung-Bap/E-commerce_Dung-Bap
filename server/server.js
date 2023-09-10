/** @format */

const express = require('express');
require('dotenv').config();
const dbConnect = require('./config/db.connect');
const initRoutes = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8888;

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ['POST, PUT, GET, DELETE'],
        credentials: true, //credentials khi đăng ký tài khoản thì lưu vào cookie trình duyệt
    })
);

app.use(express.json()); // đọc data của client
app.use(express.urlencoded({ extended: true })); // đọc được url encode
app.use(cookieParser()); // đọc cookie parser

dbConnect();
// app.use("/", (req, res) => {
//     res.send("server on");
// });

initRoutes(app);

app.listen(port, () => {
    console.log('server running port: ' + port);
});
