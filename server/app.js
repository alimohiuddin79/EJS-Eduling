require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const multer = require("multer");
const User = require("./models/user");
const Blog = require("./models/blog");
const userRoutes = require("./routes/user");
const resumeRoutes = require("./routes/resume");
const blogRoutes = require("./routes/blog");
const compose = require("./routes/compose");

const app = express();

// Set view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join("../client/views/"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join("../client/public/")));

// express session with 1 hour cookie life
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }
}));

// passport session initialize
app.use(passport.initialize());
app.use(passport.session());

// Connnection port
const PORT = process.env.PORT || 3000;

// Mongodb url connection
mongoose.set('strictQuery', true);
mongoose.connect(process.env.CONNECTION_URL).then(app.listen(PORT, function(){console.log(`Server is running on port: ${PORT}`)})).catch(function(err){console.log(err)});

// Creating local user strategy
passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
});

// Routes
app.use("/", userRoutes);
app.use("/", resumeRoutes);
app.use("/", blogRoutes);
app.use("/", compose);



// const Blog = require("./models/blog");
// // Initialize multer
// const storage = multer.diskStorage({
//     destination: "../client/public/uploads/",
//     limits: { fileSize: 1000000 },
//     filename: function(req, file, cb) {
//       cb(null, file.fieldname + "-" + Date.now());
//     }
//   });
// const upload = multer({storage: storage});

// app.route("/blogs").get(function(req, res){
//     // Deleting all files in uploads folder
//     const directory = __dirname + '/../client/public/uploads/';

//     fs.readdir(directory, function(err, files){
//     if (err) throw err;

//     for (const file of files) {
//     fs.unlink(path.join(directory, file), function(err){
//       if(err){
//         console.log(err);
//       }
//     });
//     }
//     });

//     Blog.find({}, function(err, foundPosts) {
//     if(err) {
//       console.log(err);
//     } else {
//       if (foundPosts) {

//         res.render("blog", {blogPosts: foundPosts});
//       }
//     }
//   });
// }).post(upload.single('postImage'), function(req, res) {
//     const title = req.body.title;
//     const content = req.body.content;
//     const imgType = req.file.mimetype;
//     const imgData = fs.readFileSync(path.join(__dirname + '/../client/public/uploads/' + req.file.filename));
  
//     Blog.create({title: title, content: content, titleImg: {data: imgData, contentType: imgType}}, function(err){
//       if(err){
//         console.log(err);
//         res.send(err);
//       }
//       res.redirect("/blogs");
//     });
// });