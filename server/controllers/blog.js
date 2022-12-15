const express = require("express");
const fs = require("fs");
const multer = require("multer");
const Blog = require("../models/blog");
const path = require("path");

const app = express.Router();


// Initialize multer
const storage = multer.diskStorage({
    destination: "../client/public/uploads/",
    limits: { fileSize: 1000000 },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now());
    }
  });
const upload = multer({storage: storage});

const getBlogs = app.get("/blogs", function(req, res){
    // Deleting all files in uploads folder
    const directory = __dirname + '/../../client/public/uploads/';

    fs.readdir(directory, function(err, files){
    if (err) throw err;

    for (const file of files) {
    fs.unlink(path.join(directory, file), function(err){
      if(err){
        console.log(err);
      }
    });
    }
    });

    Blog.find({}, function(err, foundPosts) {
    if(err) {
      console.log(err);
    } else {
      if (foundPosts) {

        res.render("blog", {blogPosts: foundPosts});
      }
    }
  });
});

const getCreatePost = app.get("/create", function(req, res){
    if(req.isAuthenticated()){
        res.render("create-post");
    } else {
        res.redirect("/login");
    }
})

const postCreatePost = app.post("/create", upload.single('postImage'), function(req, res) {
    
    const title = req.body.title;
    const content = req.body.content;
    const imgType = req.file.mimetype;
    const imgData = fs.readFileSync(path.join(__dirname + '/../../client/public/uploads/' + req.file.filename));
  
    Blog.create({title: title, content: content, titleImg: {data: imgData, contentType: imgType}}, function(err){
      if(err){
        console.log(err);
        res.send(err);
      }
      res.redirect("/blogs");
    });
});

module.exports = {getBlogs, getCreatePost, postCreatePost};