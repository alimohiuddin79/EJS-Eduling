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

});
// name: {
    //     type: String,
    //     required: true
    // },
    // email: {
    //     type: String,
    //     required: true
    // },
    // type: {
    //     // 0 for student 1 for counsellor
    //     type: Number,
    //     min: 0,
    //     max: 1,
    //     required: true
    // },
    // admin: Boolean
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;