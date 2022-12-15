const mongoose = require("mongoose");
const passportLocalMongoose =require ("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    hash: String,
    name: String,
    type: {
        type: Number,
        min: 0,
        max: 1
    },
    admin: {
        type: Number,
        min: 0,
        max: 1,
        default: 0
    }
}, { timestamps: true });

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;