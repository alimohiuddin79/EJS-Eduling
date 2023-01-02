const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
    adminId: String,
    category: String,
    field: String,
    question: String,
    options: [String],
    answer: String // should match with one of the options
});

questionSchema.index({category: "text", field: "text", question: "text"});

const Question = mongoose.model("question", questionSchema);

module.exports = Question;