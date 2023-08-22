/** @format */
// kết nối với mongoose

const { default: mongoose } = require('mongoose');

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        if (conn.connection.readyState === 1) console.log('DB connection successfully!!!');
        else console.log('DB Connection Failed');
    } catch (error) {
        console.log(' DB Connection Failed');
        throw new Error(error);
    }
};

module.exports = dbConnect;
