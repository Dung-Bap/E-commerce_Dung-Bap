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

const isAdmin = asyncHandler(async (req, res, next) => {
    const { role } = req.user;
    // khi verify xong thì req.user đã bằng decode nên sẽ lấy được role
    if (role === 1998)
        // ảo thật đấy
        return res.status(401).json({
            success: false,
            message: 'REQUIRE ADMIN ROLE @@',
        });
    next();
});

module.exports = { verifyAccessToken, isAdmin };
