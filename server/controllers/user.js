const User = require("../models/user");
const passport = require("passport");
const session = require("express-session");
const nodemailer = require("nodemailer");

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

// smtp welcome email function
function welcomeEmail(username){
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465, //465 is secure port
        secure: true,
        auth: {
            user: process.env.CONTACT_EMAIL,
            pass: process.env.CONTACT_PASS
        }
    });

    const textBody = `Please confirm your account registration`;
    const htmlBody = `<h2 style="text-align: center; color: #36F8B2;">Welcome to Eduling</h2>`;
	var mail = {
		from: process.env.CONTACT_EMAIL, // sender address
		to: username, // list of receivers
		subject: "Confirmation email",
		text: textBody,
		html: htmlBody
	};

    // send mail with defined transport object
    transporter.sendMail(mail, function (err, info) {
        if(err) {
            console.log(err);
            res.json({ message: "message not sent: an error occured; check the server's console log" });
        }
        else {
            console.log(info.messageId);
        }
    });
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
                welcomeEmail(username);
                passport.authenticate("local")(req, res, function(){
                    res.redirect("/user/dashboard");
                });
            }
        });
    }
}

// Login controllers
const getLogin = function(req, res){
    if(req.isAuthenticated()){
        const userName = req.user.name;
        const userImg = req.user.userImg;
        const isAdmin = req.user.admin;
        res.render("home", {isAdmin: isAdmin, userName: userName, userImg: userImg, isUserOnline: true});
    } else {
        res.render("login", {isUserOnline: false});
    } 
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