const express = require("express");
const Question = require("../models/question");

const getStartQuestionnaire = function(req, res){
    // find distinct categories
    Question.distinct("category", function(err, foundCategories){
        if(err){
            console.log(err);
            res.send("Something went wrong");
        } else {
            if(req.isAuthenticated()){
                const userName = req.user.name;
                const userImg = req.user.userImg;
                const isAdmin = req.user.admin;
                res.render("start-questionnaire", {categories: foundCategories, isAdmin: isAdmin, userName: userName, userImg: userImg, isUserOnline: true});
            } else {
                res.render("start-questionnaire", {categories: foundCategories, isUserOnline: false});
            }
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
            if(req.isAuthenticated()){
                const userName = req.user.name;
                const userImg = req.user.userImg;
                const isAdmin = req.user.admin;
                res.render("questionnaire", {requestedCategory: requestedCategory, questions: foundQuestions, isAdmin: isAdmin, userName: userName, userImg: userImg, isUserOnline: true});
            } else {
                res.render("questionnaire", {requestedCategory: requestedCategory, questions: foundQuestions, isUserOnline: false});
            } 
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
    if(req.isAuthenticated()){
        const userName = req.user.name;
        const userImg = req.user.userImg;
        const isAdmin = req.user.admin;
        res.render("questionnaire-result", {results: results, isAdmin: isAdmin, userName: userName, userImg: userImg, isUserOnline: true});
    } else {
        res.render("questionnaire-result", {results: results, isUserOnline: false});
    }
    // console.log(results);
}

module.exports = {getStartQuestionnaire, postStartQuestionnaire, getQuestionnaire, postQuestionnaire};