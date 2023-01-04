const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    adminId: String,
    authorEmail: String,
    authorName: String,
    title: String,
    content: String,
    titleImg: {
        type: {
            data: Buffer,
            contentType: String
        }, default: null
    },
    comments: [{
        userId: String,
        name: String,
        body: String,
        date: {
            type: String,
            default: Date.now()
        }
    }]
}, { timestamps: true });

blogSchema.index({title: "text"});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;