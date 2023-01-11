const User = require("../models/user");

const postCounsellorSearch = function(req, res){
    const searchText = req.body.search;

    User.find({type: 1, $text: {$search: searchText}}, function(err, foundCounsellors){
        if(err){
            console.log(err);
            res.send(err);
        } else {
            if(req.isAuthenticated()){
                const userName = req.user.name;
                const userImg = req.user.userImg;
                const isAdmin = req.user.admin;
                res.render("counsellor-search", {requestedCounsellors: foundCounsellors, isAdmin: isAdmin, userName: userName, userImg: userImg, isUserOnline: true});
            } else {
                res.render("counsellor-search", {requestedCounsellors: foundCounsellors, isUserOnline: false});
            }
        }
    });
}

module.exports = {postCounsellorSearch};