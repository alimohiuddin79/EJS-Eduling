const express = require("express");
const {getQuestion, postQuestion} = require("../controllers/question");

const app = express.Router();

app.route("/upload%20question").get(getQuestion).post(postQuestion);

module.exports = app;