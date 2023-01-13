const mongoose = require("mongoose");

// counsellorCount = total no of counsellors
const counterSchema = new mongoose.Schema({
    blogCount: {
        type: Number,
        default: 0
    },
    resumeCount: {
        type: Number,
        default: 0
    },
    hireCount: {
        type: Number,
        default: 0
    },
});

const Counters = mongoose.model("Counter", counterSchema);

module.exports = Counters;