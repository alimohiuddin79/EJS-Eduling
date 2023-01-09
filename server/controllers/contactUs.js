const nodemailer = require("nodemailer");

const getContactUs = function(req, res){
    if(req.isAuthenticated()){
        const userName = req.user.name;
        const userImg = req.user.userImg;
        const isAdmin = req.user.admin;
        res.render("contact-us", {isAdmin: isAdmin, userName: userName, userImg: userImg, isUserOnline: true});
    } else {
        res.render("contact-us", {isUserOnline: false});
    }
}

const postContactUs = function(req, res){
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465, //465 is secure port
        secure: true,
        auth: {
            user: process.env.CONTACT_EMAIL,
            pass: process.env.CONTACT_PASS
        }
    });

    const textBody = `FROM: ${req.body.name} EMAIL: ${req.body.email} MESSAGE: ${req.body.message}`;
    const htmlBody = `<h2>Mail From Contact Form</h2><p>from: ${req.body.name} <a href="mailto:${req.body.email}">${req.body.email}</a></p><p>${req.body.message}</p>`;
	var mail = {
		from: req.body.email, // sender address
		to: process.env.CONTACT_EMAIL, // list of receivers
		subject: "Mail From Contact Form",
		text: textBody,
		html: htmlBody
	};

    // send mail with defined transport object
    transporter.sendMail(mail, function (err, info) {
        if(err) {
            console.log(err);
            res.json({ message: "message not sent: an error occured; check the server's console log" });
        }
        else {
            console.log(info.messageId);
            res.send("Your mail successfully sent");
        }
    });
}

module.exports = {getContactUs, postContactUs};