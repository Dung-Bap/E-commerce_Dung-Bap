const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // lưu ảnh của client
const multer = require('multer'); //lưu file và upload file

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'dungbap_shopecommerce',
    },
    allowedFormats: ['jpg', 'png'],
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
