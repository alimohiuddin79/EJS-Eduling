const express = require("express");
const app = express.Router();
const {getResume, postResume} = require("../controllers/resume");

app.route("/resume").get(getResume).post(postResume);

module.exports = app;