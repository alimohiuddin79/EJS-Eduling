const express = require("express");
const passport = require("passport");
const User = require("../models/user");

const app = express.Router();

const getHireCounsellorById = app.get("/hirecounsellor/:counsellorId", function(req, res){
    if(req.isAuthenticated() && req.user.type == 0){
        const counsellorId = req.params.counsellorId;
        const userEmail = req.user.username;
        const userName = req.user.name;
        const userImg = req.user.userImg;
        const isAdmin = req.user.admin;
        res.render("hire-counsellor", {isAdmin: isAdmin, userName: userName, userImg: userImg, isUserOnline: true, counsellorId: counsellorId, userEmail: userEmail});
    } else {
        res.send("Only Students can visit this page");
    }
});

const postHireCounsellorById = app.post("/hirecounsellor/:counsellorId", function(req, res){
    if(req.isAuthenticated() && req.user.type == 0){
        const userName = req.user.name;
        const userImg = req.user.userImg;
        const isAdmin = req.user.admin;
        const studentId = req.user._id;
        const counsellorId = req.params.counsellorId;
        const reqName = req.body.name;
        const reqEmail = req.body.email;
        const reqMessage = req.body.message;
        let date = new Date;
        date = date.toLocaleString();

        User.findById(counsellorId, function(err, foundCounsellor){
            if(err){
                console.log(err);
                res.send(err);
            } else if(foundCounsellor){
                const counsellorName = foundCounsellor.name;
                foundCounsellor.requests.push({studentId: studentId, studentName: reqName, studentEmail: reqEmail, studentMessage: reqMessage, date: date});
                foundCounsellor.save(function(){
                    res.render("success", {counsellorName: counsellorName, isAdmin: isAdmin, userName: userName, userImg: userImg, isUserOnline: true});
                });
            }
        });
    } else {
        res.send("Unauthorized User");
    }
    
})

module.exports = {getHireCounsellorById, postHireCounsellorById};