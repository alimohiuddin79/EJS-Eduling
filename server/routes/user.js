const express = require("express");
const app = express.Router();
const {getSignup, postSignup, getLogin, postLogin} = require("../controllers/user");

// Signup routes
app.route("/signup").get(getSignup).post(postSignup);
// Login routes
app.route("/login").get(getLogin).post(postLogin);

module.exports = app;