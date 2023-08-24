const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: mongoose.Types.ObjectId,
            ref: 'Category', // Liên kết với bảng category
        },
        quantity: {
            type: Number,
            default: 0,
        },
        sold: {
            // Số mặt hàng đã bán
            type: Number,
            default: 0,
        },
        images: {
            type: String,
            enum: ['Black', 'Red', 'Green'],
        },
        ratings: [
            {
                star: { type: Number },
                postedBy: { type: mongoose.Types.ObjectId, ref: 'User' }, // Người like
                comment: { type: String },
            },
        ],
        totalRatings: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

//Export the model
module.exports = mongoose.model('Product', productSchema);
