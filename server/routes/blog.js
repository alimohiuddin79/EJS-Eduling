const express = require("express");
const {getBlogs, postComment, getCreatePost, postCreatePost} = require("../controllers/blog");

const app = express.Router();

app.route("/blogs").get(getBlogs).post(postComment);
app.route("/create").get(getCreatePost).post(postCreatePost);

module.exports = app;