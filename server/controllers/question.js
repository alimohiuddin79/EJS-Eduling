const express = require("express");
const _ = require("lodash");

const Question = require("../models/question");

const getQuestion = function(req, res){
    if(req.isAuthenticated() && req.user.admin == 1){

        // Upper query
        Question.distinct("category", function(err, foundCategories){
            if(err){
                console.log(err);
                res.send("Something went wrong");
            } else {
                const categories = foundCategories;
                // Inner query
                Question.distinct("field", function(err, foundFields){
                    if(err){
                        console.log(err);
                        res.send("Something went wrong");
                    } else {
                        const fields = foundFields;
                        res.render("upload-question", {categories: categories, fields: fields});
                    }
                });  
            }
        });
    } else {
        res.send("Sorry only admin can post questions");
    } 
}

const postQuestion = function(req, res){
    if(req.isAuthenticated() && req.user.admin == 1){
        const adminId = req.user._id;
        const category = _.startCase(req.body.category);
        const field = _.startCase(req.body.field);
        const question = _.capitalize(req.body.question);
        const options = req.body.options;
        const answer = req.body.answer;
        const optionsArray = options.split(", ") || options.split(",");

        const newQuestion = new Question({adminId: adminId, category: category, field: field, question: question, options: optionsArray, answer: answer});
        newQuestion.save(function(err){
            if(!err){
                console.log("Question uploaded successfully in database");
                res.redirect("/upload%20question");
            } else {
                console.log(err);
            }
        });
    } else {
        res.send("Sorry only admin can post questions");
    } 
}

module.exports = {getQuestion, postQuestion};