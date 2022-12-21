const express = require("express");
const {getHireCounsellorById, postHireCounsellorById} = require("../controllers/hireCounsellor");

const app = express.Router();

app.route("/hirecounsellor/:counsellorId/confirm%20details").get(getHireCounsellorById).post(postHireCounsellorById);

module.exports = app;