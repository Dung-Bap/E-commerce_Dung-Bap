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
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

dbConnect();
// app.use("/", (req, res) => {
//     res.send("server on");
// });

initRoutes(app);

app.listen(port, () => {
    console.log('server running port: ' + port);
});
