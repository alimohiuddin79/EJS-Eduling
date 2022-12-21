const express = require("express");
const {getCounsellors, getCounsellorById} = require("../controllers/counsellors");

const app = express.Router();

app.route("/counsellors").get(getCounsellors);
app.route("/counsellors/:counsellorId").get(getCounsellorById);

module.exports = app;