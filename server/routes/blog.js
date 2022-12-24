const express = require("express");
const {getBlogs, getBlogById, postComment, getCreateBlog, postCreateBlog, getBlogByAdmin, updateBlogTitleImage, updateBlogTitleAndContent, deleteBlog} = require("../controllers/blog");

const app = express.Router();

app.route("/blogs").get(getBlogs);
app.route("/blogs/:blogId").get(getBlogById).post(postComment);
app.route("/create").get(getCreateBlog).post(postCreateBlog);
app.route("/update/:blogId").get(getBlogByAdmin);
app.route("/update/blogImage/:blogId").post(updateBlogTitleImage);
app.route("/update/status/:blogId").post(updateBlogTitleAndContent);
app.route("/delete/:blogId").post(deleteBlog);

module.exports = app;