// Resume Builder controllers
const getResume = function(req, res){res.render("resume")}

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