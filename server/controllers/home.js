const Counters = require("../models/counters");
const User = require("../models/user");

const getHome = function(req, res){

    User.countDocuments({ type: 1 }, function(err, count){
        if(err){
            console.log(err);
        } else {
            const counsellorCount = count;
            Counters.findOne({}, function(err, counters){
                if(err){
                    console.log(err);
                } else {
                    const otherCounters = counters;
                    if(req.isAuthenticated()){
                        const userName = req.user.name;
                        const userImg = req.user.userImg;
                        const isAdmin = req.user.admin;
                        res.render("home", {counsellorCount: counsellorCount, otherCounters: otherCounters, isAdmin: isAdmin, userName: userName, userImg: userImg, isUserOnline: true});
                    } else {
                        res.render("home", {counsellorCount: counsellorCount, otherCounters: otherCounters, isUserOnline: false});
                    }
                }
            });

        }
    });
}

module.exports = {getHome};