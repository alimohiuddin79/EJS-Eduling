const express = require("express");
const session = require("express-session");
const passport = require("passport");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const User = require("../models/user");

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

const getDashboard = app.get("/user/dashboard", function(req, res){
    if(req.isAuthenticated()){
        const userType = req.user.type;
        const userName = req.user.name;
        const userBio = req.user.bio;
        const userAvatar = req.user.userImg;
        const userCategories = req.user.categories;
        const userTimings = req.user.timings;
        const userRequests = req.user.requests;
        res.render("dashboard", {userType: userType, userName: userName, userBio: userBio, userAvatar: userAvatar, userCategories: userCategories, userTimings: userTimings, userRequests: userRequests});
    } else {
        res.redirect("/login");
    }
});

const postUserImage = app.post("/user/dashboard/avatar", upload.single("userImg"), function(req, res){
    const userId = req.user._id;
    const imgType = req.file.mimetype;
    const imgData = fs.readFileSync(path.join(__dirname + '/../../client/public/uploads/' + req.file.filename));

    User.findByIdAndUpdate(userId, {userImg: {data: imgData, contentType: imgType}}, function(err){
        if(err){
            console.log(err);
            res.send(err);
        } else {
            res.redirect("/user/dashboard");
        }
    });   
});

const postUserStatus = app.post("/user/dashboard/status", function(req, res){
    const userId = req.user._id;
    const userName = req.body.name;
    const userBio = req.body.bio;
    // catergories text and timings text
    const counsellorCategories = req.body.categories;
    const availableTimings = req.body.timings;
    // catergories array and timings array
    const categories = counsellorCategories.split(",") || counsellorCategories.split(", ");
    const timings = availableTimings.split(",") ||availableTimings.split(", ");

    User.findByIdAndUpdate(userId, {name: userName, bio: userBio, categories: categories, timings: timings}, function(err){
        if(err){
            console.log(err);
            res.send(err);
        } else {
            res.redirect("/user/dashboard");
        }
    });   
})
 
module.exports = {getDashboard, postUserImage, postUserStatus};