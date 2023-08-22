/** @format */
// !mdbgum
const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt"); // dung de hash password
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        // phân quyền, mặc định là user
        role: {
            type: String,
            default: "user",
        },
        cart: {
            type: Array,
            default: [],
        },
        // mảng chứa Id của bảng address (quan hệ trong mysql)
        address: [{ type: mongoose.Types.ObjectId, ref: "Address" }],
        // mảng chứa những items mà người dùng thích
        wishlist: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
        // có khoá tài khoản hay không
        isBlocked: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
        },
        // quên mật khẩu
        passwordChangedAt: {
            type: String,
        },
        // đặt lại mật khẩu qua mail
        passwordResetToken: {
            type: String,
        },
        // khi token hết hạn
        passwordResetExpires: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// hash password when save
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//Export the model
module.exports = mongoose.model("User", userSchema);
