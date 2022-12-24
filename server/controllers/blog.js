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

// get request to show all blogs
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

    Blog.find({}, function(err, foundBlogs) {
    if(err) {
      console.log(err);
    } else {
        res.render("blogs", {blogPosts: foundBlogs});
    }
  });
});

// get request to open specific blog
const getBlogById = app.get("/blogs/:blogId", function(req, res){
  const blogId = req.params.blogId;
  
  Blog.findById(blogId, function(err, foundBlog){
    res.render("blog-page", {requestedBlog: foundBlog, showComment: req.isAuthenticated()});
  });
});

// post comment request by users
const postComment = app.post("/blogs/:blogId", function(req, res){
  // const blogId = req.body.blogId;
  const blogId = req.params.blogId;
  const name = req.user.name;
  const comment = req.body.comment;
  let date = new Date;
  date = date.toLocaleString();

  Blog.findById(blogId, function(err, foundBlog){
    if(err){
      console.log(err);
    } else if(foundBlog){
      foundBlog.comments.push({userId: req.user._id, name: name, date: date, body: comment});
      foundBlog.save(function(){
        res.redirect("/blogs/"+blogId);
      })
    }
  })
});

// get request to create blog by admin
const getCreateBlog = app.get("/create", function(req, res){
    if(req.isAuthenticated() && req.user.admin == 1){
      const adminId = req.user._id;

      Blog.find({adminId: adminId}, function(err, foundBlogs){
        if(err){
          console.log(err);
          res.send(err);
        } else {
          res.render("create-blog", {adminBlogs: foundBlogs});
        }
      })
    } else if (req.isAuthenticated()){
      res.send("Sorry only admin can post blogs");
    } 
    else {
      res.redirect("/login");
    }
});

// post request for creating blog
const postCreateBlog = app.post("/create", upload.single('postImage'), function(req, res) {
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

// get blog request for update and delete
const getBlogByAdmin = app.get("/update/:blogId", function(req, res){

  if(req.isAuthenticated() && req.user.admin == 1){
    const blogId = req.params.blogId;
  
    Blog.findById(blogId, function(err, foundBlog){
      res.render("update-blog", {requestedBlog: foundBlog, showComment: req.isAuthenticated()});
    });
  } else {
    res.send("Only admin can access this route");
  }
  
});

// update title image request
const updateBlogTitleImage = app.post("/update/blogImage/:blogId", upload.single('postImage'), function(req, res){

  if(req.isAuthenticated() && req.user.admin == 1){
    const blogId = req.params.blogId;
    const imgType = req.file.mimetype;
    const imgData = fs.readFileSync(path.join(__dirname + '/../../client/public/uploads/' + req.file.filename));

    Blog.findByIdAndUpdate(blogId, {titleImg: {data: imgData, contentType: imgType}}, function(err){
        if(err){
          console.log(err);
          res.send(err);
        } else {
          res.redirect("/update/"+blogId);
        }
    });   
  } else {
    res.send("Only admin can access this route");
  }
});

// update blog title and content request
const updateBlogTitleAndContent = app.post("/update/status/:blogId", function(req, res){

  if(req.isAuthenticated() && req.user.admin == 1){
    const blogId = req.params.blogId;
    const title = req.body.title;
    const content = req.body.content;

    Blog.findByIdAndUpdate(blogId, {title: title, content: content}, function(err){
      if(err){
        console.log(err);
        res.send(err);
      } else {
        res.redirect("/update/"+blogId);
      }
    });
  } else {
    res.send("Only admin can access this route");
  }
});

// delete blog request
const deleteBlog = app.post("/delete/:blogId", function(req, res){
  if(req.isAuthenticated() && req.user.admin == 1){
    const blogId = req.params.blogId;

    Blog.findByIdAndRemove(blogId, function(err){
      if(err){
        console.log(err);
        res.send(err);
      } else {
        res.redirect("/create");
      }
    })
  } else {
    res.send("Only admin can access this route");
  }
});


module.exports = {getBlogs, getBlogById, postComment, getCreateBlog, postCreateBlog, getBlogByAdmin, updateBlogTitleImage, updateBlogTitleAndContent, deleteBlog};