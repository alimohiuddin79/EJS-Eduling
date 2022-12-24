const express = require("express");
const {postBlogSearch} = require("../controllers/blogSearch");
 
const app = express.Router();

app.route("/search/blogs").post(postBlogSearch);

module.exports = app;