const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const sendMail = asyncHandler(async ({ email, html, subject }) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: '"E-commerce_Dung-Bap 💋"no_reply@e-commerce_dungbap.com', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: html, // html body
    });
    return info;
});

module.exports = sendMail;
