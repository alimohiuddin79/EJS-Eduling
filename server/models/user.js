const mongoose = require("mongoose");
const passportLocalMongoose =require ("passport-local-mongoose");

// type = 0 student & type = 1 counsellor 
// admin = 1 is admin user 

const userSchema = new mongoose.Schema({
    username: String,
    hash: String,
    name: String,
    userImg: {
        type: {
            data: Buffer,
            contentType: String
        },
        default: null
    },
    bio: String,
    type: {
        type: Number,
        min: 0,
        max: 1
    },
    categories: {
        type: [String],
        default: null
    },
    timings: {
        type: [String],
        default: null
    },
    requests: [{
        studentId: String,
        studentName: String,
        studentEmail: String,
        studentMessage: String,
        responded: {
            type: Number,
            min: 0,
            max: 1,
            default: 0
        },
        date: {
            type: String,
            default: Date.now()
        }
    }],
    responses: [{
        requestId: String,
        counsellorId: String,
        counsellorName: String,
        counsellorEmail: String,
        counsellorMessage: String,
        date: {
            type: String,
            default: Date.now()
        }
    }],
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