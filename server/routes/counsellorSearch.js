const express = require("express");
const {postCounsellorSearch} = require("../controllers/counsellorSearch");

const app = express.Router();

app.route("/search/counsellors").post(postCounsellorSearch);

module.exports = app;