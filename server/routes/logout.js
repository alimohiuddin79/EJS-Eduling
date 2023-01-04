const express = require("express");
const {getLogout} = require("../controllers/logout");

const app = express.Router();

app.route("/logout").get(getLogout);

module.exports = app;