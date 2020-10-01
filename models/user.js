const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: String,
    avatar: String,
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, required: true },
    bio: String,
    joined: {
        type: Date,
        default: Date.now,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
