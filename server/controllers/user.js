const User = require("../models/user");
const passport = require("passport");
const session = require("express-session");

// Signup controllers
const getSignup = function(req, res){
    if(req.isAuthenticated()){
        const userName = req.user.name;
        const userImg = req.user.userImg;
        const isAdmin = req.user.admin;
        res.render("home", {isAdmin: isAdmin, userName: userName, userImg: userImg, isUserOnline: true});
    } else {
        res.render("signup", {isUserOnline: false});
    }
}

const postSignup = function(req, res){
    let {username, password, confirmPassword, firstName, lastName, type} = req.body;
    let name = firstName + " " + lastName;
    type = parseInt(type);

    if(password !== confirmPassword){
        res.redirect("/signup");
    } else {
        User.register({username: username, name: name, type: type}, password, function(err, user){
            if(err){
                console.log(err);
                res.redirect("/signup");
            } else {
                passport.authenticate("local")(req, res, function(){
                    res.redirect("/user/dashboard");
                });
            }
        });
    }
}

// Login controllers
const getLogin = function(req, res){
    // if(req.isAuthenticated){
    //     res.render("home");
    // } else {
    //     res.render("login");
    // } 
    res.render("login");
}

const postLogin = function(req, res){
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, function(err){
        if(err){
            console.log(err);
            res.redirect("/login");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/user/dashboard");
            });
        }
    });
}

module.exports = {getSignup, postSignup, getLogin, postLogin};