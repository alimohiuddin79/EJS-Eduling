const express = require("express");
const app = express.Router();

// Compose route 
app.route("/compose").get(function(req, res){
    if(req.isAuthenticated()){
        res.render("compose");
    } else {
        res.redirect("/signup");
    }
})

module.exports = app;