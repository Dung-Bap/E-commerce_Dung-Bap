/** @format */

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
// headers: {authorization: Bearer token}
const verifyAccessToken = asyncHandler(async (req, res, next) => {
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err)
                // trả về 401 để gửi yêu cầu lấy lại access token
                return res.status(401).json({
                    success: false,
                    message: 'Invalid access token',
                });
            req.user = decode;
            next();
        });
    } else {
        return res.status(401).json({
            success: false,
            message: 'Require authentication !!!',
        });
    }
});

module.exports = { verifyAccessToken };
