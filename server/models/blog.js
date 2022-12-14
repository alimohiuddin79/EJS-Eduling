const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    titleImg: {
        data: Buffer,
        contentType: String
    },
    title: String,
    content: String,
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;