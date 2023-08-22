/** @format */

const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/db.connect");
const initRoutes = require("./routes");

const app = express();
const port = process.env.PORT || 8888;
app.use(express.json()); // đọc data của client
app.use(express.urlencoded({ extended: true })); // đọc được url encode

dbConnect();
// app.use("/", (req, res) => {
//     res.send("server on");
// });

initRoutes(app);

app.listen(port, () => {
    console.log("server running port: " + port);
});
