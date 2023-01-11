const express = require("express");
const passport = require("passport");
const User = require("../models/user");

const getUserRequestAndResponse = function(req, res){
    if(req.isAuthenticated()){
        const userName = req.user.name;
        const userImg = req.user.userImg;
        const isAdmin = req.user.admin;
        if(req.user.type == 0){
            res.render("response", {userType: req.user.type, counsellorResponses: req.user.responses, message: null, isAdmin: isAdmin, userName: userName, userImg: userImg, isUserOnline: true});
        } else if(req.user.type == 1){
            res.render("response", {userType: req.user.type, studentRequests: req.user.requests, message: null, isAdmin: isAdmin, userName: userName, userImg: userImg, isUserOnline: true});
        }
    } else {
        res.redirect("/login");
    }
}

const postUserResponse =  function(req, res){
    
    if(req.isAuthenticated() && req.user.type == 1){
        // user information
        const counsellorId = req.user._id.toString();
        const counsellorName = req.user.name;
        const counsellorEmail = req.user.username;
        // response information
        const studentId = req.body.studentId;
        const requestId = req.body.requestId;
        const resMessage = req.body.message;
        let date = new Date;
        date = date.toLocaleString();

        User.findById(studentId, function(err, foundStudent){
            if(err){
                console.log(err);
                res.send(err);
            } else if(foundStudent){
                if(foundStudent.responses.length != 0){
                    foundStudent.responses.forEach(function(response){
                        foundStudent.responses.push({requestId: requestId, counsellorId: counsellorId, counsellorName: counsellorName, counsellorEmail: counsellorEmail,counsellorMessage: resMessage, date: date});
                        foundStudent.save(function(err){
                            if(err){
                                console.log(err);
                                res.send(err);
                            } else {
                                User.findById(counsellorId, function(err, foundCounsellor){
                                    foundCounsellor.requests.forEach(function(request){
                                        if(request._id == requestId){
                                            request.responded = 1;
                                            foundCounsellor.save();
                                            res.redirect("/user/responses");
                                        }
                                    });
                                });
                            }
                        });
                    });
                } 
            }
        });  
    }
}

module.exports = {getUserRequestAndResponse, postUserResponse};