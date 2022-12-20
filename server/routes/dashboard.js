const express = require("express");
const {getDashboard, postUserImage, postUserStatus} = require("../controllers/dashboard");

const app = express.Router();

app.route("/user/dashboard").get(getDashboard);
app.route("/user/dashboard/avatar").post(postUserImage);
app.route("/user/dashboard/status").post(postUserStatus);

module.exports = app;