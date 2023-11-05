const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productCategorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        brand: {
            type: Array,
            require: true,
        },
        image: {
            type: String,
            require: true,
        },
        icon: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

//Export the model
module.exports = mongoose.model('ProductCategory', productCategorySchema);
