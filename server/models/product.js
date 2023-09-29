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
            type: Array,
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
            type: String,
            required: true,
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
        thumbnail: {
            type: String,
            required: true,
        },
        images: Array,
        color: {
            type: String,
            // required: true,
        },
        ratings: [
            {
                star: { type: Number },
                postedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
                comment: { type: String },
                updatedAt: { type: Date },
            },
        ],
        varriants: [
            {
                color: String,
                thumbnail: String,
                title: String,
                price: Number,
                images: Array,
                sku: String,
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
