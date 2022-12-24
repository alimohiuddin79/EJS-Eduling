const User = require("../models/user");

const postCounsellorSearch = function(req, res){
    const searchText = req.body.search;

    User.find({type: 1, $text: {$search: searchText}}, function(err, foundCounsellors){
        if(err){
            console.log(err);
            res.send(err);
        } else {
            res.render("counsellor-search", {requestedCounsellors: foundCounsellors});
        }
    });
}

module.exports = {postCounsellorSearch};