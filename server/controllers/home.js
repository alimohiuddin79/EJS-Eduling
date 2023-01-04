const getHome = function(req, res){
    if(req.isAuthenticated()){
        const userName = req.user.name;
        const userImg = req.user.userImg;
        res.render("home", {userName: userName, userImg: userImg, isUserOnline: true});
    } else {
        res.render("home", {isUserOnline: false});
    }
}

module.exports = {getHome};