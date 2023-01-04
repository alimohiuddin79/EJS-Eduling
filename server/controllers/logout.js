const getLogout = function(req, res){
    req.logout(function(err){
        if(err){
            console.log(err);
        }
    });
    res.redirect("/");
}

module.exports = {getLogout};