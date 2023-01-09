// Resume Builder controllers
const getResume = function(req, res){
    if(req.isAuthenticated()){
        const userName = req.user.name;
        const userImg = req.user.userImg;
        const isAdmin = req.user.admin;
        res.render("resume", {isAdmin: isAdmin, userName: userName, userImg: userImg, isUserOnline: true});
    } else {
        res.render("resume", {isUserOnline: false});
    }
}

const postResume = function(req, res){
    res.render("resume-result", {
        name: req.body.user_name,
        email: req.body.user_email,
        tel: req.body.user_tel,
        address: req.body.user_address,
        introduction: req.body.user_introduction,
        education: req.body.user_education,
        experiences: req.body.user_experience,
        skills: req.body.user_skills,
        certifications: req.body.user_certifications
    });
}

module.exports = {getResume, postResume};