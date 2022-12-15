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

        res.render("blog", {blogPosts: foundPosts, showComment: req.isAuthenticated()});
      }
    }
  });
});

const postComment = app.post("/blogs", function(req, res){
  const blogId = req.body.blogId;
  const name = req.user.name;
  const comment = req.body.comment;
  let date = new Date;
  date = date.toLocaleDateString();

  Blog.findById(blogId, function(err, foundBlog){
    if(err){
      console.log(err);
    } else if(foundBlog){
      foundBlog.comments.push({userId: req.user._id, name: name, date: date, body: comment});
      foundBlog.save(function(){
        res.redirect("/blogs");
      })
    }
  })
});

const getCreatePost = app.get("/create", function(req, res){
    if(req.isAuthenticated() && req.user.admin == 1){
      console.log(req.user.admin);
        res.render("create-post");
    } else if (req.isAuthenticated()){
      res.send("Sorry only admin can post blogs");
    } 
    else {
        res.redirect("/login");
    }
})

const postCreatePost = app.post("/create", upload.single('postImage'), function(req, res) {
  const adminId = req.user._id;
  const authorEmail = req.user.username;
  const authorName = req.user.name;
  const title = req.body.title;
  const content = req.body.content;
  const imgType = req.file.mimetype;
  const imgData = fs.readFileSync(path.join(__dirname + '/../../client/public/uploads/' + req.file.filename));

  Blog.create({adminId: adminId, authorEmail: authorEmail, authorName, title: title, content: content, titleImg: {data: imgData, contentType: imgType}}, function(err){
    if(err){
      console.log(err);
      res.send(err);
    }
    res.redirect("/blogs");
  });
});

module.exports = {getBlogs, postComment, getCreatePost, postCreatePost};