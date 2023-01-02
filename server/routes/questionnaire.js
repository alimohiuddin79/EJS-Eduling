const express = require("express");
const {getStartQuestionnaire, postStartQuestionnaire, getQuestionnaire, postQuestionnaire} = require("../controllers/questionnaire");

const app = express.Router();

app.route("/start%20questionnaire").get(getStartQuestionnaire).post(postStartQuestionnaire);
app.route("/start%20questionnaire/:category").get(getQuestionnaire).post(postQuestionnaire);

module.exports = app;