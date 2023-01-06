const getHome = function(req, res){
    if(req.isAuthenticated()){
        const userName = req.user.name;
        const userImg = req.user.userImg;
        const isAdmin = req.user.admin;
        res.render("home", {isAdmin: isAdmin, userName: userName, userImg: userImg, isUserOnline: true});
    } else {
        res.render("home", {isUserOnline: false});
    }
}

module.exports = {getHome};