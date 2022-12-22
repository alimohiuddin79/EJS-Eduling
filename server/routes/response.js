const express = require("express");
const {getUserRequestAndResponse, postUserResponse} = require("../controllers/response");

const app = express.Router();

app.route("/user/responses").get(getUserRequestAndResponse).post(postUserResponse);

module.exports = app;