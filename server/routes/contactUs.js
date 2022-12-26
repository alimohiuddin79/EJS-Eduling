const express = require("express");
const {getContactUs, postContactUs} = require("../controllers/contactUs");

const app = express.Router();

app.route("/contact%20us").get(getContactUs).post(postContactUs);

module.exports = app;