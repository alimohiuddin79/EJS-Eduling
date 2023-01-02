const express = require("express");
const Question = require("../models/question");

const getStartQuestionnaire = function(req, res){
    // find distinct categories
    Question.distinct("category", function(err, foundCategories){
        if(err){
            console.log(err);
            res.send("Something went wrong");
        } else {
            res.render("start-questionnaire", {categories: foundCategories});
        }
    });
}

const postStartQuestionnaire = function(req, res){
    const chosenCategory = req.body.chosenCategory;
    res.redirect("/start%20questionnaire/" + chosenCategory);
}

const getQuestionnaire = function(req, res){
    const requestedCategory = req.params.category;
    const questions = Question.find({category: requestedCategory}).limit(20)
    questions.exec(function(err, foundQuestions){
        if(!err){
            res.render("questionnaire", {requestedCategory: requestedCategory, questions: foundQuestions});
        } else {
            console.log(err);
            res.send("Something went wrong");
        }
    });
}

const postQuestionnaire = function(req, res){
    const userInput = req.body;
    let answers = [];
    let results = {};

    for(let i in userInput){
        // check user_input equal to correct answer
        if(userInput[i].split(",")[0] == userInput[i].split(",")[2]){
            // push specific field in answers array
            answers.push(userInput[i].split(",")[1]);
        } else if(!answers.includes(userInput[i].split(",")[1])){
            // if specific field answer is 0 then increase it by 1
            answers.push(userInput[i].split(",")[1]);
        }
    }
    // answer count
    answers.forEach(function(i){
        results[i] = (results[i] || 0) + 1;
    });
    console.log(results);
    res.render("questionnaire-result", {results: results});
}

module.exports = {getStartQuestionnaire, postStartQuestionnaire, getQuestionnaire, postQuestionnaire};