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
            res.render("counsellors",{counsellors: foundCounsellors}); 
        }
    });
});

const getCounsellorById = app.get("/counsellors/:counsellorId", function(req, res){
    const requestedId = req.params.counsellorId;
    const checkLogin = req.isAuthenticated();

    User.findById(requestedId, function(err, foundCounsellor){
        if(checkLogin){
            res.render("counsellor-profile", {userType: req.user.type, requestedCounsellor: foundCounsellor, isAuth: checkLogin});
        } else {
            res.render("counsellor-profile", {requestedCounsellor: foundCounsellor, isAuth: checkLogin});
        }  
    });
});

module.exports = {getCounsellors, getCounsellorById};