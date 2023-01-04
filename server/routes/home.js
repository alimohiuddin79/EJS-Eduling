const express = require("express");
const {getHome} = require("../controllers/home");

const app = express.Router();

app.route("/").get(getHome);

module.exports = app;