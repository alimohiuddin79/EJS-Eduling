const express = require("express");
const passport = require("passport");
const User = require("../models/user");

const app = express.Router();

const getCounsellors = app.get("/counsellors", function(req, res){
    User.find({type: 1}, function(err, foundCounsellors){
        if(err){
            console.log(err);
            res.send(err);
        } else {
            if(req.isAuthenticated()){
                const userName = req.user.name;
                const userImg = req.user.userImg;
                const isAdmin = req.user.admin;
                res.render("counsellors",{counsellors: foundCounsellors, isAdmin: isAdmin, userName: userName, userImg: userImg, isUserOnline: true});
            } else {
                res.render("counsellors",{counsellors: foundCounsellors, isUserOnline: false}); 
            }
        }
    });
});

const getCounsellorById = app.get("/counsellors/:counsellorId", function(req, res){
    const requestedId = req.params.counsellorId;

    User.findById(requestedId, function(err, foundCounsellor){
        if(req.isAuthenticated()){
            const userName = req.user.name;
            const userImg = req.user.userImg;
            const isAdmin = req.user.admin;
            res.render("counsellor-profile", {userType: req.user.type, requestedCounsellor: foundCounsellor, isAdmin: isAdmin, userName: userName, userImg: userImg, isUserOnline: true});
        } else {
            res.render("counsellor-profile", {requestedCounsellor: foundCounsellor, isUserOnline: false});
        }  
    });
});

module.exports = {getCounsellors, getCounsellorById};