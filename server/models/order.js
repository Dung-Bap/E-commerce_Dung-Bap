const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Types.ObjectId, ref: 'Product' },
            count: String,
            color: String,
        },
    ],
    status: {
        type: String,
        default: 'Proccessing',
        enum: ['Canceled', 'Proccessing', 'Succeeded'],
    },
    total: Number,
    coupon: {
        type: mongoose.Types.ObjectId,
        ref: 'Coupon',
    },
    orderBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);
