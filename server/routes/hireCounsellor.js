const express = require("express");
const {getHireCounsellorById, postHireCounsellorById} = require("../controllers/hireCounsellor");

const app = express.Router();

app.route("/hirecounsellor/:counsellorId").get(getHireCounsellorById).post(postHireCounsellorById);

module.exports = app;